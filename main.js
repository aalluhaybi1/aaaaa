const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up views and view engine
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// MongoDB connection setup
const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}

// Routes
app.get('/', async (req, res) => {
  try {
    const nameData = await getNameData();
    res.render('index', { pageTitle: 'Name App', nameData, csrfToken: req.csrfToken() });
  } catch (error) {
    console.error('Error rendering index:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/tp', (req, res) => {
  const data = {
    phoneNumber: '123-456-7890',
    email: 'example@example.com',
    address: '123 Example St, City, Country',
    supportEmail: 'support@example.com',
    phoneNo: '987-654-3210'
  };
  res.render('tp', data);
});

app.get('/hous', async (req, res) => {
  try {
    const nameData = await getNameData();
    res.render('hous', { nameData, csrfToken: req.csrfToken() });
  } catch (error) {
    console.error('Error rendering hous page:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/addName', async (req, res) => {
  try {
    await insertName(req.body);
    res.redirect('/review');
  } catch (error) {
    console.error('Error adding name:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/updateName', async (req, res) => {
  try {
    const nameToUpdate = await getNameById(req.query.devId);
    res.render('/review', { pageTitle: 'Update Name Info', nameData: nameToUpdate, csrfToken: req.csrfToken() });
  } catch (error) {
    console.error('Error rendering update page:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/updateName', async (req, res) => {
  try {
    await updateName(req.body);
    res.redirect('/review');
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/deleteName', async (req, res) => {
  try {
    await deleteName(req.body.devId);
    res.redirect('/review');
  } catch (error) {
    console.error('Error deleting name:', error);
    res.status(500).send('Internal Server Error');
  }
});

// review page
app.get('/review', async (req, res) => {
  try {
    const nameData = await getNameData(); // Fetch the data needed for the review
    res.render('review', { 
      nameData: nameData, // Pass the array of data to the template
      csrfToken: req.csrfToken() 
    });
  } catch (error) {
    console.error('Error rendering review page:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/review', async (req, res) => {
  try {
    // Process the submitted form data here if needed
    // Then render the review.ejs template with the processed data
    res.render('review', { /* Data to pass to the template */ });
  } catch (error) {
    console.error('Error processing form data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Helper functions
async function getNameData() {
  const collection = client.db('aaaa').collection('aaaa');
  return await collection.find().toArray();
}

async function insertName(data) {
  const collection = client.db('aaaa').collection('aaaa');
  await collection.insertOne(data);
}

async function getNameById(id) {
  const collection = client.db('aaaa').collection('aaaa');
  return await collection.findOne({ _id: new ObjectId(id) });
}

async function updateName(data) {
  const { devId, ...update } = data;
  const collection = client.db('aaaa').collection('aaaa');
  await collection.updateOne({ _id: new ObjectId(devId) }, { $set: update });
}

async function deleteName(id) {
  const collection = client.db('aaaa').collection('aaaa');
  await collection.deleteOne({ _id: new ObjectId(id) });
}

// Start the server
async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
  process.exit(1);
});
