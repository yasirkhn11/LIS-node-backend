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


// const express = require("express");
// require("dotenv").config(); // Load environment variables
// const config = require("./config/config"); // Import config.js

// const app = express();
// app.use(express.json());

// // Import Routes
// const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/user.routes");
// const patientRouter = require("./routes/patient.router");
// const testRouter = require("./routes/test.router");
// const orderRouter = require('./routes/order.router');
// const orderTestRouter = require('./routes/orderTest.router');
// const sampleRouter = require('./routes/sample.router');
// const roleRoutes = require('./routes/role.router');



// // Use Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use('/api/orders', orderRouter);
// app.use('/api/patients', patientRouter);
// app.use('/api/tests', testRouter);
// app.use('/api/orderTests', orderTestRouter);
// app.use('/api/samples', sampleRouter);
// app.use('/api/orderTests', orderTestRouter);
// app.use('/api/roles', roleRoutes);


// // Print JWT Secret to confirm it's loaded (for testing)
// console.log("JWT Secret Loaded:", config.JWT_SECRET);

// const PORT = config.PORT;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
const orderRouter = require('./routes/order.router');
const orderTestRouter = require('./routes/orderTest.router');
const sampleRouter = require('./routes/sample.router');
const roleRoutes = require('./routes/role.router');

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRouter);
app.use('/api/patients', patientRouter);
app.use('/api/tests', testRouter);
app.use('/api/orderTests', orderTestRouter); // Only this one should be here
app.use('/api/samples', sampleRouter);
app.use('/api/roles', roleRoutes);

// Print JWT Secret to confirm it's loaded (for testing)
if (!config.JWT_SECRET || !config.PORT) {
  console.error("Missing environment variables: JWT_SECRET or PORT");
} else {
  console.log("JWT Secret Loaded:", config.JWT_SECRET);
}

// Start the server
const PORT = config.PORT || 5000; // Fallback to 5000 if PORT is not set
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
