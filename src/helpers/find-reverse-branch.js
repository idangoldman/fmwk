export default function findReverseBranch(leaf = '', tree = []) {
  const reverseBranch = [];

  const findBranch = (branch, currentLeaf) => {
    const [currentBranch, leafs] = branch;

    if (currentBranch === currentLeaf) {
      reverseBranch.push(currentLeaf);
    } else if (leafs.includes(currentLeaf)) {
      reverseBranch.push(currentBranch, currentLeaf);
    }
  };

  if (tree.includes(leaf)) {
    reverseBranch.push(leaf);
  } else {
    for (const branch of tree) {
      if (Array.isArray(branch)) {
        findBranch(branch, leaf);
      }
    }
  }

  return reverseBranch.reverse();
};
