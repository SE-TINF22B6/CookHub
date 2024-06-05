using Contracts.Entities;

namespace Services;

/// <summary>
/// Extension methods to create test data
/// </summary>
public static class TestDataExtensions
{
    public static void CreateTestUser(this UserService userService)
        => userService.CreateUser(new User
        {
            Email = "admin@cookhub.com",
            PasswordHash = CryptoService.GetHash("password"),
            Name = "Carlos",
            ProfilePicture = "7800de47-3004-495a-bdb5-55a22e3ed9a3.png"
        });

    public static void CreateExampleRecipes(this RecipeService recipeService)
    {
        recipeService.CreateRecipeWithIngredients(new Recipe
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

        recipeService.CreateRecipeWithIngredients(new Recipe
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

        recipeService.CreateRecipeWithIngredients(new Recipe
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

        recipeService.CreateRecipeWithIngredients(new Recipe
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

        recipeService.CreateRecipeWithIngredients(new Recipe
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

    public static void CreateExampleAdventureTexts(this RecipeService recipeService)
    {
        var recipes = recipeService.GetAllRecipes();
        var pizza = recipes.Single(recipe => recipe.Name == "Pizza Margherita");
        var spaghetti = recipes.Single(recipe => recipe.Name == "Spaghetti Carbonara");
        var tikkaMasala = recipes.Single(recipe => recipe.Name == "Chicken Tikka Masala");

        pizza.AdventureTexts.Add("The Hero's Journey: Pizza Margherita\n\nIn the heart of an ancient kitchen, I, a humble cook, stood facing my ultimate quest - to craft the legendary Pizza Margherita. As the aroma of ripe tomatoes and fresh basil filled the air, I knew this journey would test my culinary skills to their limit.\n\nChapter 1: The Call to Adventure\nWith a determined gaze, I preheated the oven to its fiery peak, readying myself for the challenges that lay ahead. The pizza stone hummed with anticipation, echoing the whispers of past bakers who had braved its scorching heat.\n\nChapter 2: Crossing the Threshold\nI took a deep breath and began to knead the dough, feeling its soft resistance yield beneath my touch. With each roll, the dough transformed into a canvas, waiting to be adorned with the colors and flavors of my quest.\n\nChapter 3: The Trial\nAs I spread the San Marzano tomato sauce in careful, concentric circles, a sense of purpose infused my movements. With steady hands, I layered the fresh mozzarella, each slice a testament to the strength of my resolve.\n\nChapter 4: Meeting the Mentor\nThe basil, torn and scattered like whispers of ancient wisdom, settled over the cheese in a fragrant cascade. I felt the presence of countless cooks who had come before me, guiding my hand with their silent expertise.\n\nChapter 5: The Ordeal\nWith a sprinkle of salt and a dash of pepper, the pizza was ready for its final trial by fire. I gently drizzled olive oil over the masterpiece, anointing it with the essence of my spirit.\n\nChapter 6: The Reward\nAs the pizza sizzled in the oven, the cheese melted and bubbled, creating a symphony of flavors that danced in the flickering light. When the crust emerged golden and crisp, I knew my journey was complete.\n\nChapter 7: The Return\nWith a sense of pride, I removed the Pizza Margherita from the oven, its scent a beacon of triumph that called others to share in my victory. I sliced it into wedges, each piece a testament to the artistry and dedication that had brought me to this moment.\n\nEpilogue: The Feast\nGathered around the table, we savored each bite of the Pizza Margherita, its flavors transporting us to a place of pure bliss. As we laughed and shared tales of our own culinary adventures, I knew that my quest had not only created a meal but had forged a bond that would last a lifetime.");
        pizza.AdventureTexts.Add("The Hero's Journey of Pizza Margherita\n\nIn the bustling town of Pizzaria, where the aroma of freshly baked dough and bubbling cheese filled the air, I, a humble cook, embarked on a quest to create the legendary Pizza Margherita. With my apron as my armor and spatula as my sword, I stood ready to face the challenge that lay ahead.\n\nChapter 1: The Call to Adventure\nAs I preheated the oven to its fiery maximum, the flames danced and beckoned me to begin my journey. The pizza stone awaited, promising to bestow upon me the gift of a perfectly crispy crust. With determination in my heart, I knew my quest had begun.\n\nChapter 2: The Preparation\nWith steady hands, I rolled out the pizza dough, shaping it into a circle of perfect proportions. The flour dusted off like magic as the dough transformed under my touch, ready to carry the weight of the flavorful toppings that awaited.\n\nChapter 3: The Assembly\nAs I spread the San Marzano tomato sauce over the dough, its rich aroma filled the room, awakening memories of ancient flavors. The fresh mozzarella followed, its creamy texture a promise of the gooey delight to come. I sprinkled basil like confetti, honoring tradition with each leaf that fell.\n\nChapter 4: The Seasoning\nA pinch of salt, a twist of pepper; I seasoned the pizza with care, knowing that balance was the key to unlocking the true essence of Pizza Margherita. A drizzle of olive oil completed the ritual, infusing the creation with a final burst of flavor.\n\nChapter 5: The Trial\nWith courage and precision, I transferred the pizza onto the scorching hot stone, where it sizzled and sang in the fiery depths of the oven. The minutes passed like hours as I watched, anticipation building with each golden bubble that formed on the cheese.\n\nChapter 6: The Victory\nAs the timer chimed its victorious song, I pulled the pizza from the oven, its crust golden and crisp, its cheese bubbling like molten lava. With a triumphant smile, I sliced it into wedges, knowing that my quest had reached its delicious conclusion.\n\nChapter 7: The Feast\nGathered around the table, my companions and I beheld the masterpiece before us. With each bite of the authentic Pizza Margherita, we tasted the fruits of my labor, savoring the simple yet unforgettable flavors that told the tale of my heroic journey in the world of culinary delights.\n\nAnd so, my friends, with the last crumb devoured and the last slice gone, we raise a toast to the magical art of pizza-making, where every adventure is as savory as the next.");
        pizza.AdventureTexts.Add("The Epic Quest for Pizza Margherita\n\nIn the quiet town of Flavortown, where the aroma of freshly baked bread wafted through the streets, I, a simple cook, embarked on a culinary adventure to create the legendary Pizza Margherita. Little did I know, this quest would test my skills and lead me to uncover the true essence of Italian cuisine.\n\nChapter 1: The Preheating Ritual\n\nAs the sun dipped below the horizon, casting a warm glow over the kitchen, I prepared to preheat the mystical oven to its maximum temperature. The flames danced eagerly, ready to bring life to the pizza stone that awaited its fiery embrace.\n\nChapter 2: The Rolling of the Dough\n\nWith steady hands and a determined heart, I rolled out the pizza dough, each movement a step closer to the perfect crust. The flour dusted the air like magic, coating the dough in a cloak of potential as I shaped it into a circle of promise.\n\nChapter 3: The Art of Assembly\n\nAs I adorned the dough with the sacred San Marzano tomato sauce, a sense of reverence filled the room. The red sauce spoke of sun-kissed tomatoes and whispered tales of vine-ripened flavors. I spread it evenly, a canvas for the masterpiece to come.\n\nChapter 4: The Dance of Cheese\n\nThe fresh mozzarella, a gift from the cheese gods, lay in delicate slices on the sauce, each piece a creamy offering to the pizza gods. I ensured that every inch of the dough was covered, a blanket of dairy goodness ready to melt and mingle with the other ingredients.\n\nChapter 5: The Basil's Blessing\n\nWith a flourish, I tore fresh basil leaves and scattered them over the cheese, a fragrant shower of greenery. The basil, with its earthy aroma, brought a touch of nature to the pizza, a reminder of the fields where it once grew under the Italian sun.\n\nChapter 6: The Seasoning Ritual\n\nA pinch of salt, a grind of pepper, a drizzle of olive oil - the final touches that would elevate the pizza from mere food to a symphony of flavors. I seasoned it with care, knowing that each ingredient played a vital role in the culinary tale unfolding before me.\n\nChapter 7: The Baking Battle\n\nWith a deep breath, I transferred the pizza onto the preheated stone, the heat embracing it like a long-lost friend. As it baked, the crust turned a golden brown, the cheese bubbled with anticipation, and the basil danced in the heat, releasing its essence into the air.\n\nChapter 8: The Feast of Victory\n\nAs I removed the pizza from the oven, the scent of success filled the room. I sliced it into wedges, each piece a triumph of flavor and tradition. With a satisfied smile, I savored the first bite, the taste of authenticity washing over me like a wave of pure bliss.\n\nAnd so, my journey to create the perfect Pizza Margherita came to an end, but the memories of this epic quest lingered in the air, a reminder of the magic that happens when passion meets tradition in the kitchen of a humble cook.");
        spaghetti.AdventureTexts.Add("The Hero's Journey through Spaghetti Carbonara\n\nIn a land where culinary adventures awaited, I, a humble cook, set out to conquer the ultimate challenge - Spaghetti Carbonara. Armed with nothing but a pot, a mixing bowl, and the will to create a dish fit for a king, I embarked on this epic quest.\n\nChapter 1: The Boiling Cauldron\nI stood before the bubbling cauldron, the pot of salted water reaching a fierce boil. With a steady hand, I added the spaghetti, watching it dance and swirl in the depths of the pot. The pasta cooked, whispering secrets of al dente perfection.\n\nChapter 2: The Elixir of the Gods\nIn a sacred mixing bowl, I combined the mystical ingredients - eggs, grated Pecorino Romano cheese, and a storm of freshly ground black pepper. The mixture shimmered like a potion, ready to bestow creamy richness upon the spaghetti.\n\nChapter 3: The Sizzling Battle\nThe diced pancetta sizzled and crackled in the skillet, releasing an enticing aroma that filled the air. I battled the pancetta, flipping and turning it until it surrendered, golden brown and crispy, to my culinary prowess.\n\nChapter 4: The Fusion of Worlds\nIn a grand finale, I united the cooked spaghetti with the conquered pancetta, the rendered fat coating the strands in a glorious symphony of flavors. The skillet became a battlefield where ingredients merged in harmony.\n\nChapter 5: The Dance of Transformation\nAs the egg and cheese mixture descended upon the steaming spaghetti like a divine blessing, I tossed and turned, ensuring every strand was cloaked in the velvety sauce. The heat worked its magic, transforming the humble pasta into a dish fit for a feast.\n\nChapter 6: The Presentation of Victory\nIn a moment of triumph, I plated the Spaghetti Carbonara, a masterpiece worthy of praise. Each serving bore the crown of crispy pancetta, a sprinkling of grated Pecorino Romano cheese, and a dusting of black pepper, a feast for the eyes and the palate.\n\nAnd thus, with pasta conquered and flavors united, I, the culinary hero, emerged victorious from the battle of Spaghetti Carbonara, ready to share this tale of culinary greatness with all who dared to embark on the same epic journey.");
        spaghetti.AdventureTexts.Add("The Hero's Journey of Spaghetti Carbonara\n\nIn a land where culinary adventures awaited at every turn, I, a humble cook, found myself called to embark on a quest to master the art of creating the legendary Spaghetti Carbonara.\n\nChapter 1: The Call to Adventure\nAs I stood in my kitchen, surrounded by the ingredients for Spaghetti Carbonara, I felt a sense of anticipation wash over me. The time had come to journey into the unknown world of this classic Italian dish.\n\nChapter 2: Crossing the Threshold\nWith a pot of water bubbling on the stove, I added the spaghetti, watching as it danced in the boiling water. The first step of my epic culinary journey had begun.\n\nChapter 3: The Road of Trials\nWhile the spaghetti cooked, I mixed the eggs, Pecorino Romano cheese, and a generous amount of black pepper in a bowl, preparing the sacred sauce that would bring the dish to life. Meanwhile, in a skillet, the pancetta sizzled and crisped, filling the air with its tantalizing aroma.\n\nChapter 4: The Ultimate Boon\nAs the pasta and pancetta joined forces in the skillet, I poured the heavenly sauce over them, the combination creating a symphony of flavors. With a quick toss, the ingredients melded together, the heat of the dish transforming the sauce into a creamy masterpiece.\n\nChapter 5: The Return Home\nServing the Spaghetti Carbonara on plates, I crowned each portion with the crispy pancetta and a final sprinkle of Pecorino Romano cheese and black pepper. The dish stood before me, a testament to my culinary prowess and the journey I had undertaken.\n\nEpilogue: The Feast of Legends\nSitting down to savor the fruits of my labor, I took a bite of the Spaghetti Carbonara. The creamy texture, the savory pancetta, the sharp bite of black pepper - it was a dish fit for heroes. And as I finished the last bite, I knew that I had not only mastered the art of Spaghetti Carbonara but had also discovered the true essence of culinary adventure.");
        tikkaMasala.AdventureTexts.Add("The Hero's Journey of Chicken Tikka Masala\n\nOnce upon a time, in a bustling kitchen filled with exotic spices and tantalizing aromas, I, a humble cook, embarked on a culinary adventure to prepare the legendary Chicken Tikka Masala.\n\nMarinating the Warrior:\nIn a grand mixing bowl, I combined the sacred ingredients - yogurt, ginger garlic paste, lemon juice, garam masala, turmeric, cumin, paprika, and salt. The boneless, skinless chicken thighs embraced the marinade like a warrior donning armor, ready to face the trials ahead. I bestowed upon them a restful night in the chiller, allowing the flavors to meld.\n\nGrilling the Fire:\nAs the dawn broke, I preheated the ancient grill to medium-high heat, its flames dancing like flickering spirits. I threaded the marinated chicken pieces onto skewers, their sizzling battle cry echoing through the air. With each turn, they charred to perfection, embodying the essence of fire and smoke.\n\nCrafting the Enchanting Sauce:\nIn a mystical skillet, I heated the oil like liquid gold, infusing it with the essence of diced onion, garlic, ginger, and green chilies. The alchemy of tomato puree, ground coriander, cumin, paprika, garam masala, and salt transformed the humble ingredients into a fragrant elixir. The sauce simmered, thickening with each passing moment, a symphony of flavors unfolding.\n\nUniting Warrior and Sauce:\nWith a sense of purpose, I gently embraced the grilled chicken tikka pieces with the enchanting sauce, their destinies intertwined. They simmered together, merging their essences in a dance of flavors. The heavy cream added a rich velvety touch, harmonizing the elements into a divine union.\n\nThe Feast of Legends:\nIn a grand ceremony, I presented the Chicken Tikka Masala, adorned with fresh cilantro leaves, a symbol of victory and triumph. The dish stood as a testament to my culinary conquest, a feast fit for kings and adventurers alike. With steamed basmati rice and naan bread as loyal companions, the saga of the Chicken Tikka Masala reached its epic conclusion.");

        recipeService.UpdateRecipe(pizza);
        recipeService.UpdateRecipe(spaghetti);
        recipeService.UpdateRecipe(tikkaMasala);
    }
}