import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Substitua pela URL da sua aplicação
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // It's important to return the config object
      // with any changes made
      return config;
    },
  },
});