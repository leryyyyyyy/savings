const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/deposit", require("./routes/depositRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/amount", require("./routes/depositAmountRoute"));
app.use("/api/loan", require("./routes/loanRoute"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
