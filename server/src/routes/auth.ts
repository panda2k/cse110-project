import express from 'express';
import { signup, googleSignup, login, googleLogin } from '../controllers/authController';

const router = express.Router();

// Normal Signup Route
router.post('/signup', signup);

// Google Signup Route
router.post('/google-signup', googleSignup);

// Normal Login Route
router.post('/login', login);

// Google Login Route
router.post('/google-login', googleLogin);

export default router;