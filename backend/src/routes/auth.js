const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'voltstore_secret', { 
    expiresIn: '7d' 
  });

// POST register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      token: generateToken(user._id) 
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      isAdmin: user.isAdmin, 
      token: generateToken(user._id) 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'VoltStore - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; color: #0F172A; line-height: 1.5;">
          <h1 style="color: #2563EB;">VoltStore</h1>
          <h2>You requested a password reset</h2>
          <p>Click the button below to reset your password:</p>
          <a href="http://localhost:3000/reset-password/${resetToken}" style="display: inline-block; padding: 12px 20px; background-color: #2563EB; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset Password</a>
          <p style="margin-top: 20px;">This link expires in 1 hour.</p>
          <p>If you didn't request this, ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;