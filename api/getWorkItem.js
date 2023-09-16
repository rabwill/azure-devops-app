const { initialiseAzDevOpsService } = require("./common");

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
            const fields = ["id", "System.Title", "System.State", "System.AssignedTo"];
            workitems = await witApi.getWorkItems(ids, fields);
            const data = workitems.filter((obj) => obj.fields["System.Title"].toLowerCase().includes(name));
            return data;
        }
    } catch (err) {
        console.error("Error:", err);

    }

}

module.exports = {
    getWorkItem
};
