const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set the views directory and view engine
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    // Define the variables to be passed to the template
    const data = {
        phoneNumber: '123-456-7890', // Example phone number
        email: 'example@example.com', // Example email
        address: '123 Example St, City, Country', // Example address
        supportEmail: 'support@example.com', // Example support email
        phoneNo: '987-654-3210' // Example phone number for hous.ejs
    };
    res.render('index', data);
});

// Define a route for /tp
app.get('/tp', (req, res) => {
    const data = {
        phoneNumber: '123-456-7890', // Example phone number
        email: 'example@example.com', // Example email
        address: '123 Example St, City, Country', // Example address
        supportEmail: 'support@example.com', // Example support email
        phoneNo: '987-654-3210' // Example phone number for hous.ejs
    };
    res.render('tp', data); // Now 'data' is defined and can be passed to the template
});

app.get('/hous', (req, res) => {
    const data = {
        phoneNumber: '123-456-7890', // Example phone number
        email: 'example@example.com', // Example email
        address: '123 Example St, City, Country', // Example address
        supportEmail: 'support@example.com', // Example support email
        phoneNo: '987-654-3210' // Example phone number for hous.ejs
    };
    res.render('hous', data); // Now 'data' is defined and can be passed to the template
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
});


// function toggleMobileMenu() {
//   var navbarCollapse = document.getElementById("navbarCollapse");
//   navbarCollapse.classList.toggle("open");
// }

// // This function will be called when any nav link is clicked
// function closeMenu() {
//   var navbarCollapse = document.getElementById("navbarCollapse");
//   // Check if the menu is open, if so, close it
//   if (navbarCollapse.classList.contains("open")) {
//     navbarCollapse.classList.remove("open");
//   }
// }

// // Add event listener to the toggle button
// var navbarToggler = document.querySelector(".navbar-toggler");
// navbarToggler.addEventListener("click", toggleMobileMenu);

// // Add event listener to each nav link
// var navLinks = document.querySelectorAll("#mySidenav a.nav-link");
// navLinks.forEach(function (link) {
//   link.addEventListener("click", closeMenu);
// });
