// a. Set the details like host, port etc ourselves.

// b. Use a Nodemailer’s well-known provider like Gmail via the service key in the create transport options object.


// And below is the code as to how we do it.



require(dotenv).config()
const nodeMailer = require('nodemailer')

const transporter = await nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.PASSWORD,
  }
});


// Create our sendMail function
require("dotenv").config();
const express = require("express");
const nodeMail = require("nodemailer");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, subject, message) {
  const transporter = await nodeMail.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.PASSWORD,
    },
  });
  const mailOption = {
    from: process.env.GMAIL_USER,
    to: process.env.EMAIL,
    subject: subject,
    html: `You got a message from 
    Email : ${email}
    Name: ${name}
    Message: ${message}`,
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    return Promise.reject(error);
  }
}

app.get("/", (req, res) => {
  res.render(index.html);
});

app.get("/contact", (req, res) => {
  res.render(contact.html);
});

app.post("/contact", async (req, res, next) => {
  const { yourname, youremail, yoursubject, yourmessage } = req.body;
  try {
    await mainMail(yourname, youremail, yoursubject, yourmessage);
    
    res.send("Message Successfully Sent!");
  } catch (error) {
    res.send("Message Could not be Sent");
  }
});

app.listen(3000, () => console.log("Server is running!"));

// route
app.get('/contact', (req, res) => {
    res.render(contact.html);
  });


//   Setup send mail route
app.post('/contact', async (req, res, next) => {
  const { yourname, youremail, yoursubject, yourmessage } = req.body;
  try {
    await sendMail(youremail, yoursubject, yourmessage);
  } catch (error) {
    res.send("Message Could not be Sent");
  }
  res.send("Message Succssfully Sent!");
});