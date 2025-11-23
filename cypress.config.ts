import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Your Vite dev server URL
    chromeWebSecurity: false, // Add this

    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Disable video recording (optional)
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
