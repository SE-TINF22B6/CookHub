# CookHub

## Test Report

### 1. Introduction
> This section of the documentation provides an overview of the software testing process adopted in our project, focusing specifically on the utilization of GitHub Actions and unit testing with TypeScript and Selenium.

// TODO

### 2. Test Strategy
> This section outlines our overall approach to testing within the project. It covers the methodologies, types of tests, and specific techniques we employ, alongside the rationale behind our selective testing strategy.

#### Used technoligies:

*GitHub Actions*
- GitHub Actions play a pivotal role in automating our testing pipelines. Every code commit triggers a series of actions that execute automated tests, ensuring that all changes are validated against predefined test cases before integration.

*Jest*
- To ensure comprehensive testing and maintain high code quality, we have decided to integrate Jest as our primary testing framework fort the Frontend. By utilizing Jest's robust features, such as snapshot testing and mock functions, we aim to streamline our testing process. We also agreed on setting up individual test suites for each module, allowing us to isolate issues quickly and maintain a clear structure. Regular test execution will be enforced to catch bugs early and ensure our code remains reliable and maintainable.

*xUnit.net*
- To ensure thorough testing and maintain high code quality, we have decided to implement XUnit.net as our primary testing framework for the Backend. By leveraging XUnit.net's powerful features, such as parallel test execution and extensibility, we aim to enhance our testing efficiency. We also agreed on organizing individual test cases for each module, which will help us quickly identify and resolve issues while keeping our codebase structured. Regular test runs will be enforced to catch bugs early, ensuring our code remains reliable and maintainable.

*Selenium*
- To ensure robust end-to-end testing and maintain high quality in our web applications, we have decided to adopt Selenium as our primary automation tool. By utilizing Selenium's capabilities for browser automation, we aim to simulate real user interactions and identify potential issues early in the development process. We also agreed on developing individual test scripts for each feature, allowing us to isolate and address issues promptly while maintaining a well-organized test suite. Regular execution of automated tests will be enforced to ensure our applications remain reliable, user-friendly, and free of critical bugs.

#### Testing Methodology  
Our methodology is centered around agile testing practices, which are integrated into the development cycle. This approach allows for continuous testing and immediate feedback, crucial for addressing issues promptly and efficiently. Testing activities are automated as much as possible to streamline the process and minimize manual effort.

#### Types of Testing  
Given our resource constraints, we focus primarily on the following types of tests:

- **Unit Testing:** The foundation of our testing efforts, focusing on individual units of code to ensure they function correctly in isolation. These tests are automated through frameworks tailored for TypeScript.
- **Integration Testing:** Conducted to verify that different modules or services work together as expected. These tests are crucial when new features that depend on existing functionalities are developed.
- **End-to-end Testing:** To make sure that the flow of data is maintained for all kinds of user tasks and processes. This type of testing approach starts from the end user's perspective and simulates a real-world scenario.

**Scope Limitations**  
Due to the constraints of time and resources in our study project, comprehensive testing like full system testing or exhaustive end-to-end testing will not be prioritized. Our focus will remain on critical functionalities and integration points, aiming to maximize our testing impact within the available means.

**Expected Outcomes**  
The primary objective of our testing strategy is to maintain a high standard of quality for all delivered features, despite the restricted scope. By leveraging automated tools and focusing on key areas of the software, we aim to ensure stability and functionality, minimizing the risk of major defects in the production environment.

This testing strategy is designed to be adaptive and scalable, able to accommodate more comprehensive testing phases as resources become available, ensuring ongoing improvement in the quality and reliability of the software product.

<br><br>

### 3. Test Plan
> This section outlines the specific testing tasks, timelines, and resources required to achieve the testing objectives.

After the lecture about testing, we decided that:
- For every newly implemented backend endpoint, there should be at least one success case and one fail case
- For every newly implemented frontend functionality, there should be at least one end-to-end test (*if possible*) that verifies the desired behaviour
- There should be integration tests for the database operations, that verfiy all CRUD operations of at least one database entity

### 4. Test Cases
> This section details the specific test cases that were executed, including their pass/fail status and any defects found during testing. (You may link to the repository of your use cases.)

All test cases of our frontend (end-to-end) tests:
![image](https://github.com/SE-TINF22B6/CookHub/assets/77683850/1303ebe2-d6a6-4c84-9db5-ffac940dc36f)

All test cases of our backend (API tests, unit tests, integration tests):
![image](https://github.com/SE-TINF22B6/CookHub/assets/77683850/59320be1-71e3-4f4e-aa85-7684451567ed)


### 5. Test Results 
> This section summarizes the results of the testing, including major defects found, their severity, and the steps taken to resolve them. (You may link to the test reports generated by your testing tool.)

<br><br>

### 6. Metrics
> This section provides quantitative data on the testing process, such as the number of defects found, the defect resolution time, and the test coverage achieved.

#### Test coverage
Backend test coverage mesured with DotCover:

![image](https://github.com/SE-TINF22B6/CookHub/assets/77683850/9a2ed0d5-ceb8-4df6-aead-ebfcb11ab06f)

#### GitHub Actions Statistics
out of 1,073 recorded workflow runs, there where:
- 952 successes
  - 489 pull requests
  - 463 pushes
- 117 failures
  - 93 pull requests
  - 24 pushes
- 4 canceled
  - 4 pull requests

=> 87,71% success rate

<br><br>

### 7. Recommendations
> This section offers suggestions for improving the testing process and the quality of the software.

We noticed some things that could be improved in the tools that we used:
- Jest
  - Jest provides an easy way to write tests in a readable way, but sometimes lacks feedback when a test failed. We often had the problem that a test got stuck at some point, and Jests error message did not include the line of code. This made it hard to find out the reason of failure.
- Selenium
  - Selenium is great once it works, but it took a long time to set it up. This is because there are many different requirements (having to run with admin privileges, no support for the newest node.js versions) and setting it up in the CI/CD pipeline also requires a lot of steps. You also have to be very careful to write tests in a way that they run reliably, and that there are no race conditions. This is a challenge because selenium only offers a limited number of ways to manually wait for certain things to load

<br><br>

### 8. Conclusion
> This section summarizes the key findings of the testing and the overall status of the software quality.

