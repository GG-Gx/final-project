const nodeMailer = require('nodemailer');

const sendEmail = async (req, res) => {
  try {
    const { formData } = req.body;

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
      to: formData.to, 
      subject: 'tuneGather: Lesson Request',
      html: `
      <p>Hi, ${formData.to}!</p>
      <p>Time slot: ${formData.time}</p>
      <p>Name: ${formData.name}</p>
      <p>Email: ${formData.email}</p>
      <p>Phone: ${formData.phone}</p>
      <p>Comment: ${formData.comment}</p>
      `
    };

    const messageEmail2 = {
      from: process.env.EMAIL,
      to: formData.email, 
      subject: 'tuneGather: Lesson Request',
      html: `
      <p>Hi, ${formData.name}!</p>
      <p>Thank you for your lesson request. We will get back to you shortly.</p>
      <p>Time slot: ${formData.time}</p>`
    };

    try {
      await transporter.sendMail(messageEmail);
      await transporter.sendMail(messageEmail2);
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
