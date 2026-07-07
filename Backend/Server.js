const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

require("dotenv").config();


const app = require("./src/app");
const connectDB = require("./src/config/db");
const generateToken = require("./src/utils/generateToken");


connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});