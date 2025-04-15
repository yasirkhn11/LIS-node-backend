// const express = require('express');
// const app = express();
// const PORT = 4000;

// app.use(express.json());

// app.get('/' , (req ,res)=>{
//     res.send('Welcome to backend');
// });

// app.listen(PORT, ()=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const sequelize = require('./config/database');

// const app = express();
// const PORT = 4000;

// app.use(express.json());

// // Test route
// app.get('/', (req, res) => {
//     res.send('LIS Backend is running!');
// });

// // Sync database (Optional: Use force:false to prevent data loss)
// sequelize.sync({ force: false })
//     .then(() => console.log('Database synced'))
//     .catch(err => console.error('Error syncing database:', err));

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// const express = require("express");
// require("dotenv").config();
// const config = require("./config/config")
// const sequelize = require("./config/database");

// const app = express();
// app.use(express.json());

// // Import routes
// const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/user.routes");

// // Use routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// // Root test route
// app.get("/", (req, res) => {
//     res.send("LIS Backend is running!");
// });

// // Sync DB and start server
// const PORT = process.env.PORT || 4000;
// sequelize.sync({ force: false }) // Or use { alter: true } if needed
//     .then(() => {
//         console.log("Database synced successfully.");
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error("Failed to sync database:", err);
//     });


const express = require("express");
require("dotenv").config(); // Load environment variables
const config = require("./config/config"); // Import config.js

const app = express();
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const patientRouter = require("./routes/patient.router");
const testRouter = require("./routes/test.router");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.use('/api/patients', patientRouter);
app.use('/api/tests', testRouter);

// Print JWT Secret to confirm it's loaded (for testing)
console.log("JWT Secret Loaded:", config.JWT_SECRET);

const PORT = config.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
