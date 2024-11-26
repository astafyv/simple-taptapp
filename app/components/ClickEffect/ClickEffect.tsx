import styles from './ClickEffect.module.css';

interface ClickEffectProps {
  x: number;
  y: number;
  value: number;
}

export function ClickEffect({ x, y, value }: ClickEffectProps) {
  return (
    <span
      className={styles.clickEffect}
      style={{ left: x + 'px', top: y + 'px' }}
    >
      +{value}
    </span>
  );
}