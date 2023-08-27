# Contributing to `node-zendesk`

First and foremost, thank you! We appreciate that you want to contribute to `node-zendesk`. Your time is valuable, and your contributions mean a lot to us.

## Getting Started

- **Fork the repository** and clone it locally. Connect your local repository to the original `node-zendesk` repository by adding it as an upstream remote:
  
  ```
  git clone https://github.com/[your-username]/node-zendesk.git
  git remote add upstream https://github.com/blakmatrix/node-zendesk.git
  ```

- **Install the dependencies**:
  
  ```
  npm install
  ```

## How to Contribute

1. **Find an issue to work on**. Check out the open [issues](https://github.com/blakmatrix/node-zendesk/issues) or create a new one describing a feature, bug, or other project-related task. ( Check out the [API Coverage Document](https://github.com/blakmatrix/node-zendesk/blob/master/doc/api-coverage.md) for ideas)

2. **Work on your feature or bugfix**. Ensure your code is clean and well-documented. Adhere to the project's coding style.

3. **Write tests**. If you're adding a new feature, make sure you add relevant tests. If you're fixing a bug, try to write a test that would have caught the bug.

4. **Create a pull request**. Push to your fork and [submit a pull request](https://github.com/blakmatrix/node-zendesk/pulls) to the main `node-zendesk` repository. Describe your changes comprehensively.

5. **Wait for the review**. The maintainers will review your PR, suggest changes if necessary, and merge it once it's approved.

## Coding Style

- We use the `xo` package as our JavaScript/TypeScript linter. Please ensure your code conforms to the linter's rules. You can check your code with `xo` by running:
  
  ```
  npm run lint
  ```

- For those who prefer integrating the linter into their editors, [`xo` offers editor plugins](https://github.com/xojs/xo/tree/main#editor-plugins) for smoother development.
  
- Use clear and meaningful variable and function names.
- Include comments and keep your code as readable as possible.

## Documentation Reference

- Zendesk's documentation can be found [here](https://developer.zendesk.com/rest_api/docs/core/introduction).

## Communication

- If you have a question or need assistance, feel free to open an issue or email blakmatrix@gmail.com.
  
## Thanks Again!

Thank you for your contribution! By participating in this project, you agree to abide by its terms and the expectations set in the Code of Conduct.

