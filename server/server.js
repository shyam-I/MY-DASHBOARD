require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const taskRoutes = require("./routes/tasks")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/tasks", taskRoutes)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err))

app.get("/", (req, res) => {
  res.send("Dashboard API running 🚀")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})