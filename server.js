
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const path = require('path');

// const app = express();

// // ---------------------- MongoDB ----------------------
// mongoose.connect('mongodb://127.0.0.1:27017/mycrud')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });
// const User = mongoose.model('User', userSchema);

// // ---------------------- Middleware ----------------------
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// // ---------------------- Authentication Middleware ----------------------
// function authMiddleware(req, res, next) {
//     if (!req.session.username) return res.redirect('/login');
//     next();
// }

// // ---------------------- Routes ----------------------

// // Login page
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

// // Login POST
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.send('Enter both username and password');

//     req.session.username = username;
//     req.session.password = password;

//     res.redirect('/dashboard');
// });

// // Logout
// app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) return res.send('Error logging out');
//         res.redirect('/login');
//     });
// });

// // Dashboard page
// app.get('/dashboard', authMiddleware, (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
// });

// // ---------------------- CRUD Routes ----------------------

// // Show signup form
// app.get('/signup', authMiddleware, (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });

// // Admin page to view all users
// app.get('/admin', authMiddleware, (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'admin.html'));
// });

// // API to add user
// app.post('/api/users', authMiddleware, async (req, res) => {
//     const { name, email, password } = req.body;
//     const user = new User({ name, email, password });
//     await user.save();
//     res.json({ success: true, user });
// });

// // API to get all users
// app.get('/api/users', authMiddleware, async (req, res) => {
//     const users = await User.find();
//     res.json(users);
// });

// // ---------------------- Start Server ----------------------
// const PORT = 4000;
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));



// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const path = require('path');

// const app = express();

// // ---------------------- MongoDB ----------------------
// mongoose.connect('mongodb://127.0.0.1:27017/mycrud')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });
// const User = mongoose.model('User', userSchema);

// // ---------------------- Middleware ----------------------
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// // ---------------------- Authentication Middleware ----------------------
// function authMiddleware(req, res, next) {
//     if (!req.session.username) return res.redirect('/login');
//     next();
// }

// // ---------------------- Routes ----------------------

// // Login page
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

// // Login POST
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.send('Enter both username and password');
//     req.session.username = username;
//     req.session.password = password;
//     res.redirect('/dashboard');
// });

// // Logout
// app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) return res.send('Error logging out');
//         res.redirect('/login');
//     });
// });

// // Dashboard page
// app.get('/dashboard', authMiddleware, (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
// });

// // Signup page
// // app.get('/signup', authMiddleware, (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// // });

// // Serve signup page
// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });


// // Admin page
// app.get('/admin', authMiddleware, (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'admin.html'));
// });

// // ---------------------- CRUD API Routes ----------------------


// // Signup API - auto login new user
// app.post('/api/users', async (req, res) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//         return res.status(400).json({ error: 'Email already exists' });
//     }

//     const user = new User({ name, email, password });
//     await user.save();

//     // ✅ Auto-login so /admin works
//     req.session.username = email;

//     res.json({ success: true, user });
// });

// // Add new user
// app.post('/api/users', authMiddleware, async (req, res) => {
//     const { name, email, password } = req.body;
//     const user = new User({ name, email, password });
//     await user.save();
//     res.json({ success: true, user });
// });

// // Get all users
// app.get('/api/users', authMiddleware, async (req, res) => {
//     const users = await User.find();
//     res.json(users);
// });

// // Update user
// app.put('/api/users/:id', authMiddleware, async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) return res.status(404).json({ error: 'User not found' });
//         user.name = name;
//         user.email = email;
//         user.password = password;
//         await user.save();
//         res.json({ success: true, user });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Delete user
// app.delete('/api/users/:id', authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         if (!user) return res.status(404).json({ error: 'User not found' });
//         res.json({ success: true });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ---------------------- Start Server ----------------------
// const PORT = 4000;
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));




const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// ---------------------- MongoDB ----------------------
mongoose.connect('mongodb://127.0.0.1:27017/mycrud')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', userSchema);

// ---------------------- Middleware ----------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------- Authentication Middleware ----------------------
function authMiddleware(req, res, next) {
    if (!req.session.username) return res.redirect('/login.html');
    next();
}

// ---------------------- Routes ----------------------

// Login page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

// Login POST
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.send('Enter both username and password');

    // ✅ check against DB
    const user = await User.findOne({ email: username, password });
    if (!user) return res.status(401).send('Invalid credentials');

    req.session.username = user.email;
    res.redirect('/dashboard');
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Error logging out');
        res.redirect('/login.html');
    });
});

// Dashboard page
app.get('/dashboard', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Admin page
app.get('/admin', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Admin page (protected)
app.get('/admin', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});


// ---------------------- CRUD API Routes ----------------------

// Signup API (creates user + auto-login)
app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    // ✅ Auto-login
    req.session.username = email;

    res.json({ success: true, user });
});

// Get all users
app.get('/api/users', authMiddleware, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Update user
app.put('/api/users/:id', authMiddleware, async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user
app.delete('/api/users/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------------- Start Server ----------------------
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
