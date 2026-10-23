
require("dotenv").config({
  path: require("path").join(__dirname, ".env"),
});

const app = require("./app");
const cors = require("cors");

app.use(
  cors({
    origin: [
      "https://crane-project.vercel.app",
      "https://crane-project-ms6by6ed6-suyeon19.vercel.app",
      "https://crane-project-y3vnhr8ka-suyeon19.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Crane API server: http://localhost:${PORT}`);
});
