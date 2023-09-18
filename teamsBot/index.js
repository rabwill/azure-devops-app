const axios = require("axios");
const { TeamsActivityHandler, CardFactory, MessageFactory } = require("botbuilder");
const ACData = require("adaptivecards-templating");
const { create, getAll, getOne, update } = require("../api");
const config = require("../config");

class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
  }
  // Message extension Code
  // Search.
  async handleTeamsMessagingExtensionQuery(context, query) {
    const searchQuery = query.parameters[0].value;
    const response = await getAll(searchQuery);
    const attachments = [];
    response.forEach((obj) => {
      const templateJson = require('./cards/searchItemCard.js')
      const imgUrl = `${config.previewimage}?raw=true`;
      const preview = CardFactory.thumbnailCard(
        obj["client"],
        [{ url: imgUrl }],
        [{
          type: 'openUrl',
          title: 'View billable',
          value: `${config.wiUrl}/edit/${obj.id}/`
        }],
        {
          text: `${obj["hours"]} | ${obj["partner"]} | ${obj["work"]}`,
        }
      );
      const data = {
        client: obj["client"],
        partner: obj["partner"],
        work: obj["work"],
        hours: obj["hours"],
        status: obj["status"]
      }
      preview.content.tap = {
        type: "invoke",
        value: data,
      };

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
        path: 'work',
        value: obj.work
      },
      {
        op: 'add',
        path: 'hours',
        value: obj.hours,
      },
      {
        op: 'add',
        path: 'status',
        value: obj.status,
      }];
    //call update workitem function from index.js
    const resp = await update(obj.id, updates);

    const userName = context.activity.from.name;
    const mention = {
      type: "mention",
      mentioned: context.activity.from,
      text: `<at>${userName}</at>`,
    };
    const topLevelMessage = MessageFactory.text(`Thank you for updating the record  ${mention.text}`);
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
      case "createBillable": {
        let title = "";
        if (action.messagePayload) {
          title = extractTextFromHTML(action.messagePayload.body.content);
        }
        const obj = { client: "", partner: "", work: "", hours: "", status: "pending" };
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
              height: 500,
              width: 800,
              title: "Create Billable"
            }
          }
        }
      }
      default: {
        return null;
      }
    }
  }

  async handleTeamsMessagingExtensionSubmitAction(context, action) {
    try {

      if (action.commandId === "createBillable") {
        const updates = [
          {
            op: 'add',
            path: 'work',
            value: action.data.work,
          },
          {
            op: 'add',
            path: 'hours',
            value: action.data.hours,
          },
          {
            op: 'add',
            path: 'status',
            value: action.data.status,
          }];
        //call update workitem function from index.js
        const resp = await create(updates);
        const obj = { client: action.data.client, status: action.data.status, url: `${config.wiUrl}/edit/${resp.id}/` };

        const userName = context.activity.from.name;
        const mention = {
          type: "mention",
          mentioned: context.activity.from,
          text: `<at>${userName}</at>`,
        };
        const topLevelMessage = MessageFactory.text(`Thank you for creating a new record  ${mention.text}`);
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

  async handleTeamsAppBasedLinkQuery(context, query) {
    const id = extractWorkItemNumber(query.url);
    let attachment = {};
    if (id) {
      //task card    
      const data = await getOne(id);
      const obj = {
        client: obj["client"],
        partner: obj["partner"],
        work: obj["work"],
        hours: obj["hours"],
        status: obj["status"],
        url: `${config.wiUrl}/edit/${data.id}/`
      };
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
const extractWorkItemNumber = (url) => {
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
const extractTextFromHTML = (html) => {
  return html.replace(/<[^>]*>/g, '');
}
module.exports.TeamsBot = TeamsBot;
