# Bulk Email CLI

A scalable Node.js command-line application for sending bulk emails using recipient data stored in SQLite.

The application supports filtering recipients by department, role, and status, making it suitable for internal communications, onboarding emails, notifications, and campaign-based messaging.

---

## Features

- Send emails from terminal
- SQLite-based recipient storage
- Filter recipients by:
  - Department
  - Role
  - Status
  - Combination of filters
- Email preview before sending
- SMTP integration using Nodemailer
- Environment variable configuration
- Designed for future scalability

---

## Tech Stack

- Node.js
- SQLite
- Nodemailer
- Inquirer
- Dotenv

---

## Project Structure

```text
bulk-email-cli/
│
├── db/
│   ├── database.sqlite
│   └── schema.sql
│
├── src/
│   ├── db.js
│   ├── mailer.js
│   ├── recipientService.js
│   ├── sendBulkEmail.js
│   ├── testDb.js
│   └── testMail.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd bulk-email-cli
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password

FROM_EMAIL=your_email@gmail.com
```

---

## Database Setup

Create the SQLite database:

```bash
sqlite3 db/database.sqlite
```

Run schema:

```sql
.read db/schema.sql
```

---

## Sample Users

```sql
INSERT INTO users (name,email,department,role,status)
VALUES
('John Doe','john@example.com','IT','Developer','active'),
('Jane Smith','jane@example.com','HR','Manager','active');
```

---

## Testing Database Connection

```bash
node src/testDb.js
```

---

## Testing Email Delivery

```bash
node src/testMail.js
```

---

## Running Bulk Email CLI

```bash
node src/sendBulkEmail.js
```

Example:

```text
=== Bulk Email CLI ===

Enter email subject:
> Welcome

Enter email message:
> Welcome to the organization.

Send email to:
> Department

Enter department:
> AI

Recipients found: 25

Do you want to continue?
> Yes
```

---

## Current Capabilities

- Terminal-based email sending
- Dynamic recipient filtering
- SMTP email delivery
- SQLite integration

---

## Future Enhancements

- Email templates
- HTML emails
- Attachments
- Email logs
- Retry mechanism
- Scheduling
- Queue-based processing
- CSV import/export
- AWS SES integration
- SendGrid integration
- Multi-provider SMTP support

---

## Scalability Roadmap

Current version is optimized for demonstrations and small datasets.

Planned improvements for large-scale email delivery:

- Batch processing
- Cursor-based pagination
- Worker queues
- Rate limiting
- Retry handling
- Distributed processing

---

## License

MIT License