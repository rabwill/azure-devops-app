const CreateCard = {
  type: "AdaptiveCard",
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  version: "1.0",
  body: [
    {
      "type": "Container",
      "items": [
        {
          type: "TextBlock",
          text: "Create Billable",
          weight: "Bolder",
          size: "Large"
        },
        {
          type: "Input.Text",
          id: "client",
          label: "Client",
          separator: true,
          placeholder: "Enter Client Name",
          value: "${client}",
        },
        {
          type: "Input.Text",
          id: "partner",
          label: "Partner",
          separator: true,
          placeholder: "Enter Partner Name",
          value: "${client}",
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
          value: "${hours}",
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
      title: "➕ Create",
      data: {
        client: "${client.value}",
        partner: "${partner.value}",
        work: "${work.value}",
        hours: "${hours.value}",
        status: "${status.value}"
      },
    },
  ],
};
module.exports = CreateCard;