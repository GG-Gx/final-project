const nodeMailer = require('nodemailer');

const sendEmail = async (req, res) => {
  try {
    const { recipientEmail, formData } = req.body;

    const transporter = nodeMailer.createTransport({
      host: 'smtp.mail.de',
      port: 465, // Use port 465 for SSL/TLS
      secure: true, // Set secure to true for SSL/TLS
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const messageEmail = {
      from: process.env.EMAIL,
      to: recipientEmail, // Use 'email' instead of 'userEmail'
      subject: 'tuneGather: Lesson Request',
      html: `
      <p>Hi, ${formData.recipientEmail}!</p>
      <p>Time slot: ${formData.time}</p>
      <p>Name: ${formData.name}</p>
      <p>Email: ${formData.email}</p>
      <p>Phone: ${formData.phone}</p>
      <p>Comment: ${formData.comment}</p>
      `
    };

    try {
      await transporter.sendMail(messageEmail);
      console.log('Email sent successfully');
      res.sendStatus(200);
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    }
    
  }

  catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { sendEmail };
