const { initialiseDb } = require("./common");

async function getWorkItemDetails(id) {
    try {
        const db = initialiseDb();
        const query = `SELECT * FROM records WHERE id = '{id}'`;
        results = await db.get(query);
        return results;
    } catch (err) {
        console.error("Error:", err);
    }
}

module.exports = {
    getWorkItemDetails
};