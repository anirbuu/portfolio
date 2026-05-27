const Message = require("../models/Message");
const nodemailer = require("nodemailer");

const sendContactMessage = async (req, res) => {

  try {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields"
      });
    }

    // SAVE TO DATABASE
    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();

    // EMAIL TRANSPORT
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // SEND EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Contact Message",

      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {

    console.error("Contact controller error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  sendContactMessage
};