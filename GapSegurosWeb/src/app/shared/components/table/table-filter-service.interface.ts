export interface ITableFilterService<TElement> {
  matches(element: TElement, searchTerm: string): boolean;
}
