using DataAccess.Entities;
using DataAccess.Repository;

namespace Services;

/// <summary>
/// Class that handles recipe logic
/// </summary>
public class RecipeService
{
    private readonly IRecipeRepository _repository;

    public RecipeService(IRecipeRepository repository)
    {
        _repository = repository;
    }

    public List<Recipe> GetAllRecipes()
    {
        var allRecipes = _repository.GetAll();
        return allRecipes;
    }

    public Recipe? GetRecipeById(int id)
    {
        var recipe = _repository.Get(id);
        return recipe;
    }

    public List<Recipe> GetRecipesByName(string name)
    {
        var trimmedName = name.Trim();
        var allRecipes = _repository.GetAll();

        return allRecipes
            .Where(r => r.Name.Contains(trimmedName, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(r => r.Name.StartsWith(trimmedName, StringComparison.OrdinalIgnoreCase))
            .ThenBy(r => r.Name.IndexOf(trimmedName, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }

    public List<Recipe> GetRecipesByIngredients(List<string> ingredients)
    {
        var allRecipes = _repository.GetAll();
        return allRecipes
            .Where(r => r.Ingredients.Any(i => ingredients.Any(ingredient =>
                string.Equals(ingredient, i.Ingredient.Name, StringComparison.OrdinalIgnoreCase))))
            .ToList();
    }
    
    public ICollection<User>? GetUsersWhoLikedRecipe(int recipeId)
    {
        var recipe = _repository.Get(recipeId);
        return recipe?.LikedBy;
    }
    
    public void CreateRecipe(Recipe recipe)
    {
        if (string.IsNullOrWhiteSpace(recipe.Name))
        {
            throw new ArgumentException("Recipe name cannot be empty.", nameof(recipe));
        }

        _repository.Create(recipe);
    }

    public void DeleteRecipe(int id)
    {
        var recipe = _repository.Get(id);
        if (recipe == null)
        {
            throw new InvalidOperationException("Recipe not found.");
        }

        _repository.Delete(recipe);
    }

    public ICollection<Recipe> GetTopRecipes(int count) => _repository.GetTopRecipes(count);

    public void CreateExampleRecipes()
    {
        _repository.CreateWithIngredients(new Recipe
        {
            Name = "Pizza Margherita",
            Categories = new List<RecipeCategory> { RecipeCategory.Pizza, RecipeCategory.Italian, RecipeCategory.Vegetarian },
            Creator = new User { Id = 1 },
            PictureUrl = "0c01601c-d5cf-4207-ba44-f5f38266b15a.jpg",
            PrepTime = 5,
            CookingTime = 10,
            Difficulty = 40,
            Description =
                "Indulge in the simplicity and flavor of Pizza Margherita, a classic Italian masterpiece beloved worldwide. With a heritage tracing back to 19th century Naples, this iconic pizza is a symphony of fresh ingredients. A thin, chewy crust is adorned with vibrant San Marzano tomatoes, aromatic basil leaves, and creamy mozzarella cheese. Its timeless appeal lies in its perfect balance of tangy tomato sauce, fragrant basil, and the gooey richness of melted cheese, creating a culinary delight that transcends borders and captivates palates. Dive into a slice of history with Pizza Margherita – a true celebration of Italian culinary tradition.",
            InstructionText = "1. Preheat the Oven:\n" +
                              "Preheat your oven to the highest temperature possible, usually around 475-500\u00b0F (245-260\u00b0C). If you have a pizza stone, place it in the oven to preheat as well.\n" +
                              "2. Prepare the Dough:\n" +
                              "Roll out the pizza dough on a lightly floured surface into a circle of your desired thickness. If you prefer a thin crust, roll it out thinner; for a thicker crust, leave it a bit thicker.\n" +
                              "3. Assemble the Pizza:\n" +
                              "Place the rolled-out dough on a pizza peel or parchment paper. Spread the San Marzano tomato sauce evenly over the dough, leaving a small border around the edges.\n" +
                              "4. Add the Cheese:\n" +
                              "Arrange the slices of fresh mozzarella evenly over the sauce. Make sure the cheese covers the entire surface of the pizza.\n" +
                              "5. Sprinkle with Basil:\n" +
                              "Tear fresh basil leaves and scatter them over the cheese. You can use as much or as little basil as you prefer, but traditionally, Pizza Margherita is garnished generously with basil.\n" +
                              "6. Season and Drizzle:\n" +
                              "Season the pizza with a pinch of salt and freshly ground black pepper to taste. Drizzle a little extra virgin olive oil over the top for added flavor.\n" +
                              "7. Bake the Pizza:\n" +
                              "Carefully transfer the assembled pizza onto the preheated pizza stone or a baking sheet lined with parchment paper. Bake in the preheated oven for 10-12 minutes, or until the crust is golden brown and the cheese is bubbling and slightly browned around the edges.\n" +
                              "8. Serve and Enjoy:\n" +
                              "Once the pizza is done, remove it from the oven and let it cool for a minute or two. Slice it into wedges and serve hot. Enjoy the authentic flavors of Pizza Margherita!\n" +
                              "\n" +
                              "Tips:\n" +
                              "- For an extra crisp crust, pre-bake the dough for a few minutes before adding the toppings.\n" +
                              "- Use high-quality ingredients, especially San Marzano tomatoes and fresh mozzarella, for the best flavor.\n" +
                              "- Experiment with adding other toppings like olives or cherry tomatoes if desired, but keep in mind that traditional Pizza Margherita is simple and focused on a few key ingredients.",
            Ingredients = new List<RecipeIngredient>
            {
                new()
                {
                    Quantity = 1,
                    Ingredient = new Ingredient { Name = "Pizza dough" },
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Tomato sauce" }
                },
                new()
                {
                    Quantity = 200,
                    UnitOfMeasure = "gram",
                    Ingredient = new Ingredient { Name = "Cheese" }
                },
                new()
                {
                    Ingredient = new Ingredient { Name = "Basil" }
                },
                new()
                {
                    Ingredient = new Ingredient { Name = "Salt" }
                },
                new()
                {
                    Ingredient = new Ingredient { Name = "Pepper" }
                }
            }
        });

        _repository.CreateWithIngredients(new Recipe
        {
            Name = "Spaghetti Carbonara",
            Categories = new List<RecipeCategory> { RecipeCategory.Pasta, RecipeCategory.Italian },
            Creator = new User { Id = 1 },
            PictureUrl = "be75f4d4-2603-4a64-a50d-1470950d665e.jpg",
            PrepTime = 10,
            CookingTime = 15,
            Difficulty = 50,
            Description =
                "Treat yourself to the indulgent flavors of Spaghetti Carbonara, a classic Italian pasta dish that marries simplicity with elegance. Originating from Rome, this creamy delicacy features al dente spaghetti enveloped in a velvety sauce crafted from eggs, Pecorino Romano cheese, crispy pancetta, and freshly ground black pepper. Each forkful offers a symphony of rich, savory notes, making it a favorite among pasta enthusiasts worldwide. Whether you're seeking comfort food or gourmet fare, Spaghetti Carbonara promises to satisfy your cravings and elevate your dining experience.",
            InstructionText = "1. Cook the Pasta:\n" +
                              "Bring a large pot of salted water to a boil. Add the spaghetti and cook according to the package instructions until al dente. Reserve about 1 cup of pasta water, then drain the spaghetti.\n" +
                              "2. Prepare the Sauce:\n" +
                              "In a mixing bowl, whisk together the eggs, grated Pecorino Romano cheese, and a generous amount of freshly ground black pepper. Set aside.\n" +
                              "3. Cook the Pancetta:\n" +
                              "In a large skillet over medium heat, cook the diced pancetta until crispy and golden brown, about 5-7 minutes. Remove from the skillet and drain on paper towels.\n" +
                              "4. Combine the Ingredients:\n" +
                              "Add the cooked spaghetti to the skillet with the rendered pancetta fat, tossing to coat the pasta evenly. Remove the skillet from the heat.\n" +
                              "5. Add the Sauce:\n" +
                              "Pour the egg and cheese mixture over the hot spaghetti, quickly tossing the pasta to coat it in the sauce. The residual heat will cook the eggs and create a creamy consistency. If the sauce seems too thick, gradually add some of the reserved pasta water to loosen it.\n" +
                              "6. Serve and Garnish:\n" +
                              "Divide the Spaghetti Carbonara among serving plates. Garnish each portion with the crispy pancetta pieces and an extra sprinkle of grated Pecorino Romano cheese and black pepper.\n" +
                              "\n" +
                              "Tips:\n" +
                              "- Work quickly when combining the pasta with the egg and cheese mixture to prevent the eggs from scrambling.\n" +
                              "- Adjust the amount of black pepper to suit your taste preferences; the dish should have a noticeable but not overwhelming peppery flavor.\n" +
                              "- Use freshly grated Pecorino Romano cheese for the best flavor and texture.",
            Ingredients = new List<RecipeIngredient>
            {
                new()
                {
                    Quantity = 8,
                    UnitOfMeasure = "ounces",
                    Ingredient = new Ingredient { Name = "Spaghetti" },
                },
                new()
                {
                    Quantity = 4,
                    UnitOfMeasure = "ounces",
                    Ingredient = new Ingredient { Name = "diced Pancetta" }
                },
                new()
                {
                    Quantity = 3,
                    Ingredient = new Ingredient { Name = "Eggs" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "grated Pecorino Romano cheese" }
                },
                new()
                {
                    Ingredient = new Ingredient { Name = "Black pepper" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "pinch",
                    Ingredient = new Ingredient { Name = "Salt" }
                }
            }
        });

        _repository.CreateWithIngredients(new Recipe
        {
            Name = "Chicken Tikka Masala",
            Categories = new List<RecipeCategory> { RecipeCategory.Chicken, RecipeCategory.Indian },
            Creator = new User { Id = 1 },
            PictureUrl = "c496c4cc-a1ec-478b-b17d-cc2f48468eac.jpg",
            PrepTime = 20,
            CookingTime = 30,
            Difficulty = 60,
            Description =
                "Embark on a culinary journey through the vibrant flavors of India with Chicken Tikka Masala, a beloved dish that tantalizes the taste buds with its aromatic spices and tender chicken. Originating from the Indian subcontinent, this creamy curry boasts marinated chicken pieces cooked in a luscious tomato-based sauce infused with a medley of spices. From the smoky notes of charred chicken to the velvety texture of the sauce, each spoonful delivers a harmonious blend of savory, sweet, and spicy flavors. Whether served with fluffy basmati rice or warm naan bread, Chicken Tikka Masala promises to transport you to the bustling streets of India with every bite.",
            InstructionText = "1. Marinate the Chicken:\n" +
                              "In a large mixing bowl, combine the yogurt, ginger garlic paste, lemon juice, garam masala, turmeric, cumin, paprika, and salt. Add the chicken pieces to the marinade, ensuring they are well coated. Cover and refrigerate for at least 1 hour, or preferably overnight.\n" +
                              "2. Preheat the Grill:\n" +
                              "Preheat your grill to medium-high heat. Thread the marinated chicken pieces onto skewers and grill until cooked through and slightly charred, about 10-12 minutes, turning occasionally. Remove from the grill and set aside.\n" +
                              "3. Prepare the Sauce:\n" +
                              "In a large skillet or saucepan, heat the oil over medium heat. Add the diced onion and sauté until soft and translucent, about 5-7 minutes. Stir in the minced garlic, ginger, and green chilies, cooking for another 2-3 minutes until fragrant.\n" +
                              "4. Simmer the Sauce:\n" +
                              "Add the tomato puree, ground coriander, cumin, paprika, garam masala, and salt to the skillet, stirring to combine. Simmer the sauce over medium-low heat for 10-12 minutes, allowing the flavors to meld and the sauce to thicken.\n" +
                              "5. Finish the Dish:\n" +
                              "Gently stir in the grilled chicken tikka pieces, ensuring they are evenly coated in the sauce. Cook for an additional 5-7 minutes, allowing the flavors to blend further. Stir in the heavy cream and cook for another 2-3 minutes until heated through.\n" +
                              "6. Serve and Garnish:\n" +
                              "Transfer the Chicken Tikka Masala to a serving dish and garnish with freshly chopped cilantro leaves. Serve hot with steamed basmati rice, naan bread, or your favorite Indian accompaniments.\n" +
                              "\n" +
                              "Tips:\n" +
                              "- For extra smoky flavor, you can char the chicken tikka under a broiler instead of grilling.\n" +
                              "- Adjust the spice levels according to your preference by increasing or decreasing the amount of green chilies and chili powder.\n" +
                              "- To make the dish vegetarian, substitute paneer or tofu for the chicken and adjust the cooking time as needed.",
            Ingredients = new List<RecipeIngredient>
            {
                new()
                {
                    Quantity = 1.5,
                    UnitOfMeasure = "lbs",
                    Ingredient = new Ingredient { Name = "Boneless, skinless chicken thighs" },
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Yogurt" }
                },
                new()
                {
                    Quantity = 2,
                    UnitOfMeasure = "tbsp",
                    Ingredient = new Ingredient { Name = "Ginger garlic paste" }
                },
                new()
                {
                    Quantity = 2,
                    UnitOfMeasure = "tbsp",
                    Ingredient = new Ingredient { Name = "Lemon juice" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tbsp",
                    Ingredient = new Ingredient { Name = "Garam masala" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tsp",
                    Ingredient = new Ingredient { Name = "Turmeric powder" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tsp",
                    Ingredient = new Ingredient { Name = "Ground cumin" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tsp",
                    Ingredient = new Ingredient { Name = "Paprika" }
                },
                new()
                {
                    Quantity = 2,
                    UnitOfMeasure = "tbsp",
                    Ingredient = new Ingredient { Name = "Vegetable oil" }
                },
                new()
                {
                    Quantity = 1,
                    Ingredient = new Ingredient { Name = "Large onion" }
                },
                new()
                {
                    Quantity = 3,
                    UnitOfMeasure = "cloves",
                    Ingredient = new Ingredient { Name = "Minced garlic" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "inch",
                    Ingredient = new Ingredient { Name = "Ginger, grated" }
                },
                new()
                {
                    Quantity = 2,
                    Ingredient = new Ingredient { Name = "Green chilies" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Tomato puree" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tsp",
                    Ingredient = new Ingredient { Name = "Ground coriander" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tsp",
                    Ingredient = new Ingredient { Name = "Ground cumin" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tsp",
                    Ingredient = new Ingredient { Name = "Paprika" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tsp",
                    Ingredient = new Ingredient { Name = "Garam masala" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tsp",
                    Ingredient = new Ingredient { Name = "Salt" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Heavy cream" }
                },
                new()
                {
                    Ingredient = new Ingredient { Name = "Fresh cilantro leaves" }
                }
            }
        });

        _repository.CreateWithIngredients(new Recipe
        {
            Name = "Mango Sticky Rice",
            Categories = new List<RecipeCategory> { RecipeCategory.Asian, RecipeCategory.Vegan },
            Creator = new User { Id = 1 },
            PictureUrl = "9a1393f4-55ac-4411-83bb-3d97145f9f5a.jpg",
            PrepTime = 15,
            CookingTime = 25,
            Difficulty = 30,
            Description =
                "Transport your taste buds to the tropical paradise of Thailand with Mango Sticky Rice, a luscious dessert that combines the creamy sweetness of ripe mangoes with the indulgent texture of coconut-infused sticky rice. Originating from Southeast Asia, this beloved treat captures the essence of summer with its vibrant colors and irresistible flavors. Each spoonful offers a harmonious blend of fragrant rice bathed in a coconut milk sauce, adorned with slices of succulent mango and topped with crunchy toasted sesame seeds. Whether enjoyed as a refreshing finale to a Thai feast or savored on its own, Mango Sticky Rice promises to delight your senses and evoke memories of sunny days under swaying palm trees.",
            InstructionText = "1. Rinse the Rice:\n" +
                              "Place the sticky rice in a bowl and rinse it with cold water until the water runs clear. Soak the rice in enough water to cover it for at least 30 minutes, or preferably overnight.\n" +
                              "2. Steam the Rice:\n" +
                              "Drain the soaked rice and transfer it to a bamboo steamer lined with cheesecloth. Steam the rice over boiling water for 20-25 minutes, or until tender and cooked through.\n" +
                              "3. Prepare the Sauce:\n" +
                              "In a saucepan, combine the coconut milk, sugar, and salt over medium heat. Stir until the sugar is dissolved and the mixture is heated through, but do not boil. Remove from heat and set aside.\n" +
                              "4. Mix the Rice and Sauce:\n" +
                              "Transfer the steamed sticky rice to a large mixing bowl. Pour half of the warm coconut milk sauce over the rice and gently fold it in until the rice is evenly coated. Allow the rice to absorb the sauce for 10-15 minutes.\n" +
                              "5. Serve the Mango Sticky Rice:\n" +
                              "Peel and slice the ripe mangoes. Arrange the mango slices alongside the coconut-infused sticky rice on serving plates. Drizzle the remaining coconut milk sauce over the mangoes and rice. Sprinkle toasted sesame seeds on top for added crunch and garnish with fresh mint leaves, if desired.\n" +
                              "\n" +
                              "Tips:\n" +
                              "- Use sweet, ripe mangoes for the best flavor and texture.\n" +
                              "- If you don't have a bamboo steamer, you can cook the sticky rice using a rice cooker or on the stovetop according to the package instructions.\n" +
                              "- Customize the sweetness of the coconut sauce to your liking by adjusting the amount of sugar.",
            Ingredients = new List<RecipeIngredient>
            {
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Sticky rice" },
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Coconut milk" }
                },
                new()
                {
                    Quantity = 2,
                    UnitOfMeasure = "tbsp",
                    Ingredient = new Ingredient { Name = "Sugar" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "pinch",
                    Ingredient = new Ingredient { Name = "Salt" }
                },
                new()
                {
                    Quantity = 2,
                    UnitOfMeasure = "medium",
                    Ingredient = new Ingredient { Name = "Ripe mangoes" }
                },
                new()
                {
                    Ingredient = new Ingredient { Name = "Toasted sesame seeds" }
                },
                new()
                {
                    Ingredient = new Ingredient { Name = "Fresh mint leaves" }
                }
            }
        });

        _repository.CreateWithIngredients(new Recipe
        {
            Name = "Greek Salad",
            Categories = new List<RecipeCategory> { RecipeCategory.Salad, RecipeCategory.Vegetarian },
            Creator = new User { Id = 1 },
            PictureUrl = "c37bd2f7-42de-41e9-8e4b-4b87dd68a79a.jpg",
            PrepTime = 15,
            CookingTime = 0,
            Difficulty = 20,
            Description =
                "Savor the fresh and vibrant flavors of the Mediterranean with Greek Salad, a refreshing dish that celebrates the bounty of the sun-kissed region. Originating from Greece, this iconic salad is a harmonious blend of crisp cucumbers, juicy tomatoes, tangy Kalamata olives, creamy feta cheese, and aromatic herbs, all drizzled with a zesty olive oil and lemon dressing. Each bite offers a symphony of textures and tastes, from the crunch of fresh vegetables to the briny richness of olives and cheese. Whether served as a light appetizer or a wholesome meal on its own, Greek Salad promises to transport you to the azure shores of the Aegean Sea with its authentic flavors and simple elegance.",
            InstructionText = "1. Prepare the Dressing:\n" +
                              "In a small bowl, whisk together the extra virgin olive oil, lemon juice, red wine vinegar, minced garlic, dried oregano, salt, and black pepper until well combined. Set aside.\n" +
                              "2. Assemble the Salad:\n" +
                              "In a large serving bowl, combine the chopped lettuce, sliced cucumbers, halved cherry tomatoes, thinly sliced red onion, Kalamata olives, and crumbled feta cheese.\n" +
                              "3. Dress the Salad:\n" +
                              "Drizzle the prepared dressing over the salad ingredients, tossing gently to coat everything evenly.\n" +
                              "4. Garnish and Serve:\n" +
                              "Sprinkle fresh oregano leaves over the top of the salad for a burst of flavor and visual appeal. Serve the Greek Salad immediately as a refreshing appetizer or as a side dish alongside your favorite Mediterranean-inspired main course.\n" +
                              "\n" +
                              "Tips:\n" +
                              "- Use the freshest ingredients available for the best flavor and texture.\n" +
                              "- Feel free to customize the salad by adding extras like bell peppers, pepperoncini peppers, or even grilled chicken or shrimp for a heartier option.\n" +
                              "- Serve the salad chilled for a refreshing contrast of flavors.",
            Ingredients = new List<RecipeIngredient>
            {
                new()
                {
                    Quantity = 1,
                    Ingredient = new Ingredient { Name = "Romaine lettuce" }
                },
                new()
                {
                    Quantity = 2,
                    Ingredient = new Ingredient { Name = "Sliced cucumbers" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Cherry tomatoes" }
                },
                new()
                {
                    Quantity = 1,
                    Ingredient = new Ingredient { Name = "Red onion" }
                },
                new()
                {
                    Quantity = 0.5,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Kalamata olives" }
                },
                new()
                {
                    Quantity = 0.5,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Crumbled feta cheese" }
                },
                new()
                {
                    Quantity = 0.25,
                    UnitOfMeasure = "cup",
                    Ingredient = new Ingredient { Name = "Extra virgin olive oil" }
                },
                new()
                {
                    Quantity = 2,
                    UnitOfMeasure = "tbsp",
                    Ingredient = new Ingredient { Name = "Lemon juice" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tbsp",
                    Ingredient = new Ingredient { Name = "Red wine vinegar" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "clove",
                    Ingredient = new Ingredient { Name = "Minced garlic" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "tsp",
                    Ingredient = new Ingredient { Name = "Dried oregano" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "pinch",
                    Ingredient = new Ingredient { Name = "Salt" }
                },
                new()
                {
                    Quantity = 1,
                    UnitOfMeasure = "pinch",
                    Ingredient = new Ingredient { Name = "Black pepper, freshly ground" }
                },
                new()
                {
                    Ingredient = new Ingredient { Name = "Fresh oregano leaves, for garnish" }
                }
            }
        });
    }

    public static bool TrySaveRecipeImage(string base64Image, out string fileName)
    {
        fileName = "";

        if (base64Image.Length > 1_073_741_824) // = 1 GB
        {   // image is too large
            return false;
        }

        var mimeType = base64Image.Split(';')[0][5..];
        var fileExtension = mimeType switch
        {
            "image/png" => "png",
            "image/jpeg" => "jpg",
            "image/webp" => "webp",
            _ => ""
        };

        if (fileExtension == "")
        {   // invalid mime type
            return false;
        }

        const string folderPath = "wwwroot/images/recipes/";
        fileName = $"{Guid.NewGuid()}.{fileExtension}";
        base64Image = base64Image.Split(',').Last();

        try
        {
            File.WriteAllBytes(folderPath + fileName, Convert.FromBase64String(base64Image));
        }
        catch (Exception)
        {   // could not convert string or save image
            return false;
        }

        return true;
    }

    public bool TrySaveAdventure(int recipeId, string adventureText, out string errorMessage)
    {
        var recipe = _repository.Get(recipeId);

        if (recipe == null)
        {
            errorMessage = $"Could not find recipe with id {recipeId}";
            return false;
        }

        if (adventureText.Length == 0)
        {
            errorMessage = "Adventure text cannot be empty";
            return false;
        }

        recipe.AdventureTexts.Add(adventureText);
        _repository.Update(recipe);
        errorMessage = "";
        return true;
    }
}