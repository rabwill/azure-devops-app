const searchCard={
    type: "AdaptiveCard",
    body: [
        {
            type: "ColumnSet",
            columns: [
                {
                    type: "Column",
                    width: "auto",
                    items: [
                        {
                            type: "TextBlock",
                            text: "📋",
                            wrap: true,
                            spacing: "None",
                            horizontalAlignment: "Left",
                            size: "Large",
                            color: "Light"
                        }
                    ]
                },
                {
                    type: "Column",
                    width: "stretch",
                    items: [
                        {
                            type: "TextBlock",
                            size: "Medium",
                            text: "${title}",
                            spacing: "None",
                            horizontalAlignment: "Left",
                            style: "columnHeader",
                            fontType: "Default"
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
                    width: "auto",
                    items: [
                        {
                            type: "TextBlock",
                            text: "${status}",
                            wrap: true,
                            isSubtle: true
                        }
                    ]
                },
                {
                    type: "Column",
                    width: "stretch",
                    items: [
                        {
                            type: "TextBlock",
                            size: "Default",
                            weight: "Default",
                            text: "${displayName}",
                            isSubtle: true
                        }
                    ]
                }
            ]
        }
    ],
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.6"
};
module.exports = searchCard;