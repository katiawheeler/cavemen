/**
 * Combines a variable number of style objects and style functions into a single style object.
 * @function
 * @param  {...any} styles - Style object or theme function for @emotion/core.
 * @returns {object} The composed style object.
 */
export const csx = (...styles: any) => (theme: any) =>
  styles.reduce((a: any, style: any) => {
    if (typeof style === 'object') {
      return { ...a, ...style };
    }
    if (typeof style === 'function') {
      return { ...a, ...style(theme) };
    }
    return a;
  }, {});
