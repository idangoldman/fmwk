# Feature

Opinionated javascript framework, built with jQuery and Rails in mind.

## Install

This is as basic as running:

```bash
  npm install
  pnpm install
  yarn install
```

Choose your favorite package manager and follow along. For the rest of the documentation examples, I will use **Yarn** for consistency reasons.

## Test

Tests for this repo done with **Jest** and complimented with **ESLint**. Here is what you can do with them:

```bash
  yarn test                  # Running all the tests once.
  yarn test:watch            # Running and watching all the tests.
  yarn test:coverage         # Running all tests and generates a coverage folder.
                             #  At the end of the run shows a coverage report table.
  yarn test:update:snapshot  # Update test's snapshot.
```

Running test commands will execute 2 testing suits:

1. **tests**, all the unit and integration tests written by us.
2. **eslint**, extends standard set of rules with a couple of our own.

Tests are awesome, with that written they are also a pain in the ass to set up and maintain. So, if you see badly written tests or lack of them in some areas, fill free to let me know or better yet send a pull request.

## Configuration files

I thought it would be helpful to show a list of most used libraries in this project and link to their configuration file.

| Name   | File                                 |
| ------ | ------------------------------------ |
| Babel  | [.babelrc](.babelrc)                 |
| ESLint | [.eslintrc.json](.eslintrc.json)     |
| Jest   | [jest.config.json](jest.config.json) |
