"use client";
import "@/styles/globals.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { useEffect, useState } from "react";
import Layout from "@/components/Layouts";

import {
  mainnet,
  sepolia,  
} from "wagmi/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { config, neo } from "@/util/config";
import { Toaster } from "react-hot-toast";

const chains = [
  mainnet,
  sepolia,
  neo
];

// 1. Get projectID at https://cloud.walletconnect.com

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const clientId = process.env.NEXT_PUBLIC_ClIENT_ID || "";

const metadata = {
  name: "ChainCredit",
  description: "Revolutionize Loan Platform",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <html>
      <body>
        {ready ? (
          <WagmiConfig config={config}>
            <ThirdwebProvider
              clientId={clientId} // You can get a client id from dashboard settings
              activeChain="sepolia"
            >
              <Layout>
                <Toaster position="bottom-center" />
                {children}
              </Layout>
            </ThirdwebProvider>
          </WagmiConfig>
        ) : null}
      </body>
    </html>
  );
}
