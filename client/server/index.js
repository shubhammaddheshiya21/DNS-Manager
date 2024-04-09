require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const dnsRoutes = require('./routes/dnsRoutes');
const DNSRecord = require('./models/DNSRecord');
const sampleDNSRecords = require('./sampleDNSRecords'); 
const cors = require('cors'); 
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();
app.use(cors());
// Use your routes
app.use(express.json()); 
app.use('/api', dnsRoutes);


// sampleDNSRecords.forEach(async (record) => {
//   const newDNSRecord = new DNSRecord(record);

//   try {
//     const result = await newDNSRecord.save();
//     console.log('DNS record inserted successfully:', result);
//   } catch (error) {
//     console.error('Error inserting DNS record:', error);
//   }
// });

// static files
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
