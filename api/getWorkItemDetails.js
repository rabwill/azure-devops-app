const { initialiseAzDevOpsService } = require("./common");
const config = require("../config");

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

module.exports = {
    getWorkItemDetails
};