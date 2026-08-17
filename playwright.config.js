const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir:'./tests',
  timeout:30000,
  workers:1,
  use:{baseURL:'http://127.0.0.1:4173',viewport:{width:1828,height:1057},screenshot:'only-on-failure',trace:'retain-on-failure',video:'retain-on-failure'},
  webServer:{command:'node scripts/serve.js',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI}
});
