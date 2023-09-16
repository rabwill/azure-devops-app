const { initialiseAzDevOpsService } = require("./common");

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

module.exports = {
    updateWorkitem
};