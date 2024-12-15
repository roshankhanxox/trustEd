import { defineConfig } from '@wagmi/cli'
import { abi } from './abi'
import { react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'CertificateVerification',
      abi:abi,
    },
  ],
  plugins: [
    react(),
  ],
})
