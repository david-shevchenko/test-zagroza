import type { ReactNode } from "react";

// Dropdown.types.ts
export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options?: DropdownOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
  search?: boolean;

  filterFn?: (options: DropdownOption[], query: string) => DropdownOption[];

  asyncFilter?: (
    query: string,
    signal?: AbortSignal
  ) => Promise<DropdownOption[]>;

  renderItem?: (option: DropdownOption) => React.ReactNode;
  children?: (option: DropdownOption) => React.ReactNode;

  minQueryLength?: number;
  debounceMs?: number;
}
