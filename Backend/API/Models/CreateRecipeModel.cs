using Contracts.Entities;
using Contracts.Models;

namespace API.Models;

public class CreateRecipeModel
{
    public required string Name { get; set; }
    public required string Picture { get; set; }
    public int PrepTime { get; set; }
    public int CookingTime { get; set; }
    public int Difficulty { get; set; }
    public required string Description { get; set; }
    public required string InstructionText { get; set; }
    public IEnumerable<string> Categories { get; set; } = new List<string>();
    public IEnumerable<RecipeIngredientModel> Ingredients { get; set; } = new List<RecipeIngredientModel>();

    public Recipe ToSavableEntity(int creatorId, string pictureFileName)
        => new Recipe
        {
            Name = Name,
            Creator = new User { Id = creatorId },
            PictureUrl = pictureFileName,
            PrepTime = PrepTime,
            CookingTime = CookingTime,
            Difficulty = Difficulty,
            Description = Description,
            InstructionText = InstructionText,
            Categories = Categories.Select(Enum.Parse<RecipeCategory>).ToList(),
            Ingredients = Ingredients.Select(ingredient => new RecipeIngredient
            {
                Ingredient = new Ingredient { Name = ingredient.IngredientName },
                Quantity = ingredient.Quantity,
                UnitOfMeasure = ingredient.UnitOfMeasure
            }).ToList()
        };
}