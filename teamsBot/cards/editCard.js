const EditCard = {
  type: "AdaptiveCard",
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  version: "1.0",
  body: [
    {
      "type": "Container",
      "items": [
        {
          type: "TextBlock",
          text: "Edit Billing",
          weight: "Bolder",
          size: "Large"
        },
        {
          type: "TextBlock",
          size: "Medium",
          text: "Client: ${client}",                    
        },
        {
          type: "TextBlock",
          size: "Medium",
          text: "Partner: ${partner}",                    
        },
        {
          type: "Input.Text",
          id: "work",
          label: "Work",
          separator: true,
          placeholder: "Describe work item",
          value: "${work}",
        },
        {
          type: "Input.Text",
          id: "hours",
          label: "Hours",
          separator: true,
          placeholder: "Enter hours",
          value: "${hours} hrs",
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
              "title": "Billed",
              "value": "billed"
            },
            {
              "title": "Pending",
              "value": "pending"
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
        client: "${client}",
        partner: "${partner}",
        work: "${work.value}",
        hours: "${hours.value}",
        status: "${status.value}",
        id: "${id}",
        url: "${url}"
      },
    },
  ],
};
module.exports = EditCard;