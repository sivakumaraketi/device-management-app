const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
const port = 5001;

app.use(cors());
app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database('devices.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a new table for devices if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY,
    deviceName TEXT,
    deviceType TEXT,
    ownerName TEXT,
    batteryStatus INTEGER
  )
`);

// Route handler for POST /api/devices
app.post('/api/devices', (req, res) => {
  const { deviceName, deviceType, ownerName, batteryStatus } = req.body;
  // Add logic to insert the new device data into the database

  // For example, you can use your existing code to insert the data into the SQLite database
  db.run(
    'INSERT INTO devices (deviceName, deviceType, ownerName, batteryStatus) VALUES (?, ?, ?, ?)',
    [deviceName, deviceType, ownerName, batteryStatus],
    function (err) {
      if (err) {
        console.error('Error adding device:', err.message);
        res.status(500).json({ error: 'Error adding device' });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// Route handler for GET /api/devices
app.get('/api/devices', (req, res) => {
  // Fetch the list of devices from the database
  db.all('SELECT * FROM devices', (err, rows) => {
    if (err) {
      console.error('Error fetching devices:', err.message);
      res.status(500).json({ error: 'Error fetching devices' });
    } else {
      res.json(rows);
    }
  });
});

// Route handler for GET /api/devices/:deviceId
app.get('/api/devices/:deviceId', (req, res) => {
  const { deviceId } = req.params;
  // Fetch the device from the database based on the provided deviceId
  db.get('SELECT * FROM devices WHERE id = ?', [deviceId], (err, row) => {
    if (err) {
      console.error('Error fetching device:', err.message);
      res.status(500).json({ error: 'Error fetching device' });
    } else {
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: 'Device not found' });
      }
    }
  });
});

// Route handler for PUT /api/devices/:deviceId
app.put('/api/devices/:deviceId', (req, res) => {
  const { deviceId } = req.params;
  const { deviceName, deviceType, ownerName, batteryStatus } = req.body;

  // Add logic to update the device data in the database based on the provided deviceId

  db.run(
    'UPDATE devices SET deviceName = ?, deviceType = ?, ownerName = ?, batteryStatus = ? WHERE id = ?',
    [deviceName, deviceType, ownerName, batteryStatus, deviceId],
    function (err) {
      if (err) {
        console.error('Error updating device:', err.message);
        res.status(500).json({ error: 'Error updating device' });
      } else {
        res.json({ message: 'Device updated successfully' });
      }
    }
  );
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
