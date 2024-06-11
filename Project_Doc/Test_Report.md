# CookHub

## Test Report

### 1. Introduction

The software testing process is essential for ensuring the quality, reliability, and functionality of any software product. In our project, we have implemented a comprehensive testing strategy to validate our software, focusing on utilizing GitHub Actions and conducting unit testing with TypeScript and Selenium.

#### Overview of the Software Testing Process:
Software testing encompasses various activities aimed at identifying defects, errors, or bugs in a software application. These activities range from unit testing individual components to end-to-end testing simulating real user interactions. By systematically executing test cases, we aim to uncover issues early in the development cycle, minimizing the risk of critical defects reaching the production environment.

#### Scope of Testing Activities:
Our testing activities encompass a range of methodologies and technologies to ensure thorough validation of our software product. This includes:
- Utilization of GitHub Actions for automating testing pipelines, ensuring that every code commit undergoes rigorous validation against predefined test cases.
- Implementation of Jest as the primary testing framework for frontend components, enabling comprehensive unit testing to maintain high code quality and reliability.
- Integration of xUnit.net for backend testing, facilitating efficient and organized testing of individual modules to ensure seamless interaction between system components.
- Adoption of Selenium for end-to-end testing, simulating real user interactions to identify potential issues from a user’s perspective and ensuring robust functionality of our web applications.

By adhering to these testing methodologies and leveraging advanced testing tools, we aim to uphold the quality and reliability of our software product, thereby delivering a seamless user experience to our customers.

### 2. Test Strategy

#### Used technologies:

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

- **Unit Testing:** The foundation of our testing efforts, focusing on individual units of code to ensure they function correctly in isolation. These tests are automated through our frameworks Jest and xUnit.NET.
- **Integration Testing:** Conducted to verify that different modules or services work together as expected. These tests are crucial when new features that depend on existing functionalities are developed.
- **End-to-end Testing:** To make sure that the flow of data is maintained for all kinds of user tasks and processes. This type of testing approach starts from the end user's perspective and simulates a real-world scenario.

**Scope Limitations**  
Due to the constraints of time and resources in our study project, comprehensive testing like full system testing or exhaustive end-to-end testing will not be prioritized. Our focus will remain on critical functionalities and integration points, aiming to maximize our testing impact within the available means.

**Expected Outcomes**  
The primary objective of our testing strategy is to maintain a high standard of quality for all delivered features, despite the restricted scope. By leveraging automated tools and focusing on key areas of the software, we aim to ensure stability and functionality, minimizing the risk of major defects in the production environment.

This testing strategy is designed to be adaptive and scalable, able to accommodate more comprehensive testing phases as resources become available, ensuring ongoing improvement in the quality and reliability of the software product.

<br><br>

### 3. Test Plan

After the lecture about testing, we decided that:
- For every newly implemented backend endpoint, there should be at least one success case and one fail case
- For every newly implemented frontend functionality, there should be at least one end-to-end test (*if possible*) that verifies the desired behaviour
- There should be integration tests for the database operations, that verfiy all CRUD operations of at least one database entity

### 4. Test Cases

All test cases of our frontend (end-to-end) tests:
![image](https://github.com/SE-TINF22B6/CookHub/assets/77683850/1303ebe2-d6a6-4c84-9db5-ffac940dc36f)

All test cases of our backend (API tests, unit tests, integration tests):
![image](https://github.com/SE-TINF22B6/CookHub/assets/77683850/59320be1-71e3-4f4e-aa85-7684451567ed)


### 5. Test Results 

Our tests became very handy when we needed to make some changes that could have a large impact for the whole app. For example, everytime we changed something in the database mapping, we could test wheter or not and where the changes break something. The test results helped us to indentify these sections very quickly, whereas manual searching would have taken a long time, with the risk of missing some errors. In these cases, watching the test results significantly benefitted the quality assurance of our product.

But sometimes, our tests also became a hassle. For example, changes in the frontend layout often broke our end-to-end tests, which sometimes required completely rewriting certain test cases. We also had the problem that the end-to-end tests did not give deterministic results due to race conditions, and sometimes failed without anything being wrong with the application. In these cases, fixing the tests took sometimes took a lot longer than the implementation of the actual task. 

### 6. Metrics

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

### 7. Recommendations

We had a mixed experience with some of our testing tools:
- Jest
  - Jest provides an easy way to write tests in a readable way, but sometimes lacks feedback when a test failed. We often had the problem that a test got stuck at some point, and Jests error message did not include the line of code. This made it hard to find out the reason of failure. We would recommend jest for writing simple, readable tests; but not for easy debugging. 
- Selenium
  - Selenium is great once it works, but it took a long time to set it up. This is because there are many different requirements (having to run with admin privileges, no support for the newest node.js versions) and setting it up in the CI/CD pipeline also requires a lot of steps. You also have to be very careful to write tests in a way that they run reliably, and that there are no race conditions. This is a challenge because selenium only offers a limited number of ways to manually wait for certain things to load. We would only recommend Selenium for more experienced test-developers, because it can be very frustrating when used incorrectly.

#### General testing recommendations:
- Writing short tests makes it easier to identify the spefic issue when something fails
- Using setup and cleanup/teardown functions of testing frameworks makes it a lot easier to write short and clean tests
- Frameworks that support parameterized tests make it very easy to test a lot of different (user-)inputs without writing much additional code

### 8. Conclusion

As CookHub we want to present the outcomes of our comprehensive testing efforts. Our strategy, centered around automated testing with GitHub Actions, Jest, xUnit.net, and Selenium, has effectively supported the validation of our software through continuous integration. Each code commit undergoes rigorous testing to ensure that changes are seamlessly integrated and validated against predefined test cases.

While we encountered challenges—such as the complexity of Selenium setup and intermittent non-deterministic results in end-to-end tests our testing framework has successfully identified and mitigated issues early in the development process. The data collected from our testing activities, including a commendable 87.71% success rate for GitHub Actions workflow runs, underscores the robustness of our testing infrastructure.

Our focus on unit, integration, and end-to-end testing has been crucial in maintaining the reliability and quality of CookHub. Unit tests, powered by Jest and xUnit.net, have allowed us to ensure that individual code modules function correctly in isolation. Integration tests have verified the harmonious interaction between different system components, while end-to-end tests conducted via Selenium have simulated real user interactions to identify potential issues from a user’s perspective.

Despite some hurdles, such as frontend layout changes affecting end-to-end tests and race conditions causing occasional test failures, our structured approach has minimized the risk of significant defects reaching the production environment. These tests have been instrumental in swiftly identifying problem areas, significantly enhancing our quality assurance processes.
