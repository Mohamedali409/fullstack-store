import "dotenv/config";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
