import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/catalogo-barbantes', // <--- VERIFIQUE ESTE ENDEREÇO
    setupNodeEvents(on, config) {
      return config
    },
  },
})
