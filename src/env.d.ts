/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID: string
  readonly SANITY_DATASET: string
  readonly SANITY_API_READ_TOKEN: string
}

declare module '*.svg?raw' {
  const content: string
  export default content
}
