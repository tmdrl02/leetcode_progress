import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js"; // Import the SQL connection

import problemRoutes from "./routes/problemRoutes.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified in .env

console.log(PORT);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Security middleware
app.use(morgan("dev")); // Logging middleware

app.use(async (req,res,next) => {
  try {
    const decision = await aj.protect(req, {
        requested:1
    })

    if (decision.isDenied()) {
        if(decision.reason.isRateLimit()) {
            res.status(429).json({ error: "Rate limit exceeded" });
        } else if (decision.reason.isBot()) {
            res.status(403).json({ error: "Access denied for bots" });
        } else {
            res.status(403).json({ error: "Access denied" });
        }
        return
    }

    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
        res.status(403).json({ error: "Access denied for spoofed requests" });
        return;
    }
    next();
  } catch (error) {
    console.log("Arcjet error:", error);
    next(error); // Pass the error to the next middleware
  }
});

app.use("/api/problems", problemRoutes); // Use problem routes

async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS problems (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          difficulty VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});