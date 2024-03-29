import { describe, it, before } from 'node:test';
import assert from 'node:assert'
import findReverseBranch from '#root/src/helpers/find-reverse-branch.js'

describe('findReverseBranch helper function tested', () => {
  let tree

  before(() => {
    tree = [
      ['branch_1', ['leaf_1_1', 'leaf_1_2']],
      ['branch_2', ['leaf_2_1']],
      'leaf_0_1',
      'leaf_0_2'
    ]
  })

  it('Should return a leaf inside a branch', () => {
    const leaf = 'leaf_2_1'

    assert.deepStrictEqual(findReverseBranch(leaf, tree), ['leaf_2_1', 'branch_2'])
  })

  it('Should return a leaf without a branch', () => {
    const leaf = 'leaf_0_1'

    assert.deepStrictEqual(findReverseBranch(leaf, tree), ['leaf_0_1'])
  })
})
