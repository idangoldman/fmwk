# Feature
Opinionated javascript framework, built with jQuery and Rails in mind.

## Install
This is as basic as running:

```
  npm install
  yarn install
  rake install # See disclaimer.
```

Choose your favorite package manager and follow along. For the rest of the documentation examples, I will use **Yarn** for consistency reasons.

## Test
Tests for this repo done with **Jest** and complimented with **ESLint**. Here is what you can do with them:

```
  yarn test                  # Running all the tests once.
  yarn test:watch            # Running and watching all the tests.
  yarn test:coverage         # Running all tests and generates a coverage folder.
                               At the end of the run shows a coverage report table.
  yarn test:coverage:open    # Open coverage reports in a browser.
  yarn test:update:snapshot  # Update test's snapshot.
```

Running test commands will execute 2 testing suits:
1. **tests**, all the unit and integration tests written by us.
2. **eslint**, extends standard set of rules with a couple of our own.

Tests are awesome, with that written they are also a pain in the ass to set up and maintain. So, if you see badly written tests or lack of them in some areas, fill free to let me know or better yet send a pull request.

## Docs
Want to make sense of this repo, here are the commands that will help you with that:

```
  yarn docs       # Generates a docs/ folder.
  yarn docs:open  # Open's that folder in the browser.
  yarn docs:wiki  # Generates markdown file inside the docs folder.
```

This section is still partially done, any help will be much appreciated. `Docs/` folder is not yet part of this repo because most of the code is not documented and the theme is weirdly confusing. The only documentation available at the moment is the markdown version as a [Wiki page](wiki/Overview).

## Configuration files
I thought it would be helpful to show a list of most used libraries in this project and link to their configuration file.

| Name         | File                                 |
| ------------ | ------------------------------------ |
| Babel        | [.babelrc](.babelrc)                 |
| ESLint       | [.eslintrc.json](.eslintrc.json)     |
| Jest         | [jest.config.json](jest.config.json) |
| JSDoc        | [jsdoc.json](jsdoc.json)             |

## Rake disclaimer
I love Yarn and prefer it over NPM, but don't like to type `yarn` command at all. I do like typing `rake` command instead. That is why the project has a `Rakefile` which is a sort of mirror of the commands inside the `package.json` file. Feel free to keep using NPM, Yarn or join me with this weirdness.
