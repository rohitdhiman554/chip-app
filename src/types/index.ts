export type Item = string;

export interface SearchState {
  items: Item[];
  selectedItems: Item[];
  highlightedIndex: number | null;
}
