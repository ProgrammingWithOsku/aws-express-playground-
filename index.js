require('dotenv').config(); // Load environment variables
const app = require('./app'); // Import the app instance

const port = process.env.PORT || 4000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});