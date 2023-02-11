declare module '*.png' {
  const value: string;
  export = value
}
interface Window {
  mount: () => void
  unmount: () => void
}