const EditCard= {
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0",
    body: [
      {
        "type": "Container",
        "items": [
          {
            type: "TextBlock",
            text: "Edit Azure DevOps Work Items",
            weight: "Bolder",            
            size: "Large"
          },
      {
        type: "Input.Text",
        id: "editedTitle",
        label: "Title",
        separator: true,
        placeholder: "Enter new title",
        value: "${title}", 
      },
      {
        "type": "Input.ChoiceSet",
        "id": "editedState",
        "weight": "Bolder",
        "label": "Status",
        "style": "expanded",
        "value": "${status}",
        "choices": [
          {
            "title": "To Do",
            "value": "To Do"
          },
          {
            "title": "Doing",
            "value": "Doing"
          },
          {
            "title": "Done",
            "value": "Done"
          }
        ]
      }]

    }
    ],
    actions: [
      {
        type: "Action.Submit",
        style: "positive",
        title: "💾 Save changes",
        data: {
          msteams: { type: "task/edit" },
          // Include the edited values in the data
          editedTitle: "${editedTitle.value}",
          editedState: "${editedState.value}",
          id: "${id}" ,
          url:"${url}"   ,
          projectName:"${projectName}"     
        },
      },
    ],
  };
  module.exports = EditCard;