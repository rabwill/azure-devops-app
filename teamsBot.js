const axios = require("axios");
const { TeamsActivityHandler, CardFactory, MessageFactory } = require("botbuilder");
const ACData = require("adaptivecards-templating");
const config = require("./config");
const { updateWorkitem,getWorkItemDetails, createWorkItem } = require("./azservice");

class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
  }
  // Message extension Code
  // Search.
  async handleTeamsMessagingExtensionQuery(context, query) {
    const searchQuery = query.parameters[0].value;   
    const response = await axios.get(
      `https://${config.host}/api/workitems/${searchQuery}`
    );
    const attachments = [];
    response.data.forEach((obj) => {
      const templateJson = require('./cards/searchItemCard.js')
      let displayName = "";
      if (obj.fields["System.AssignedTo"])
        displayName = obj.fields["System.AssignedTo"].displayName ?? "";
      const imgUrl = `${config.previewimage}?raw=true`;
      const previewTitle = ` ${obj.fields["System.State"]} | ${displayName}`;
      const preview = CardFactory.thumbnailCard(
        obj.fields["System.Title"],
        [{ url: imgUrl }],
        [{
          type: 'openUrl',
          title: 'View workitem',
          value: `${config.wiUrl}/edit/${obj.id}/`
        }],
        {
          text: `${previewTitle}`,
        }
      );
      preview.content.tap = {
        type: "invoke",
        value: {
          status: obj.fields["System.State"], id: obj.id, url: `${config.wiUrl}/edit/${obj.id}/`, title: obj.fields["System.Title"], projectName: obj.fields["System.TeamProject"]
        },
      };
      const data = { title: obj.fields["System.Title"], displayName: displayName, status: obj.fields["System.State"] }
      const template = new ACData.Template(templateJson);
      const card = template.expand({
        $root: data
      });
      const attachment = { ...CardFactory.adaptiveCard(card), preview };
      attachments.push(attachment);
    });

    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: attachments,
      },
    };
  }
  async handleTeamsMessagingExtensionSelectItem(context, obj) {
    const templateJson = require('./cards/taskCard.js')
    const template = new ACData.Template(templateJson);
    const card = template.expand({
      $root: obj
    });
    const resultCard = CardFactory.adaptiveCard(card);
    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: [resultCard]
      },
    };
  }
  //dialog
  async handleTeamsTaskModuleFetch(context, taskModuleRequest) {
    const obj = taskModuleRequest.data.data;
    var taskInfo = {};
    const templateJson = require('./cards/editCard.js')
    const template = new ACData.Template(templateJson);
    const card = template.expand({
      $root: obj
    });
    const resultCard = CardFactory.adaptiveCard(card);
    taskInfo.card = resultCard;
    setTaskInfo(taskInfo);
    return {
      task: {
        type: 'continue',
        value: taskInfo
      }
    }

  }
  async handleTeamsTaskModuleSubmit(context, taskModuleRequest) {
    const obj = taskModuleRequest.data;
    const updates = [
      {
        op: 'add',
        path: '/fields/System.Title',
        value: obj.editedTitle,
      },
      {
        op: 'add',
        path: '/fields/System.State',
        value: obj.editedState,
      }];
   //call update workitem function from index.js
    const resp = await updateWorkitem(obj.id, updates);    
   
    const userName = context.activity.from.name;
    const mention = {
      type: "mention",
      mentioned: context.activity.from,
      text: `<at>${userName}</at>`,
    };
    const topLevelMessage = MessageFactory.text(`Thank you for updating the work item  ${mention.text}`);
    topLevelMessage.entities = [mention];


    const templateJson = require('./cards/viewCard.js')
    const template = new ACData.Template(templateJson);
    const card = template.expand({
      $root: obj
    });
    const resultCard = CardFactory.adaptiveCard(card);
    await context.sendActivity(topLevelMessage);
    await context.sendActivity({
      type: 'message',
      attachments: [resultCard],
    });
  }
  //action based ME
  async handleTeamsMessagingExtensionFetchTask(context, action) {
    switch (action.commandId) {
      case "createWorkItem": {
        let title="";
        if(action.messagePayload){
          title=extractTextFromHTML(action.messagePayload.body.content); 
        }        
        const obj = { title: title, status: "To Do" };
        const templateJson = require('./cards/createCard.js')
        const template = new ACData.Template(templateJson);
        const card = template.expand({
          $root: obj
        });
        const resultCard = CardFactory.adaptiveCard(card);
        return {
          task: {
            type: 'continue',
            value: {
              card: resultCard,
              height: 350,
              width: 800,
              title: "Create workItem"                
            }    
          }
        }
      }        
      default: {
        return null;
      }
    }
  }

  async handleTeamsMessagingExtensionSubmitAction (context, action) {
    try {

        if(action.data.title) {         
          const updates = [
            {
              op: 'add',
              path: '/fields/System.Title',
              value: action.data.title,
            },
            {
              op: 'add',
              path: '/fields/System.State',
              value: action.data.status,
            }];
         //call update workitem function from index.js
          const resp = await createWorkItem(updates);
          const obj={editedTitle:action.data.title, editedState:action.data.status, projectName:config.projectName, url:`${config.wiUrl}/edit/${resp.id}/`};

          const userName = context.activity.from.name;
          const mention = {
            type: "mention",
            mentioned: context.activity.from,
            text: `<at>${userName}</at>`,
          };
          const topLevelMessage = MessageFactory.text(`Thank you for creating a new work item  ${mention.text}`);
          topLevelMessage.entities = [mention];
          const templateJson = require('./cards/viewCard.js')
          const template = new ACData.Template(templateJson);
          const card = template.expand({
            $root: obj
          });
          const resultCard = CardFactory.adaptiveCard(card);
          await context.sendActivity(topLevelMessage);
          await context.sendActivity({
            type: 'message',
            attachments: [resultCard],
          });
        }
    }
    catch (e) {
        console.log(e);
    }
}
  
  //Link unfurl Code
  //https://dev.azure.com/rwilliams108/Microsoft%20365%20advocacy/_workitems/edit/8

  async handleTeamsAppBasedLinkQuery(context, query) {
    const workItemNumber = extractWorkItemNumber(query.url);
    let attachment = {};
    if (workItemNumber) {  
      //task card    
      const data = await getWorkItemDetails(workItemNumber);
      const obj={editedTitle:data.fields["System.Title"], editedState:data.fields["System.State"], projectName:config.projectName, url:`${config.wiUrl}/edit/${data.id}/`};
      const templateJson = require('./cards/viewCard.js')
      const template = new ACData.Template(templateJson);
      const card = template.expand({
        $root: obj
      });
      attachment = CardFactory.adaptiveCard(card);
    } else {
      //vanilla card
      const card = CardFactory.adaptiveCard({
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.4"
      });
      attachment = CardFactory.adaptiveCard(card);
      attachment.preview = {
        content: {
          title: "Thumbnail Card",
          text: query.url,
          images: [
            {
              url: query.url,
            },
          ],
        },
        contentType: "application/vnd.microsoft.card.thumbnail",
      }
    }
    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: [attachment],
      }
    }

  }
}
//todo: move into helper functions file
const setTaskInfo = (taskInfo) => {
  taskInfo.height = 350;
  taskInfo.width = 800;
  taskInfo.title = "";
}
const extractWorkItemNumber=(url)=> {
  // Check if the URL contains "_workitems/edit/"
  const regex = /_workitems\/edit\/(\d+)/;
  const match = url.match(regex);

  if (match && match.length > 1) {
    // Return the captured number as an integer
    return parseInt(match[1], 10);
  } else {
    // Return null if the pattern is not found
    return null;
  }
}
const extractTextFromHTML=(html)=> {
  return html.replace(/<[^>]*>/g, '');
}
module.exports.TeamsBot = TeamsBot;
