import findReverseBranch from '/helpers/find-reverse-branch';

describe('findReverseBranch helper function tested', () => {
  let tree;

  beforeAll(() => {
    tree = [
      ['branch_1', ['leaf_1_1', 'leaf_1_2']],
      ['branch_2', ['leaf_2_1']],
      'leaf_0_1',
      'leaf_0_2'
    ];
  });

  test('Should return a leaf inside a branch', () => {
    const leaf = 'leaf_2_1';

    expect(findReverseBranch(leaf, tree)).toEqual(['leaf_2_1', 'branch_2']);
  });

  test('Should return a leaf without a branch', () => {
    const leaf = 'leaf_0_1';

    expect(findReverseBranch(leaf, tree)).toEqual(['leaf_0_1']);
  });
});
