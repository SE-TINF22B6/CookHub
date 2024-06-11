# CookHub
<br>

-> Which tools
-> Statistic required about: How many tests passed, how many failed

## Test Report
<br>

### 1. Introduction
> This section of the documentation provides an overview of the software testing process adopted in our project, focusing specifically on the utilization of GitHub Actions and unit testing with TypeScript and Selenium.

**Overview of Testing Strategy**  
> We implement integrated testing, automated workflows via GitHub Actions and unit testing in TypeScript. 

**GitHub Actions**  
> GitHub Actions play a pivotal role in automating our testing pipelines. Every code commit triggers a series of actions that execute automated tests, ensuring that all changes are validated against predefined test cases before integration.

**Selenium**
> The Selenium WebDriver drives a browser natively, as a user would, either locally or on a remote machine using the Selenium server, marks a leap forward in terms of browser automation.
> Selenium WebDriver refers to both the language bindings and the implementations of the individual browser controlling code.
> Also see [Selenium](https://github.com/SE-TINF22B6/CookHub/wiki/Testing) in our Wiki.

**Unit Testing with TypeScript**  
> Unit tests form the backbone of our testing framework, primarily focusing on the functionality of the smallest parts of the program. Written in TypeScript, these tests verifying the logic and behavior of individual modules. 

**Scope of Testing Activities**  
> The scope of our testing extends from simple code functionality checks to complex interaction and integration tests, ensuring that (nearly) every component works as expected.

**Expected Outcomes**  
> By the end of this section, readers should have a thorough understanding of the testing processes, equipped with the knowledge to execute and improve upon the existing tests.

<br><br>

### 2. Test Strategy
> This section outlines our overall approach to testing within the project. It covers the methodologies, types of tests, and specific techniques we employ, alongside the rationale behind our selective testing strategy due to limited time and resources.

**Testing Methodology**  
> Our methodology is centered around agile testing practices, which are integrated into the development cycle. This approach allows for continuous testing and immediate feedback, crucial for addressing issues promptly and efficiently. Testing activities are automated as much as possible to streamline the process and minimize manual effort.

**Types of Testing**  
> Given our resource constraints, we focus primarily on the following types of tests:
> 
> - **Unit Testing:** The foundation of our testing efforts, focusing on individual units of code to ensure they function correctly in isolation. These tests are automated through frameworks tailored for TypeScript.
> - **Integration Testing:** Conducted to verify that different modules or services work together as expected. These tests are crucial when new features that depend on existing functionalities are developed.
> - **Regression Testing:** Automated to ensure that recent changes have not adversely affected existing functionalities. These tests are triggered automatically via GitHub Actions whenever changes are pushed to the repository.

**Testing Tools and Frameworks**  
> The following tools and frameworks are integral to our testing strategy:

> - **Jest:** Our primary framework for unit testing. It is well-suited for the TypeScript environment, offering robust testing capabilities, mock functions, and asynchronous testing support.
> - **GitHub Actions:** Used for automating our CI/CD pipeline, including running our test suites on every push and pull request. This helps in identifying and resolving issues early in the development cycle.
> - **ESLint:** While primarily a linting tool, ESLint helps ensure that our TypeScript code adheres to best practices and standards, indirectly supporting our testing efforts by reducing the likelihood of bugs.

**Scope Limitations**  
> Due to the constraints of time and resources in our study project, comprehensive testing like full system testing or exhaustive end-to-end testing will not be prioritized. Our focus will remain on critical functionalities and integration points, aiming to maximize our testing impact within the available means.

**Expected Outcomes**  
> The primary objective of our testing strategy is to maintain a high standard of quality for all delivered features, despite the restricted scope. By leveraging automated tools and focusing on key areas of the software, we aim to ensure stability and functionality, minimizing the risk of major defects in the production environment.
>
> This testing strategy is designed to be adaptive and scalable, able to accommodate more comprehensive testing phases as resources become available, ensuring ongoing improvement in the quality and reliability of the software product.

<br><br>

### 3. Test Plan
> This section outlines the specific testing tasks, timelines, and resources required to achieve the testing objectives.

<br><br>

### 4. Test Cases
> This section details the specific test cases that were executed, including their pass/fail status and any defects found during testing. (You may link to the repository of your use cases.)

<br><br>

### 5. Test Results 
> This section summarizes the results of the testing, including major defects found, their severity, and the steps taken to resolve them. (You may link to the test reports generated by your testing tool.)

<br><br>

### 6. Metrics
> This section provides quantitative data on the testing process, such as the number of defects found, the defect resolution time, and the test coverage achieved.

#### GitHub Actions Statistics
1,069 workflow runs
- 948 Success
- 117 Failure
- 4 Canceled

<br><br>

### 7. Recommendations
> This section offers suggestions for improving the testing process and the quality of the software.


<br><br>

### 8. Conclusion
> This section summarizes the key findings of the testing and the overall status of the software quality.

