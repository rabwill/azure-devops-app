const TaskCard = {
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
                                    color: "${if(status == billed, 'good', 'warning')}"
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
        },
        {
            type: 'Action.Submit',
            title: "✍🏼 Edit",
            data: { msteams: { type: 'task/fetch' }, data: { url: "${url}", id: "${id}", client: "${client}", partner: "${partner}", work: "${work}", status: "${status}" } }
        },
        {
            type: 'Action.Submit',
            client: "🖨️ Generate Invoice",
            data: { msteams: { type: 'task/fetch' }, data: { url: "${url}", id: "${id}", client: "${client}", partner: "${partner}", work: "${work}", status: "${status}" } }
        }
    ]
};
module.exports = TaskCard;