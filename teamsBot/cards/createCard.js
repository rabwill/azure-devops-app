const CreateCard= {
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0",
    body: [
      {
        "type": "Container",
        "items": [
          {
            type: "TextBlock",
            text: "Create a Azure DevOps Work Item",
            weight: "Bolder",            
            size: "Large"
          },
      {
        type: "Input.Text",
        id: "title",
        label: "Title",
        separator: true,
        placeholder: "Enter new title",
        value: "${title}", 
      },
      {
        "type": "Input.ChoiceSet",
        "id": "status",
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
        title: "➕ Create",
        data: {
          title: "${title.value}",
          status: "${status.value}"    
        },
      },
    ],
  };
  module.exports = CreateCard;