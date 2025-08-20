const fs = require('fs');

// Remove BrokerTable component
try {
  fs.unlinkSync('src/components/BrokerTable.astro');
  console.log('Deleted BrokerTable.astro');
} catch (err) {
  console.error('Error deleting BrokerTable.astro:', err.message);
}

// Clean up temporary files
try {
  fs.unlinkSync('delete.txt');
  console.log('Deleted delete.txt');
} catch (err) {
  console.error('Error deleting delete.txt:', err.message);
}

try {
  fs.unlinkSync('cleanup.js');
  console.log('Deleted cleanup.js');
} catch (err) {
  console.error('Error deleting cleanup.js:', err.message);
}