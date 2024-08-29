const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 4000,
  e2e: {
    baseUrl: 'http://barrigarest.wcaquino.me',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
