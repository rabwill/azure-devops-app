# Teams App

## Cards - Layer 0

The app provides search results from API and renders them as a list. On click it provides a detailed view. It supports edit and creation of tasks.

Search Results Preview Card:
    * Row View is built with 3 Fields - Icon, Title, Subtitle
        * Icon = 📋
        * Title = $title
        * Subtitle = $status | $displayName
        
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

## API - Layer 1

Azure DevOps Integration with the following functionality

1. Read fields id,System.Title which is the title ,System.State which is the status,System.AssignedTo and display the Search result card
2. Create work item with title and status
3. Edit work item title and status

## BOT - Layer 2

Bot handler code using Azure Bot framework

1. takes a user's query, retrieves work items based on that query, formats them as message attachments with interactive elements, and returns them for display in a Microsoft Teams chat
1. opens a dialog to create a new work item and send as card in the conversation
 


