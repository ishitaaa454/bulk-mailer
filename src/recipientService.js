const db = require("./db");

function getRecipients(filters = {}) {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM users WHERE 1=1";
        const params = [];

        if (filters.department) {
            query += " AND department = ?";
            params.push(filters.department);
        }

        if (filters.role) {
            query += " AND role = ?";
            params.push(filters.role);
        }

        if (filters.status) {
            query += " AND status = ?";
            params.push(filters.status);
        }

        db.all(query, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

module.exports = { getRecipients };