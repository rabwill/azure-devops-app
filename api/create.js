const { initialiseDb } = require("./common");
const config = require("../config");

//function to create new workitem
async function create(data) {
    try {
        const db = await initialiseDb();
        const query = `INSERT INTO records (partner, client, hours, status) VALUES ('${data.partner}', '${data.client}', '${data.hours}', '${data.description}', '${data.hours}', '${data.status}')`;
        const resp = await db.run(query);
        return resp;
    } catch (err) {
        console.error("Error:", err);
    }
}

module.exports = {
    create
};
