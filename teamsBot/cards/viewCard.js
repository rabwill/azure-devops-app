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
            text: "${work}",
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
                            text: "Client:",
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
                            text: "${client}",
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
                            text: "Partner:",
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
                            text: "${partner}",
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
                            text: "${status}",
                            wrap: true,
                            color: "${if(status == Done, 'good', 'warning')}"
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