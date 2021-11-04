declare module '*.css' {
  const style: Record<string, string>;
  export default style;
}
declare module '*.less' {
  const style: Record<string, string>;
  export default style;
}
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
