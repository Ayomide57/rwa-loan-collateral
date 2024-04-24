import { http } from 'viem';
import { createConfig } from 'wagmi';
import { mainnet, sepolia, shardeumSphinx } from 'wagmi/chains';

declare module 'wagmi' { 
  interface Register { 
    config: typeof configA 
  } 
} 


export const configA = createConfig({ 
  chains: shardeumSphinx, 
  transports: { 
    [shardeumSphinx.id]: http(), 
  }, 
}) 
