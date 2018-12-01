const { sync } = require('./src/postgres');
  
(async () => {
  await sync();
  process.exit(0);
})();
