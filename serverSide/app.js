require('dotenv').config();
const fs = require('fs');
const os = require('os');
const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require('express');
app = express();
app.use(express.text());
const bodyParser = require('body-parser');

function updateCounter() {
  const envPath = path.resolve(process.cwd(), '.env');

  // Ensure the .env file exists
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, '');
  }

  const envContent = fs.readFileSync(envPath, 'utf8');

  // Split content into lines and find the target key
  const lines = envContent.split(os.EOL);
  const counterIndex = lines.findIndex(line => line.startsWith(`COUNTER=`));

   if (counterIndex !== -1) {
    // Update existing key
    lines[counterIndex] = `COUNTER=${parseInt(process.env.COUNTER) + 1}`;
  } else {
    // Add new key if it doesn't exist
    lines.push(`COUNTER=1`);
  }

  // Write the updated content back to the .env file
  fs.writeFileSync(envPath, lines.join(os.EOL));

  // Reload the .env file to reflect changes in process.env
  require('dotenv').config({ path: envPath });
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  const clientInput = req.body.data;
  console.log(`Received input: ${clientInput}`);
  if (clientInput === 'true') {
    updateCounter();
  }
});

app.get('/api/data', (req, res) => {
  res.send(process.env.COUNTER); // Send data back as plain text
});


