export interface SelectOption {
  label: string;
  value: string | number;
}

export interface TreeSelectOption {
  label: string;
  value: string | number;
  children?: TreeSelectOption[];
}
