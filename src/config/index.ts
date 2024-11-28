import { http, createConfig } from 'wagmi'
import { bscTestnet,bsc,hardhat } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [bscTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [bscTestnet.id]: http(),
  },
})