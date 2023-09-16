const { initialiseAzDevOpsService } = require("./common");
const config = require("../config");

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
    createWorkItem
};
