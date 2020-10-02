export type ThemeValue = 'light' | 'dark';
export interface Theme {
  label: string;
  value: ThemeValue;
}

export const DEFAULT_THEME: ThemeValue = 'light';
export const THEMES: Theme[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];
