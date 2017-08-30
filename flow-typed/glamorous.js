/* eslint-disable */

// non strict version
declare module 'glamorous' {
  declare type CSSStyle = {
    [key: string]: string | number | { [key: string]: string | number },
  };

  declare type CSSDecl = (<A>(
    obj: ((props: A) => Object) | string | CSSStyle,
    ...rest: Array<void>
  ) => React$ComponentType<A>) &
    (<A>(
      obj: ((props: A) => Object) | string | CSSStyle,
      obj: ((props: A) => Object) | string | CSSStyle,
      ...rest: Array<void>
    ) => React$ComponentType<A>);

  declare type Glamorous = {
    // hack https://github.com/facebook/flow/issues/2966
    $call: (comp: React$ComponentType<{}>) => CSSDecl,

    div: CSSDecl,
  };

  declare export var Div: React$ComponentType<{}>;
  declare export default Glamorous
}
