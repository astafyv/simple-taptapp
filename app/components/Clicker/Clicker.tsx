"use client";

import { useState } from 'react';
import styles from './Clicker.module.css';

interface ClickerProps {
  onCoinClick: (x: number, y: number) => void;
  multiplier: number;
}

export function Clicker({ onCoinClick, multiplier }: ClickerProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onCoinClick(x, y);
  };

  return (
    <div className={styles.gameArea}>
      <button className={styles.clickerButton} onClick={handleClick}>
        <div className={styles.coin}>₿</div>
      </button>
    </div>
  );
}