const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'rachit',
  password: '1234',
  database: 'backend',
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle registration requests
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Insert the registration data into the database
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const values = [name, email, password];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'An error occurred while registering the user' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});


// Route to handle login requests
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database for the user with the given email and password
  connection.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Internal server error');
      } else if (results.length === 0) {
        res.status(401).send('Invalid email or password');
      } else {
        // Authentication successful, send the user details to the client
        const user = {
          id: results[0].id,
          name: results[0].name,
          email: results[0].email,
        };
        res.status(200).json({ success: true, user });
      }
    }
  );
});


// Route to handle switch toggle requests
// ...
let toggleValues = {
  switch1: 'no',
  switch2: 'no',
  switch3: 'no',
  switch4: 'no',
};

app.get('/toggle-values-living', (req, res) => {
  res.json(toggleValues);
});

app.post('/toggle-living', (req, res) => {
  const { index, value } = req.body;

  // Update the toggle values in the database
  toggleValues[index] = value;

  // Update the corresponding device in the database with the new value
  const sql = 'UPDATE living_room SET status = ? WHERE device_name = ?';
  const values = [value, index];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'An error occurred while updating the value' });
    } else {
      console.log('Value updated successfully');
      res.status(200).json({ message: 'Value updated successfully' });
    }
  });
});

// ...
// ...

app.post('/update-status-living', (req, res) => {
  const { index, value } = req.body;

  // Update the corresponding devices in the database with the new value
  const sql = 'UPDATE living_room SET status = ?';
  const values = [value];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating status for Living Room devices:', error);
      res.status(500).json({ error: 'An error occurred while updating the status' });
    } else {
      console.log('Status updated successfully for Living Room devices');
      res.status(200).json({ message: 'Status updated successfully for Living Room devices' });
    }
  });
});



app.get('/toggle-values-bed', (req, res) => {
  res.json(toggleValues);
});

app.post('/toggle-bed', (req, res) => {
  const { index, value } = req.body;

  // Update the toggle values in the database
  toggleValues[index] = value;

  // Update the corresponding device in the database with the new value
  const sql = 'UPDATE bed_room SET status = ? WHERE device_name = ?';
  const values = [value, index];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'An error occurred while updating the value' });
    } else {
      console.log('Value updated successfully');
      res.status(200).json({ message: 'Value updated successfully' });
    }
  });
});

// ...
// ...

app.post('/update-status-bed', (req, res) => {
  const { index, value } = req.body;

  // Update the corresponding devices in the database with the new value
  const sql = 'UPDATE bed_room SET status = ?';
  const values = [value];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating status for Bed Room devices:', error);
      res.status(500).json({ error: 'An error occurred while updating the status' });
    } else {
      console.log('Status updated successfully for Bed Room devices');
      res.status(200).json({ message: 'Status updated successfully for Bed Room devices' });
    }
  });
});


//
app.get('/toggle-values-bath', (req, res) => {
  res.json(toggleValues);
});

app.post('/toggle-bath', (req, res) => {
  const { index, value } = req.body;

  // Update the toggle values in the database
  toggleValues[index] = value;

  // Update the corresponding device in the database with the new value
  const sql = 'UPDATE bath_room SET status = ? WHERE device_name = ?';
  const values = [value, index];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'An error occurred while updating the value' });
    } else {
      console.log('Value updated successfully');
      res.status(200).json({ message: 'Value updated successfully' });
    }
  });
});

// ...
// ...

app.post('/update-status-bath', (req, res) => {
  const { index, value } = req.body;

  // Update the corresponding devices in the database with the new value
  const sql = 'UPDATE bath_room SET status = ?';
  const values = [value];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating status for Bath Room devices:', error);
      res.status(500).json({ error: 'An error occurred while updating the status' });
    } else {
      console.log('Status updated successfully for Bath Room devices');
      res.status(200).json({ message: 'Status updated successfully for Bath Room devices' });
    }
  });
});

app.get('/toggle-values-kitchen', (req, res) => {
  res.json(toggleValues);
});

app.post('/toggle-kitchen', (req, res) => {
  const { index, value } = req.body;

  // Update the toggle values in the database
  toggleValues[index] = value;

  // Update the corresponding device in the database with the new value
  const sql = 'UPDATE kitchen SET status = ? WHERE device_name = ?';
  const values = [value, index];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'An error occurred while updating the value' });
    } else {
      console.log('Value updated successfully');
      res.status(200).json({ message: 'Value updated successfully' });
    }
  });
});

// ...
// ...

app.post('/update-status-kitchen', (req, res) => {
  const { index, value } = req.body;

  // Update the corresponding devices in the database with the new value
  const sql = 'UPDATE kitchen SET status = ?';
  const values = [value];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating status for Kitchen devices:', error);
      res.status(500).json({ error: 'An error occurred while updating the status' });
    } else {
      console.log('Status updated successfully for Kitchen devices');
      res.status(200).json({ message: 'Status updated successfully for Kitchen devices' });
    }
  });
});




// ...



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});