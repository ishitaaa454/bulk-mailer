const { getRecipients } = require("./recipientService");

async function run() {

    console.log("\n===== ALL USERS =====");
    console.table(await getRecipients());

    console.log("\n===== AI DEPARTMENT =====");
    console.table(
        await getRecipients({
            department: "AI"
        })
    );

    console.log("\n===== ACTIVE USERS =====");
    console.table(
        await getRecipients({
            status: "active"
        })
    );

    console.log("\n===== AI + ACTIVE =====");
    console.table(
        await getRecipients({
            department: "AI",
            status: "active"
        })
    );
}

run();