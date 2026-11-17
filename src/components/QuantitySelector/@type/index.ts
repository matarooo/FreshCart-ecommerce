export type QuantitySelectorProps = {
  value: number;
  max: number;
  onChange: (quantity: number) => void;
  label?: string;
  disabled?: boolean;
  large?: boolean;
};
