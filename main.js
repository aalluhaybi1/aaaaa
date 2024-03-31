const express = require('express');
const path = require('path');

const app = express();

// Set the views directory
app.set('views', path.join(__dirname, 'templates'));

// Set the view engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    // Check file paths and verify file extensions
    // Make sure that the path to index.ejs is correct
    // and that this file exists in the specified location
    res.render('index');
});

app.get('/tp', (req, res) => {
    // Check file paths and verify file extensions
    // Make sure that the path to tp.ejs is correct
    // and that this file exists in the specified location
    res.render('tp');
});

app.get('/hous', (req, res) => {
    // Check file paths and verify file extensions
    // Make sure that the path to hous.ejs is correct
    // and that this file exists in the specified location
    res.render('hous');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
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
