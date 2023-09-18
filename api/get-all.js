const { initialiseDb } = require("./common");

//get workitem
async function getAll(name) {
    try {        
        const db = await initialiseDb();
        const query = `SELECT * FROM records WHERE client LIKE '%${name}%'`;
        results = await db.all(query);
        console.log(results);
        return results;
    } catch (err) {
        console.error("Error:", err);
    }
}

module.exports = {
    getAll
};
