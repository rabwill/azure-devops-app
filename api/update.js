const { initialiseDb } = require("./common");

async function update(id, data) {
    try {
        const db = await initialiseDb();
        const query = `UPDATE records SET partner = '${data.partner}', client = '${data.client}', hours = '${data.hours}', description = '${data.description}', status = '${data.status}' WHERE id = ${id}`;
        const resp = await db.run(query);
        return resp;
    } catch (err) {
        console.error("Error:", err);
    }
}

module.exports = {
    update
};