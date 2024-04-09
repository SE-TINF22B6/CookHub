# <img width="120" alt="image" src="https://raw.githubusercontent.com/SE-TINF22B6/CookHub/8b8579618a8ca42574a1d62143f580aa174b024f/Frontend/src/assets/Logo_no_background.svg"> 

# Software Requirements Specification
> This template is a simplified version based on the documentation templates from IBM Rational Unified Process (RUP).
## 1. Introduction
### 1.1 Overview
> CookHub is envisioned to be an online recipe book designed to store its own recipes in a database, offer recipe suggestions via the OpenAI API, save custom-created recipes, and generate a shopping list from an existing recipe. Additionally, the OpenAI API enables a recipe to be transformed into an adventure by wrapping the cooking instructions into an automatically generated adventure story, making cooking a real experience.
### 1.2 Scope
> This Software Requirements Specification (SRS) document covers the complete system of CookHub. It encompasses both functional and non-functional requirements necessary for the successful development, deployment, and operation of the platform. The document aims to provide a comprehensive understanding of the system's architecture, features, and limitations.

*Specifically, the SRS includes:*

> An overview of the system and its intended use.
Detailed specifications of functional requirements, such as recipe storage, recommendation algorithms, and shopping list generation.
Non-functional requirements, such as performance metrics, security considerations, and user experience factors.
A list of the technologies chosen for the system's development and the reasons behind their selection.

*The document does not cover:*

> Implementation details or code-level specifications.
Project management aspects, such as timelines or resource allocation, which will be handled in separate project planning documents.
This SRS aims to be a standalone document for stakeholders to understand what CookHub aims to achieve and how it intends to meet those goals.

### 1.3 Definitions, Acronyms and Abbreviations
> To ensure a common understanding among all stakeholders, this section provides definitions for key terms, acronyms, and abbreviations used throughout this SRS document.

- CookHub: The name of the online recipe book platform that this SRS outlines.
- SRS: Software Requirements Specification, the document you are currently reading, which outlines the requirements for CookHub.
- API: Application Programming Interface, a set of rules and protocols for building and interacting with software applications.
- OpenAI API: The API provided by OpenAI used for generating recipe suggestions and adventure stories within CookHub.
- React: A JavaScript library for building user interfaces.
- .Net: A free, cross-platform, open-source developer platform for building many different types of applications.
- C#: A modern object-oriented programming language that is designed for building Windows desktop applications and games.
- JS/TS: JavaScript/TypeScript, scripting languages used to enable interactive web pages.
- TMETRIC: A time tracking tool used for project management within the development process.
- GitHub: A web-based platform used for version control and source code management.
- Functional Requirements: The features that CookHub must implement to fulfill its intended purpose.
- Non-Functional Requirements: The performance, security, and usability specifications that CookHub must adhere to.

> *This glossary is intended to serve as a reference point for understanding the specialized language used in this document.*

### 1.4 References

> The following is a list of documents, sources, and tools referenced in the creation of this Software Requirements Specification:

- **React Official Documentation**: [React - A JavaScript library for building user interfaces](https://reactjs.org/), Accessed October 2023, Facebook Inc.
- **.NET Documentation**: [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/), Accessed October 2023, Microsoft Corporation
- **C# Programming Guide**: [C# Guide](https://docs.microsoft.com/en-us/dotnet/csharp/), Accessed October 2023, Microsoft Corporation
- **JavaScript and TypeScript Documentation**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript), Accessed October 2023, Mozilla
- **TMETRIC Official Website**: [TMETRIC - Time Tracking Tool](https://tmetric.com/), Accessed October 2023, Devart
- **GitHub Documentation**: [GitHub Docs](https://docs.github.com/en), Accessed October 2023, GitHub Inc.
- **OpenAI API Documentation**: [OpenAI API Docs](https://beta.openai.com/docs/), Accessed October 2023, OpenAI

> These references are intended to provide additional context and understanding for the technologies and terminologies used in this document.

## 2. Functional requirements
[!INFO] *This section contains all the software requirements to a level of detail sufficient to enable designers to design a system to satisfy those requirements and testers to test that the system satisfies those requirements. This section is typically organized by feature, but alternative organization methods may also be appropriate, for example, organization by user or organization by subsystem.*

> ✅ UML diagram:
>
> ![Use case diagram](../Project_Doc/Diagrams/use-case-diagram.drawio.svg)

> To check the userstorys please check the issues tagged with userstorys -> https://github.com/SE-TINF22B6/CookHub/issues

### 2.1 Overview 
> A brief description of the functionality of your application.  
> Include one or more **UML use case** diagram(s) and necessary description to specify the major use cases of your application.

### 2.2 User Interface & Account Management

> - **user stories**: https://github.com/SE-TINF22B6/CookHub/issues/10, https://github.com/SE-TINF22B6/CookHub/issues/11, https://github.com/SE-TINF22B6/CookHub/issues/13 
> - UML diagram: https://github.com/SE-TINF22B6/CookHub/blob/main/Project_Doc/UML-Diagram/uml-class-diagram.drawio.svg
> - **Preconditions**: Backend servers has to be active.
> - **Postconditions**: All outgoing routes of functions has to work correctly.
> - **Estimated efforts**: middle

 ✅ (1) Landing page mockup,  (2) After implementation  with HTML & CSS
 <table>
  <tr>
    <td><img width="300" alt="image" src="https://user-images.githubusercontent.com/113697513/275525934-9e7bbf26-015a-4791-bb94-356ba798c309.png"/></td>
    <td><img width="300" alt="image" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/a27b547c-a738-48cf-bd7d-9455cd8cc907"/></td>
  </tr>
 </table>

 ✅ (1) Login page mockup, (2) After implementation with HTML & CSS
 <table>
  <tr>
    <td><img width="300" alt="image" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/13b1630f-871c-4630-96b0-4e31cd8bc50d"></td>
    <td><img width="300" alt="image" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/002ac023-5d97-4068-861a-8f949ca99303"/></td>
  </tr>
 </table>

✅ (1) Profile page mockup
 <table>
  <tr>
    <td><img width="300" alt="image" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/b060bac8-b410-4a78-9c0a-72c7b17a7b9b"><td>
  </tr>
 </table>

✅ (1) Settings page mockup
 <table>
  <tr>
    <td><img width="300" alt="image" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/8461f6eb-6f9a-49c3-9892-d92973e83742"></td>
  </tr>
 </table>

 #### Snapshot (currentVersion_frontend_implemented) dec23

 ✅ (1) Welcome page, (2) Login page
 <table>
  <tr>
    <img width="1904" alt="welcome_page" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/6d9f2c06-513e-425d-9bad-73f8e5889e1b">
    <img width="1900" alt="login_page" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/66d90d96-a39a-4885-bcb0-26ff22498f6d">
  </tr>
 </table>

 ✅ (3) FoodForge page, (4) MyRecipes page
 <table>
  <tr>
    <img width="1905" alt="foodForge_page" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/7ca4c5b4-3b77-4b81-8953-afe7a0a82552">
    <img width="1904" alt="myRecipes_page" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/3c54b047-57ea-4548-95dc-747bb5ea88d6">
  </tr>
 </table>


✅ (5) Profile page, (6) AboutUs page
 <table>
  <tr>
    <img width="1901" alt="profile_page" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/c4b448cd-f941-4a21-b232-0274c6012db4">
    <img width="1901" alt="aboutUs_page" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/8b81e352-e3d2-41e6-a62c-025dfa7dd7aa">
  </tr>
 </table>


✅ (7) FAQs page, (8) Impressum page
 <table>
  <tr>
    <img width="1904" alt="faqs_page" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/c516b2be-eaf2-4d4e-80c0-c38ef83aff41">
    <img width="1904" alt="impressum_page" src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/1a6b5e98-4c1d-4c84-81ed-eed7cb980386">
  </tr>
 </table>



> ✅ Login activity diagram:
>
> ![Login activity diagram](../Project_Doc/Diagrams/login-activity-diagram.drawio.svg)

> ✅ Logout activity diagram:
>
> ![Logout activity diagram](../Project_Doc/Diagrams/logout-activity-diagram.drawio.svg)

> ✅ Login sequence diagram:
>
> ![Login sequence diagram](../Project_Doc/Diagrams/login-sequence-diagram.drawio.svg)


### 2.3 Recipes Management

> - **user stories**: https://github.com/SE-TINF22B6/CookHub/issues/16, https://github.com/SE-TINF22B6/CookHub/issues/35, https://github.com/SE-TINF22B6/CookHub/issues/38, https://github.com/SE-TINF22B6/CookHub/issues/34
> - UML diagram: https://github.com/SE-TINF22B6/CookHub/blob/main/Project_Doc/UML-Diagram/uml-class-diagram.drawio.svg
> - **Preconditions**: Backend servers has to be active, LogIn/LangingPages must be active.
> - **Postconditions**: All outgoing routes of functions has to work correctly.
> - **Estimated efforts**: middle

> ✅ Activity diagram for creating and saving a recipe:
>
> ![Create recipe activity diagram](../Project_Doc/Diagrams/create-recipe-diagram.drawio.svg)

> ✅ Sequence diagram for generating a recipe text with OpenAI:
>
> ![OpenAI sequence diagram](../Project_Doc/Diagrams/openai-sequence-diagram.drawio.svg)


### 2.4 Special Features
>
>This section contains all the functions apart from the familiar standard features that ordinary cooking apps offer. 
>
> #### Adventurize it Ⓒ
>
>Adventurize it Ⓒ is our copyrighted shooting star and set to be our unique selling point for the app.
>It takes recipes, lists of ingrediences or even just descriptions of dishes and converts it into short adventure stories lifting cooking into a new sphere of enjoyable experience.
>Turn your next dinner into a hero saga or let your toddlers enjoy their first cooking experience by defeating the grumpy Bolognese-Dragon!
>
>#### Placement
>
>The feature is planed to be available unmonitorized in a basic-story mode but will require an free account on CookHub.
>Our future plan contains providing more options to stir the story into a prefered direction as well as preset characters and other elements.
>As soon as our community and our recipe database has reached a certain size to kick off a monitarization model we will start to offer
>more additional features to make CookHub the place to go if you want to prepare another meal.
>
>#### How the user can use Adventurize it Ⓒ
>
>The user can simply call up a recipe of their choice where a button is then available that sends this recipe to OpenAI via API. The data sent contains a ready-made prompt for the AI. User-specific parameters are also conceivable as a future feature. Initially, this feature will be available to any user who has an account and is logged in. However, as soon as the number of users is large enough, the feature will only be available in a paid model.
>
>#### Technology
>
>In the background, we will integrate the OpenAI API into our project, which will be pre-trained and pre-tested by our team to meet the special requirements.
>The API can accept a standard prompt that has been preset and perfected by our team or the user can submit their own requests in a form, which are then injected into a modified wrapping prompt.
>After generation, the API then returns the response to our backend, which makes it available to the user and creates a copy in our database, which is then available as a recipe variant of the original dish.
>Unspecific user requests can be covered at no additional cost by using the API to provide already generated recipes.
>
>#### Training & Testing
>
>There have been many testings with differnet prompts, command sizes and directions. To have a look on one of our first prototypes you can check our [wiki page](https://github.com/SE-TINF22B6/CookHub/wiki/adventurize-it-%E2%92%B8).
>But after OpenAIs release of specialized, own preseted GPT-models we worked on an upgraded version of our recipe-converted.
>
>Here is a short [Overview](https://github.com/SE-TINF22B6/CookHub/wiki/adventurize-it-%E2%92%B8-%5B-v0.7-%5D) of the new Setup and below the generated recipe:
>
>![image](https://github.com/SE-TINF22B6/CookHub/assets/113697513/b4d7d2aa-ec3e-4c92-9949-fcd588edd688)
>
>Legal notice: We'll probably have to talk to our legal department again about copyright. cough*

### 2.5 Data Administration

> - **user stories**: https://github.com/SE-TINF22B6/CookHub/issues/37, https://github.com/SE-TINF22B6/CookHub/issues/40
> - UML diagram: https://github.com/SE-TINF22B6/CookHub/blob/main/Project_Doc/UML-Diagram/uml-class-diagram.drawio.svg
> - **Preconditions**: Backend servers has to be active, DB must be connected.
> - **Postconditions**: All outgoing routes of functions has to work correctly.
> - **Estimated efforts**: high

## 3. Nonfunctional requirements

![image](https://github.com/SE-TINF22B6/CookHub/assets/115070676/265f85d0-f123-4d38-95e7-e1260036a7bd)

### The user should have a positive experience when using the web site

>To ensure a positive visual experience, the website should be designed with a clean and intuitive layout, maintaining consistent branding elements and responsive design principles. Utilizing high-quality visuals, interactive elements and a consistent color scheme will also enhance the aesthetic appeal and user engagement.

### Breaking changes should be easily identified by test

>To ensure the success of our cooking website project, we will prioritize a comprehensive testing strategy aimed at identifying and mitigating breaking changes swiftly. This will involve implementing robust automated tests that cover various aspects of our system, including recipe functionalities, user interactions, and backend operations. Additionally, we will establish a clear process for continuous integration and deployment, ensuring that any changes are thoroughly tested before being deployed to production. By maintaining a strong focus on testability, we aim to deliver a reliable and stable platform that consistently meets the needs of our users.

### The user should have no problems in using the website

>Given the constraints of a study project with limited access to large testing groups, our team will lean on alternative strategies to ensure a seamless user experience (UX) for our cooking website. We will prioritize the creation of a clear, intuitive user interface, utilizing best practices in UX design to mitigate potential issues. To compensate for the lack of extensive testing resources, we will engage in heuristic evaluations within the team, simulate user scenarios, and perhaps utilize small peer groups for feedback. This approach will help us identify and address usability issues effectively within our resource constraints.
>
>`UX Principles:`
>
> <img src="https://github.com/SE-TINF22B6/CookHub/assets/113697513/859271cd-2a1b-4d1e-8cb1-d795d699d1af" alt="principles" width="400" />
>


> Categories: Usability, Reliability, Performance, Efficiency, Integrity, Maintainability, Flexibility, Testability, Reusability, Security.




## 4. Technical constraints

> This section identifies the constraints that affect the technical aspects of the CookHub platform. These constraints limit the design and implementation options available and thus must be considered when making technical decisions.

### 4.1 Technology Stack
> React: Given that React is part of the chosen technology stack, the frontend must be built using this library.
> .Net & C#: The backend will be implemented using the .Net framework and C# programming language, restricting the use of technologies that are not compatible with these.
> JS/TS: Only JavaScript and TypeScript are to be used for scripting.
> TMETRIC: All time tracking must be logged through TMETRIC, limiting the use of other time-tracking software.
> GitHub: Source code management and version control must be done exclusively through GitHub.

### 4.2 Third-Party APIs
> OpenAI API: Given that the OpenAI API is used for generating recipe suggestions and adventure stories, CookHub is subject to the limitations, costs, and terms of service of the OpenAI API.
>
> /// Start of testing ChatGPT (WebApp) to convert recipes ///
>
> 


### 4.3 Performance
> Response Time: The system should respond to user queries within 2 seconds to maintain a smooth user experience.
> Scalability: The system must be able to support up to 100 concurrent users in the beginning.

### 4.4 Security
> Data Encryption: All sensitive user data must be encrypted.
> Authentication: Secure authentication mechanisms (username + pw) must be implemented to protect user accounts.

### 4.5 Compliance
> GDPR: The platform must comply with GDPR regulations, affecting how user data can be stored and processed.

*This section aims to outline the technical constraints that will affect the development and operation of CookHub. Acknowledging these constraints is crucial for the successful implementation of the system.*
