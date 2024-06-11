# Clean Code

## Summary 

> We use the following principles to keep our code clean:

1. Use Dependency-Inversion/Injection <br/>

    The dependency inversion principle states that high-level modules should not depend on low level modules. Instead, both should depend on abstractions.

    To achieve this, we decouple our classes using dependency injection: <br/>
    Instead of our classes creating their dependencies themselves, they only define what type their dependencies should have. The concrete instances will get passed through the constructor. This can be done by using the built-in IoC container of ASP.NET,       which automatically resolves the dependencies (after a little bit of configuration).

    The decoupling of classed achieved by this principle makes the replacement of whole modules very simple. And when testing code, we can just pass a different object through the constructor, which makes the mocking of dependencies a lot easier.<br/>
  
    Registering the dependencies using the built-in IoC container of ASP.NET:
  
    ![image](https://github.com/SE-TINF22B6/CookHub/assets/115070676/0a8738a8-b49b-4477-a9e4-61c2af6f1d73)
  
    Example: The IRecipeRepository dependency getting injected using the constructor of RecipeService:
  
    ![image2](https://github.com/SE-TINF22B6/CookHub/assets/115070676/d186e3ca-f308-45ba-a58d-1c6b8d15cd33)

2. Use Meaningful and Descriptive Names. (also cleaning up html & css with additional naming conventions)
3. Use Comments Sparingly, and When You Do, Make Them Meaningful. (always)
4. Write Short Functions That Only Do One Thing.

    ![image3](https://github.com/SE-TINF22B6/CookHub/assets/115070676/e1dbc8b8-9d24-4c99-8039-c8895dec67ce)

6. Follow the DRY (Don't Repeat Yourself) Principle and Avoid Duplicating Code or Logic.
  
   - We created functions to generate HTML code so we don't have to write duplicate code:
       
   <img width="347" alt="Screenshot 2024-06-11 163445" src="https://github.com/SE-TINF22B6/CookHub/assets/115070676/c602a229-3233-4a9a-b7c4-102f0eb2f24d">
