const ViewCard= {
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.0",
    body: [
      {
        type: "Container",
        items: [
          {
            type: "TextBlock",
            text: "Azure DevOps WorkItems",
            weight: "Bolder",
            size: "Large"
          },
          {
            type: "ColumnSet",
            columns: [
                {
                    type: "Column",
                    width: "stretch",
                    items: [
                        {
                            type: "TextBlock",
                            text: "Title:",
                            weight: "Bolder"
                        }
                    ]
                },
                {
                    type: "Column",
                    width: "stretch",
                    items: [
                        {
                            type: "TextBlock",
                            text: "${editedTitle}",
                            wrap: true
                        }
                    ]
                }
            ]
        },
        {
            type: "ColumnSet",
            columns: [
                {
                    type: "Column",
                    width: "stretch",
                    items: [
                        {
                            type: "TextBlock",
                            text: "Project Name:",
                            weight: "Bolder",
                            spacing: "Small"
                        }
                    ]
                },
                {
                    type: "Column",
                    width: "stretch",
                    items: [
                        {
                            type: "TextBlock",
                            text: "${projectName}",
                            wrap: true
                        }
                    ]
                }
            ]
        },
        {
            type: "ColumnSet",
            columns: [
                {
                    type: "Column",
                    width: "stretch",
                    items: [
                        {
                            type: "TextBlock",
                            text: "Status:",
                            weight: "Bolder",
                            spacing: "Small"
                        }
                    ]
                },
                {
                    type: "Column",
                    width: "stretch",
                    items: [
                        {
                            type: "TextBlock",
                            text: "${editedState}",
                            wrap: true,
                            color: "${if(editedState == Done, 'good', 'warning')}"
                        }
                    ]
                }
            ]
        }
          
        ]
      }
    ],
    actions: [
        {
          type: "Action.OpenUrl",
          title: "👀 View Item",
          url: "${url}"
        }]
  };
  module.exports = ViewCard;