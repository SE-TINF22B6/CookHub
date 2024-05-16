namespace API.Models;

public class RecipeIngredientModel
{
    public required string IngredientName { get; set; }
    public int Quantity { get; set; }
    public string UnitOfMeasure { get; set; } = "";
}