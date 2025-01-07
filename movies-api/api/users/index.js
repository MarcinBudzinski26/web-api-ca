import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}));

// Register or Authenticate a User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update password for a specific user
router.put('/:id/password', asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, msg: 'Password is required.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.updateOne(
        { _id: req.params.id },
        { password: hashedPassword }
    );

    if (result.modifiedCount) {
        res.status(200).json({ success: true, msg: 'Password updated successfully.' });
    } else {
        res.status(404).json({ success: false, msg: 'User not found or password update failed.' });
    }
}));


// Delete a user by ID
router.delete('/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
    }

    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, msg: 'User deleted successfully.' });
}));

async function registerUser(req, res) {
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, userId: user._id, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

export default router;
