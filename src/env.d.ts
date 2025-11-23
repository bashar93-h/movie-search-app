// TS defenition file
// TypeScript doesn't natively understand:
// 1.vue files
// 1.Vite's special import.meta features
// 1.doesn’t automatically know about environment variables.
/// <reference types="vite/client" />

// Vite environment variables
interface ImportMetaEnv {
  readonly VITE_OMDB_API_KEY: string
  readonly VITE_TMDB_API_KEY: string
  readonly VITE_OMDB_BASE_URL: string
  readonly VITE_TMDB_BASE_URL: string
  readonly BASE_URL: string
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Vue single-file components
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
