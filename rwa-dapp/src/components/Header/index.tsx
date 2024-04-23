import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";


const Header = () => {
    	const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
        useState(false);
      const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

      const closeAll = () => {
        setIsNetworkSwitchHighlighted(false);
        setIsConnectHighlighted(false);
      };

  return (
    <header>
      <div
        className={styles.backdrop}
        style={{
          opacity: isConnectHighlighted || isNetworkSwitchHighlighted ? 1 : 0,
        }}
      />
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/chaincredit1.png"
            alt="ChainCredit Logo"
            height="150"
            width="203"
          />
        </div>
        <nav className="flex items-center px-16 py-4 float-right">
          <Link href={"/"} style={{ color: "white", padding: "10px" }}>
            Home
          </Link>
          <Link
            href={"/lender"}
            style={{ color: "white", padding: "10px" }}
          >
            Lender
          </Link>
          <Link href={"/registrar"} style={{ color: "white", padding: "10px" }}>
              Registrar
          </Link>
        </nav>
        <div className={styles.buttons}>
          <div
            onClick={closeAll}
            className={`${styles.highlight} ${
              isNetworkSwitchHighlighted ? styles.highlightSelected : ``
            }`}
          >
            <w3m-network-button />
          </div>
          <div
            onClick={closeAll}
            className={`${styles.highlight} ${
              isConnectHighlighted ? styles.highlightSelected : ``
            }`}
          >
            <w3m-button />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
