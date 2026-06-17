const { sendEmail } = require("./mailer");

async function test() {
    try {
        const result = await sendEmail(
            "your_receiver_email@gmail.com",
            "Test Email",
            "This is a test email from Node.js bulk email CLI."
        );

        console.log("Email sent successfully");
        console.log(result.messageId);
    } catch (err) {
        console.error("Email failed:", err.message);
    }
}

test();