
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
const resultRouter = require('./routes/result.router')

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRouter);
app.use('/api/patients', patientRouter);
app.use('/api/tests', testRouter);
app.use('/api/orderTests', orderTestRouter); // Only this one should be here
app.use('/api/samples', sampleRouter);
app.use('/api/roles', roleRoutes);
app.use('/api/results',resultRouter);

// Print JWT Secret to confirm it's loaded (for testing)
if (!config.JWT_SECRET || !config.PORT) {
  console.error("Missing environment variables: JWT_SECRET or PORT");
} else {
  console.log("JWT Secret Loaded:", config.JWT_SECRET);
}

// Start the server
const PORT = config.PORT || 5000; // Fallback to 5000 if PORT is not set
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
