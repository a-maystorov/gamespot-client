export default interface Column {
  label: string;
  path: string;
  key?: string;
  content?: (item: unknown) => JSX.Element;
}
