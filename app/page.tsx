"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Stats } from "./components/Stats/Stats";
import { Clicker } from "./components/Clicker/Clicker";
import { ClickEffect } from "./components/ClickEffect/ClickEffect";
import { Upgrades } from "./components/Upgrades/Upgrades";
import { Upgrade } from "./types";

export default function Home() {
  const [coins, setCoins] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [clickEffect, setClickEffect] = useState({ x: 0, y: 0, show: false });
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: "tap",
      name: "Better Tap",
      cost: 10,
      multiplier: 1,
      count: 0,
    },
    {
      id: "auto",
      name: "Auto Clicker",
      cost: 50,
      multiplier: 1,
      count: 0,
      perSecond: 1,
    },
  ]);

  useEffect(() => {
    const savedState = localStorage.getItem("clickerState");
    if (savedState) {
      const { coins, upgrades } = JSON.parse(savedState);
      setCoins(coins);
      setUpgrades(upgrades);
      setMultiplier(calculateMultiplier(upgrades));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "clickerState",
      JSON.stringify({
        coins,
        upgrades,
      })
    );
  }, [coins, upgrades]);

  useEffect(() => {
    const autoClickerUpgrade = upgrades.find((u) => u.id === "auto");
    if (!autoClickerUpgrade?.count) return;

    const interval = setInterval(() => {
      setCoins((prev) => 
        prev + autoClickerUpgrade.count * (autoClickerUpgrade.perSecond || 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [upgrades]);

  const calculateMultiplier = (currentUpgrades: Upgrade[]) => {
    const tapUpgrade = currentUpgrades.find((u) => u.id === "tap");
    return 1 + (tapUpgrade?.count || 0);
  };

  const handleCoinClick = (x: number, y: number) => {
    setClickEffect({ x, y, show: true });
    setTimeout(() => setClickEffect({ x, y, show: false }), 300);

    setCoins((prev) => prev + multiplier);
    playClickSound();
  };

  const playClickSound = () => {
    const audio = new Audio("/click.mp3");
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  const purchaseUpgrade = (upgrade: Upgrade) => {
    if (coins >= upgrade.cost) {
      setCoins((prev) => prev - upgrade.cost);
      setUpgrades((prev) =>
        prev.map((u) =>
          u.id === upgrade.id
            ? {
                ...u,
                count: u.count + 1,
                cost: Math.floor(u.cost * 1.5),
              }
            : u
        )
      );
      if (upgrade.id === "tap") {
        setMultiplier((prev) => prev + 1);
      }
    }
  };

  return (
    <main className={styles.main}>
      <Stats coins={coins} multiplier={multiplier} />
      <div style={{ position: 'relative' }}>
        <Clicker onCoinClick={handleCoinClick} multiplier={multiplier} />
        {clickEffect.show && (
          <ClickEffect x={clickEffect.x} y={clickEffect.y} value={multiplier} />
        )}
      </div>
      <Upgrades
        upgrades={upgrades}
        coins={coins}
        onPurchase={purchaseUpgrade}
      />
    </main>
  );
}