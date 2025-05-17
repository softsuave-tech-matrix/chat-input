declare module '*.png' {
    const content: any;
    export default content;
  }

  declare module '*.svg' {
    const content: React.FunctionComponent<
      React.SVGAttributes<SVGElement> & {testID?: string}
    >;
    export default content;
  }
  