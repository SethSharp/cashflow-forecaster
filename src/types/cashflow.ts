export type CashflowType = 'income' | 'expense'
export type Frequency = 'daily' | 'weekly' | 'monthly'

export type CashflowEntry = {
  id: string;
  label: string;
  amount: number;
  type: CashflowType;
  frequency: Frequency;
}
