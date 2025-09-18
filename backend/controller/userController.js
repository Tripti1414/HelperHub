const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ id: user._id }, 'jwt_secret_key', {
        expiresIn: '7d',
    });
};

// Register
exports.register = async (req, res) => {
    try {
        console.log("chalaa register")
        const { username, email, password , role } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const user = new User({ username, email, password , role });
        await user.save();

        const token = createToken(user);
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(201).json({ message: 'User registered successfully', user: { id: user._id, username, email , role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        console.log('hala')
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = createToken(user);
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        console.log("cookies set")

        res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email , role:user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

// Get profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.verify = async(req, res)=>{
    try {
    const token = req.cookies.token; 
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, 'jwt_secret_key');
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.json({ authenticated: true, role: user.role , userId: user._id, username: user.username, email: user.email });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}