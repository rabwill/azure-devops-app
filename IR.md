# Teams App

## Cards - Layer 0

The app provides search results from API and renders them as a list. On click it provides a detailed view. It supports edit and creation of tasks.

Search Results:
* Row View is built with 3 Fields - Icon, Title, Subtitle
    * Icon = 📋
    * Title = $title
    * Subtitle:
        * $status
        * $displayName
        
Create Form:
* Title: $title
* Status: $status
    * To Do
    * Doing
    * Done
* Actions:
    * Create

Detail View or Task Card:
* Card Title: Azure Devops Work Items
* Fields:
    * Title: $title
    * Project Name: $projectName
    * Status: $status
        * If status is 'Done', then color = good
        * Else color = warning
* Actions:
    * View Item
    * Edit

## Bot - Layer 2

Event Handlers:

* Query
    * attachmentLayout: "list"
    * template: searchItemCard
    * datasource: getWorkItem
    * data:
        * title: obj.fields["System.Title"]
        * displayName: obj.fields["System.AssignedTo"].displayName or "" 
        * status: obj.fields["System.State"]
    * onTap: open edit view
* SelectItem
    * attachmentLayout: "list"
    * template: taskCard
* Fetch
    * template: editCard
* Submit
    * template: viewCard
    * fields:
        * /fields/System.Title
        * /fields/System.State
    * onSuccessMessage: Thank you for updating the work item  ${mention.text}
* FetchTask
    * template: createTask
    * data: { title, status}
* SubmitAction
    * template: 
    * fields:
        * /fields/System.Title
        * /fields/System.State
    * onSucessMessage: Thank you for creating a new work item  ${mention.text}
* LinkQuery
    * datasource: getWorkItemDetails
    * template: viewCard
    * data:
        * editedTitle: data.fields["System.Title"], 
        * editedState: data.fields["System.State"], 
        * projectName: config.projectName, 
        * url: `${config.wiUrl}/edit/${data.id}/`
    * attachmentLayout: "list"

## API - Layer 2

Azure DevOps Integration with the following functionality

1. Read 
2. Create
3. Edit

