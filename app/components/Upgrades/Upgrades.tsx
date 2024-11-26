import styles from './Upgrades.module.css';
import { Upgrade } from '@/app/types';

interface UpgradesProps {
  upgrades: Upgrade[];
  coins: number;
  onPurchase: (upgrade: Upgrade) => void;
}

export function Upgrades({ upgrades, coins, onPurchase }: UpgradesProps) {
  return (
    <div className={styles.upgradeSection}>
      {upgrades.map((upgrade) => (
        <button
          key={upgrade.id}
          className={`${styles.upgradeButton} ${
            coins >= upgrade.cost ? styles.available : ''
          }`}
          onClick={() => onPurchase(upgrade)}
          disabled={coins < upgrade.cost}
        >
          <div className={styles.upgradeName}>{upgrade.name}</div>
          <div className={styles.upgradeInfo}>
            Cost: {upgrade.cost} coins
            <br />
            Owned: {upgrade.count}
          </div>
        </button>
      ))}
    </div>
  );
}