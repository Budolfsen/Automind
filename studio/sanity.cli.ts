import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wsuw1ozz',
    dataset: 'production',
  },
  deployment: {
    appId: 'xoeq0ac4fbswdq5ty5i6b2up',
  },
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom', 'styled-components'],
    },
  },
})
