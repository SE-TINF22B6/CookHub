# Project Name
## Software Architecture Documentation

### 1. Introduction
#### 1.1 Overview
We decided to use a layered architecture.

The layered architecture is a software design pattern that organizes applications into separate layers, each responsible for distinct aspects of the application's functionality. This architecture is renowned for its simplicity, low cost, and reliability, making it ideal for our project.

**Key Selling Points:**

- **Separation of Concerns:** Simplifies complexity by dividing responsibilities across layers.
- **Modularity:** Facilitates independent development and maintenance of each layer.
- **Simplicity:** It is easy to set up and ensures rapid development.
- **Enhanced Security:** Security measures can be enforced at different levels within the architecture.
- **Development Flexibility:** Parallel development becomes feasible with minimal dependencies across teams.
- **Simplified Deployment:** Updates to one layer can often be made without affecting others.
  
#### 1.2 Constraints
The lack of scalability is a consequence of the highly coupled layers. Any change in one layer can have a significant impact on other layers, potentially leading to breaking changes. This also results in a low fault tolerance.
#### 1.3 Definitions, Acronyms and Abbreviations
> Definitions of all terms, acronyms, and abbreviations required to properly interpret this document.
#### 1.4 References
##### Tactics: 
https://github.com/SE-TINF22B6/CookHub/blob/main/Project_Doc/srs.md#3-nonfunctional-requirements
##### Testing & CI/CD:
CI/CD: [https://github.com/SE-TINF22B6/CookHub/discussions/45](https://github.com/SE-TINF22B6/CookHub/blob/main/Project_Doc/CICD.md)

Testing: https://github.com/SE-TINF22B6/CookHub/blob/main/Project_Doc/Test_Report.md
##### OpenAI sequence diagram:
https://github.com/SE-TINF22B6/CookHub/blob/main/Project_Doc/srs.md#23-recipes-management

### 2. Architecture tactics
#### Usability and UX:
In order to enhance usability, styles for each page were organised in a separate package. Additionally, the website was constructed using React in a modular structure, with parts of the website divided into reusable components. These components were also organised in a separate package, ensuring scalability and consistency between the pages.

#### Breaking changes & Tests:
Our architecture is not optimal for testability, so we must put more effort in this area.
To improve testability, we have implemented design principles in the backend. For example dependency injection, which ensure that classes can be tested independently by replacing dependencies with mocked objects.
  All tests are automatically executed with our CI/CD pipelines in response to any changes made to the code. To make sure breacking changes are identified as soon as possible

### 3. Architecture design

#### Sequence diagram of the OpenAI API access:
![image](https://github.com/SE-TINF22B6/CookHub/raw/main/Project_Doc/Diagrams/openai-sequence-diagram.drawio.svg)

#### Package diagram
![image](https://raw.githubusercontent.com/SE-TINF22B6/CookHub/6359bde867a9dcb0d8e79b7a5503971673a0f6c6/Project_Doc/Diagrams/package-diagram.drawio.svg)

#### Component diagram
![image](https://raw.githubusercontent.com/SE-TINF22B6/CookHub/efa0b47abc95072286463ddcf41b16e0a9d15486/Project_Doc/Diagrams/component_diagram.drawio.svg)



#### 3.1 Overview 
> A summary of the architecture design -- highlights.  

#### 3.2 Runtime view (Tips: https://docs.arc42.org/section-6/)

#### 3.3 Deployment view (Tips: https://docs.arc42.org/section-7/)

#### 3.4 ... ...

