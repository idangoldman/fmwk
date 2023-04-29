const findReverseBranch = (leaf = '', tree = []) => {
  const newBranch = []

  if (tree.includes(leaf)) {
    newBranch.push(leaf)
  } else {
    for (const branch of tree) {
      if (!Array.isArray(branch)) continue

      const [currentBranch, leafs] = branch

      if (currentBranch === leaf) {
        newBranch.push(leaf)
      } else if (leafs.includes(leaf)) {
        newBranch.push(currentBranch, leaf)
      }
    }
  }

  return newBranch.reverse()
}

export default findReverseBranch
