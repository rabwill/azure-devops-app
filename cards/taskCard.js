const TaskCard= {
  type: "AdaptiveCard",
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  version: "1.0",
  body: [
    {
      type: "Container",
      items: [
        {
          type: "TextBlock",
          text: "Azure DevOps Work Items",
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
                          text: "${title}",
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
    },
    {
      type: 'Action.Submit',
      title: "✍🏼 Edit",
      data: { msteams: { type: 'task/fetch' }, data: {projectName:"${projectName}",url:"${url}",id:"${id}",title:"${title}",status:"${status}"} }
    }
  ]
};
module.exports = TaskCard;