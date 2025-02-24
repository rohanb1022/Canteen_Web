// import express from 'express';
// import transporter from '../../config/nodemailer.js';
// import AppUser from '../../models/appuser.model.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const router = express.Router();

// router.post('/contactus', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
    
//     // Check if user exists
//     const user = await AppUser.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (!name || !email || !message) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const mailOptions = {
//       from: email,
//       to: process.env.EMAIL_USER,
//       subject: 'Contact Form Submission',
//       text: Name: ${name}\nEmail: ${email}\nMessage: ${message},
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: 'Email sent successfully' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// export default router;

import express from 'express';
import transporter from '../../config/nodemailer.js';
import AppUser from '../../models/appuser.model.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/contactus', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const user = await AppUser.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
