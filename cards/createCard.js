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
            type: "ColumnSet",
            columns: [
              {
              type: "Column",
              items: [
                        {
                          type: "Input.Text",
                          id: "description",
                          label: "Description",
                          style: "text",
                          isMultiline: true,
                          wrap: true,
                          separator: true,
                          placeholder: "Enter new description",
                          value: "${description}", 
                        },
                        {
                          type: "ActionSet",
                          actions: [
                            {
                              type: "Action.Submit",
                              style: "positive",
                              title: "🤖 Generate Description",
                              data: {
                                verb: "generateDescription",
                                title: "${title.value}",
                                status: "${status.value}",
                                description: "${description}"
                              },
                            },
                          ]
                        }
                     ],
                }
              ]

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
          verb:"createWorkItem",
          title: "${title.value}",
          status: "${status.value}",
          description: "${description}"  
        },
      }
    ],
  };
  module.exports = CreateCard;