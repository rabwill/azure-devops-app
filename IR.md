# Teams App

## Cards - Layer 0

The app provides search results from API and renders them as a list. On click it provides a detailed view. It supports edit and creation of tasks.

Search Results:
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

1. Read 
2. Create
3. Edit

