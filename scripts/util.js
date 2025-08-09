/**
 * Makes a deep comparison of the supplied layouts to determine.
 * Note: if there are fewer than 2 layouts i.e. nothing to compare against, this method returns `true`.
 *
 * @param  {Array} layouts the layouts to be compared, in `Life.layout` format
 * @returns true if all layouts contain the same elements in the same order; false otherwise
 */
export const layoutsAreEquivalent = (...layouts) => {
  if (layouts.length > 1) {
    const refLayout = layouts[0];
    // iterate over the other layouts
    for (let i = 1; i < layouts.length; i++) {
      const layout = layouts[i];
      if (layout.length !== refLayout.length) return false;
      // iterate over the rows of each layout
      for (let y = 0; y < layout.length; y++) {
        if (layout[y].length !== refLayout[y].length) return false;
        // iterate over the cells of each row
        for (let x = 0; x < layout[y].length; x ++) {
          // return false as soon as any discrepancy is found
          if (layout[y][x] !== refLayout[y][x]) return false;
        }
      }
    }
  };
  return true;
}