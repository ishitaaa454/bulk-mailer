const { sendEmail } = require("./mailer");
const inquirer = require("inquirer").default;
const { getRecipients } = require("./recipientService");

async function askFilters() {
    const audienceAnswer = await inquirer.prompt([
        {
            type: "select",
            name: "audience",
            message: "Send email to:",
            choices: [
                { name: "All", value: "All" },
                { name: "Department", value: "Department" },
                { name: "Role", value: "Role" },
                { name: "Status", value: "Status" },
                { name: "Department + Role", value: "Department + Role" },
                { name: "Department + Status", value: "Department + Status" },
                { name: "Role + Status", value: "Role + Status" }
            ]
        }
    ]);

    const filters = {};

    if (audienceAnswer.audience.includes("Department")) {
        const ans = await inquirer.prompt([
            {
                type: "input",
                name: "department",
                message: "Enter department:"
            }
        ]);
        filters.department = ans.department.trim();
    }

    if (audienceAnswer.audience.includes("Role")) {
        const ans = await inquirer.prompt([
            {
                type: "input",
                name: "role",
                message: "Enter role:"
            }
        ]);
        filters.role = ans.role.trim();
    }

    if (audienceAnswer.audience.includes("Status")) {
        const ans = await inquirer.prompt([
            {
                type: "input",
                name: "status",
                message: "Enter status:"
            }
        ]);
        filters.status = ans.status.trim();
    }

    return filters;
}

async function main() {
    console.log("\n=== Bulk Email CLI ===\n");

    const emailDetails = await inquirer.prompt([
        {
            type: "input",
            name: "subject",
            message: "Enter email subject:"
        },
        {
            type: "input",
            name: "message",
            message: "Enter email message:"
        }
    ]);

    const filters = await askFilters();

    const recipients = await getRecipients(filters);

    console.log("\n=== Email Preview ===");
    console.log("Subject:", emailDetails.subject);
    console.log("Message:", emailDetails.message);
    console.log("Filters:", Object.keys(filters).length ? filters : "All users");

    console.log(`\nRecipients found: ${recipients.length}`);
    console.table(recipients);

    if (recipients.length === 0) {
        console.log("No recipients found. Exiting.");
        process.exit(0);
    }

    const confirm = await inquirer.prompt([
        {
            type: "confirm",
            name: "proceed",
            message: "Do you want to continue?",
            default: false
        }
    ]);

    if (!confirm.proceed) {
        console.log("Cancelled.");
        process.exit(0);
    }

    console.log("\nSending emails...\n");

let success = 0;
let failed = 0;

for (const user of recipients) {
    try {
        await sendEmail(user.email, emailDetails.subject, emailDetails.message);
        console.log(`✅ Sent to ${user.email}`);
        success++;
    } catch (err) {
        console.log(`❌ Failed to ${user.email}: ${err.message}`);
        failed++;
    }
}

console.log("\n=== Sending Summary ===");
console.log("Success:", success);
console.log("Failed:", failed);
console.log("Total:", recipients.length);
}

main().catch((err) => {
    console.error("Error:", err.message);
});