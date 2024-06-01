using Contracts.Entities;
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

    public void UpdateRecipe(Recipe recipe) => _repository.Update(recipe);

    public ICollection<Recipe> GetTopRecipes(int count) => _repository.GetTopRecipes(count);

    public static bool TrySaveRecipeImage(string base64Image, out string fileName)
    {
        fileName = "";

        if (base64Image.Length is < 10 or > 1_073_741_824) // = 1 GB
        {   // image is too short to be an image, or too large
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

    public int CreateRecipeWithIngredients(Recipe recipe)
        => _repository.CreateWithIngredients(recipe);
}