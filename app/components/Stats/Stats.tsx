import styles from './Stats.module.css';

interface StatsProps {
  coins: number;
  multiplier: number;
}

export function Stats({ coins, multiplier }: StatsProps) {
  return (
    <div className={styles.stats}>
      <h1 className={styles.coins}>{Math.floor(coins)} coins</h1>
      <p className={styles.multiplier}>Per click: {multiplier}x</p>
    </div>
  );
}