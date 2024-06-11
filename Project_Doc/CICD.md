# Our CI / CD Setup

## Development Environment

### Git
To prevent merge conflicts and maintain isolated environments. To minimize further conflicts, we have agreed to create temporary feature branches for new functions,
which will be deleted after they are merged into the next higher stage.

### Jest
To ensure comprehensive testing and maintain high code quality, we have decided to integrate Jest as our primary testing framework fort the Frontend.
By utilizing Jest's robust features, such as snapshot testing and mock functions, we aim to streamline our testing process. We also agreed on setting up individual test suites for each module,
allowing us to isolate issues quickly and maintain a clear structure.
Regular test execution will be enforced to catch bugs early and ensure our code remains reliable and maintainable.

### xUnit.net
To ensure thorough testing and maintain high code quality, we have decided to implement XUnit.net as our primary testing framework for the Backend.
By leveraging XUnit.net's powerful features, such as parallel test execution and extensibility, we aim to enhance our testing efficiency.
We also agreed on organizing individual test cases for each module, which will help us quickly identify and resolve issues while keeping our codebase structured.
Regular test runs will be enforced to catch bugs early, ensuring our code remains reliable and maintainable.

### Selenium
To ensure robust end-to-end testing and maintain high quality in our web applications, we have decided to adopt Selenium as our primary automation tool.
By utilizing Selenium's capabilities for browser automation, we aim to simulate real user interactions and identify potential issues early in the development process.
We also agreed on developing individual test scripts for each feature, allowing us to isolate and address issues promptly while maintaining a well-organized test suite.
Regular execution of automated tests will be enforced to ensure our applications remain reliable, user-friendly, and free of critical bugs.

## Repository Environment
 - [Dotnet](https://github.com/SE-TINF22B6/CookHub/blob/main/.github/workflows/dotnet.yml)

   - the dependencies of our project get restored/updated (`dotnet restore`)
   - a build of our app is automatically executed on a github server (`dotnet build`)
   - all tests are run to check whether the commit might break the app (`dotnet test`)

   
 - [Node.js](https://github.com/SE-TINF22B6/CookHub/blob/main/.github/workflows/node.js.yml)

   - Start Backend: Starts the backend server in the background (so we can run end-to-end tests `dotnet run --launch-profile https --urls=https://localhost:44328/ &`)
   - Install Dependencies: Runs npm ci to install dependencies (`npm ci`)
   - Build Frontend: Builds the frontend if a build script is present (`npm run build --if-present`)
   - Start Frontend: Starts the frontend server with HTTPS enabled (`npm HTTPS=true npm start &`)
   - Run Tests: Executes the end-to-end tests for the frontend (`npm test`)
