export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  multiplier: number;
  count: number;
  perSecond?: number;
}