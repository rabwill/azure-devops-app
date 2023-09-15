const azdev = require('azure-devops-node-api');
const config = require("./config");
//function to initialise the AzDevOpsService
async function initialiseAzDevOpsService() {
    let orgUrl = `https://dev.azure.com/${config.orgName}`;
    let token = config.azpat;
    let authHandler = azdev.getPersonalAccessTokenHandler(token);
    let azconnection = new azdev.WebApi(orgUrl, authHandler);
    return azconnection;
}
//get workitem
async function getWorkItem(name) {
    try {
        // Get the Azure DevOps connection
        const azconnection = await initialiseAzDevOpsService();
        // Get the Work Item Tracking (WIT) API
        const witApi = await azconnection.getWorkItemTrackingApi();
        let workitems;
        // Execute the WIQL query to search for work items
        const result = await witApi.queryByWiql({
          query: `SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = "${config.projectName}"`
        });
        const ids = [];
        // Display the search results
        if (result && result.workItems) {      
          for (const workItem of result.workItems) {    
            ids.push(workItem.id);
          }    
          const fields= ["id","System.Title","System.State","System.AssignedTo"];   
          workitems= await witApi.getWorkItems(ids,fields);  
          const data = workitems.filter((obj) => obj.fields["System.Title"].toLowerCase().includes(name));
          return data;   
        }
      } catch (err) {
        console.error("Error:", err);
       
      } 

}
//function to update the workitem
async function updateWorkitem(workItemId, updates) {    
    var projectName = config.projectName;
    try {
        const azconnection = await initialiseAzDevOpsService();
        // Get the Work Item Tracking (WIT) API
        const witApi = await azconnection.getWorkItemTrackingApi();
        const resp = await witApi.updateWorkItem(null, updates, parseInt(workItemId), projectName);
        return resp;
    } catch (err) {
        console.error("Error:", err);
    }
}
//function to get workitem details from the workitem id
async function getWorkItemDetails(workItemId) {
    var projectName = config.projectName;
    try {
        const azconnection = await initialiseAzDevOpsService();
        // Get the Work Item Tracking (WIT) API
        const witApi = await azconnection.getWorkItemTrackingApi();
        const resp = await witApi.getWorkItem(parseInt(workItemId), null, null, null, projectName);
        return resp;
    } catch (err) {
        console.error("Error:", err);
    }
}
//function to create new workitem
async function createWorkItem(workItem) {
    var projectName = config.projectName;
    try {
        const azconnection = await initialiseAzDevOpsService();
        // Get the Work Item Tracking (WIT) API
        const witApi = await azconnection.getWorkItemTrackingApi();
        const resp = await witApi.createWorkItem(null, workItem, projectName, "Task");
        return resp;
    } catch (err) {
        console.error("Error:", err);
    }
}

module.exports = {
    initialiseAzDevOpsService,
    updateWorkitem,
    getWorkItemDetails,
    createWorkItem,
    getWorkItem
};
