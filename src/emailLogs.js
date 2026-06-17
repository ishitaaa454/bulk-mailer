
const db = require("./db");

function logEmail({
    userId,
    email,
    subject,
    status,
    error = null
}) {
    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO email_logs
            (
                user_id,
                email,
                subject,
                status,
                error
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        db.run(
            query,
            [
                userId,
                email,
                subject,
                status,
                error
            ],
            function (err) {
                if (err) {
                    return reject(err);
                }

                resolve(this.lastID);
            }
        );
    });
}

module.exports = {
    logEmail
};