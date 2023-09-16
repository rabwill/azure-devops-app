
const { initialiseAzDevOpsService } = require('./common');
const { updateWorkitem } = require('./updateWorkitem');
const { getWorkItemDetails } = require('./getWorkItemDetails');
const { createWorkItem } = require('./createWorkItem');
const { getWorkItem } = require('./getWorkItem');

module.exports = {
    initialiseAzDevOpsService,
    updateWorkitem,
    getWorkItemDetails,
    createWorkItem,
    getWorkItem
};


