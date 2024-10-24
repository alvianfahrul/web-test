// Import dependencies
const express = require("express");
const os = require("os");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

function getServerIP() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address; // Mengembalikan IP address
      }
    }
  }
  return "IP not found"; // Jika tidak ditemukan
}

// Route to get data from the database
app.get("/", (req, res) => {
  const serverIP = getServerIP();
  const sql = "SELECT * FROM users"; // Ganti dengan nama tabel kamu

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Buat HTML dari hasil query
    let htmlContent = `<h1>${serverIP}</h1>`;
    htmlContent += "<h1>Daftar Pengguna</h1><ul>";
    results.forEach((user) => {
      htmlContent += `<li>ID: ${user.id}, Name: ${user.name}, Age: ${user.age}</li>`;
    });
    htmlContent += "</ul>";

    // Mengirimkan hasil sebagai HTML
    res.send(htmlContent);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
