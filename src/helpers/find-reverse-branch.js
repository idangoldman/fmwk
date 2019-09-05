/**
 * @description
 * Searches an {@link EventsList} array for a specific item and returns the trail from it.
 *
 * @param  {String}     leaf  String value to be found in the array
 * @param  {EventsList} tree  Nested array of string values.
 * @return {Array}            Flat array that indicates the path to the leaf in reverse.
 *
 * @example
 *
 * const tree = [['branch_1', ['leaf_1_1', 'leaf_1_2']], ['branch_2', ['leaf_2_1']], 'leaf_0'];
 * const leaf = 'leaf_1_2';
 *
 * console.log(
 *   'The branch is:', findReverseBranch(leaf, tree)
 * );
 *
 * // ['leaf_1_2', 'branch_1']
 */

const findReverseBranch = (leaf = '', tree = []) => {
  const newBranch = [];

  if (tree.includes(leaf)) {
    newBranch.push(leaf);
  } else {
    for (const branch of tree) {
      if (!Array.isArray(branch)) continue;

      const [currentBranch, leafs] = branch;

      if (currentBranch === leaf) {
        newBranch.push(leaf);
      } else if (leafs.includes(leaf)) {
        newBranch.push(currentBranch, leaf);
      }
    }
  }

  return newBranch.reverse();
};

export default findReverseBranch;
