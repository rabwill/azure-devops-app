const azdev = require('azure-devops-node-api');
const config = require("../config");

//function to initialise the AzDevOpsService
async function initialiseAzDevOpsService() {
    let orgUrl = `https://dev.azure.com/${config.orgName}`;
    let token = config.azpat;
    let authHandler = azdev.getPersonalAccessTokenHandler(token);
    let azconnection = new azdev.WebApi(orgUrl, authHandler);
    return azconnection;
}

module.exports = {
    initialiseAzDevOpsService
};