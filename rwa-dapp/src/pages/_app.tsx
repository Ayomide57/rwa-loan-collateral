import "@/styles/globals.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Layout from "@/components/Layouts";

import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
  sepolia,
  shardeumSphinx,
} from "wagmi/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const chains = [
  mainnet,
  sepolia,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom,
  shardeumSphinx
];

// 1. Get projectID at https://cloud.walletconnect.com


const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const clientId = process.env.NEXT_PUBLIC_ClIENT_ID || "";


const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal v3 + Wagmi",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <ThirdwebProvider
            clientId={clientId} // You can get a client id from dashboard settings
            activeChain="sepolia"
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThirdwebProvider>
        </WagmiConfig>
      ) : null}
    </>
  );
}
