const bcrypt =require ('bcrypt');
const nodemailer =require ('nodemailer');
const User= require ("../model/UserModel.js")
const jwt = require("jsonwebtoken")

// Define the route for sending a password reset link
const forgotPassword = async (req, res) => {
    // Find the user with the provided email address
    User.findOne({ where: { userEmail: req.body.userEmail } }).then((user) => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Generate a reset token and expiry date
        const resetToken = jwt.sign({ userUid: user.userUid }, 'secret', {
            expiresIn: '5m',
        });
        const resetTokenExpiry = Date.now() + 5 * 60 * 1000;

        // Update the user with the reset token and expiry date
        user
            .update({
                resetPasswordToken: resetToken,
                resetPasswordExpires: resetTokenExpiry,
            })
            .then(() => {
                // Send the password reset email
                const transporter = nodemailer.createTransport({
                    host: "172.25.161.3",
                    port: 25,
                    tls: {
                        rejectUnauthorized: false
                    },
                });
                const mailOptions = {
                    from: 'noreply@orange.sl',
                    to: user.userEmail,
                    subject: 'Password Reset',
                    text: 'You are receiving this email because you (or someone else) have requested for the reset of this account password\n\n'
                    + 'Please click on the following link below, or paste this into your browser to complete the process within five (5) Minutes of receiving it:\n\n'
                    + `http://172.25.160.235:2502/updatePassword/${resetToken}\n\n`
                    + 'If you did not request for this, please ignore this email and your password will remain unchanged.\n',
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to send email' });
                        
                    }
                    res.json({ message: 'Password reset email sent' });
                });
            });
    });
}


const resetPasswordToken = async (req, res) => {
    // Find the user with the provided reset token
    jwt.verify(req.params.token, 'secret', (err, decoded) => {
        if (err) {
            return res.json({ message: 'Sorry but Please send a new request link' });
        }

        // Find the user with the matching reset token
        User.findOne({ where: { resetPasswordToken: req.params.token } }).then((user) => {
            if (!user) {
                return res.json({ message: 'User not Found' });
            }

            // Check if the reset token has expired
            if (user.resetPasswordExpires < Date.now()) {
                return res.status(401).json({ error: 'Reset token has expired' });
            }

            // Check if the new password is the same as the old password
            bcrypt.compare(req.body.userPassword, user.userPassword, (err, isSame) => {
                if (isSame) {
                    return res.status(400).json({ error: 'New password cannot be the same as the old password' });
                }

                // Hash the new password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.userPassword, salt, (err, hash) => {
                        // Update the user with the new password
                        user
                            .update({
                                userPassword: hash,
                                resetPasswordToken: null,
                                resetPasswordExpires: null,
                            })
                            .then(() => {
                                res.json({ message: 'Password reset successfully' });
                            });
                    });
                });
            });
        });
    });
}

module.exports ={
    forgotPassword,
    resetPasswordToken,
}




