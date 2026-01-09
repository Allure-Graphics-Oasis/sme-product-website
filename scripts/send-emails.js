// send-emails.js
// Script to send found emails to the website owner's mailbox using Resend API
// Usage: node send-emails.js

const Resend = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY); // Set your Resend API key in env

const ownerEmail = "godswill.ajuoga.dev@gmail.com";
const foundEmails = ["Adhappi94@gmail.com", "alluregraphicsoasis.co@gmail.com"];

async function sendEmailList() {
  try {
    const response = await resend.emails.send({
      from: "no-reply@yourdomain.com",
      to: ownerEmail,
      subject: "Workspace Email Addresses",
      html: `<h3>Found Email Addresses in Workspace:</h3><ul>${foundEmails.map((e) => `<li>${e}</li>`).join("")}</ul>`,
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendEmailList();
