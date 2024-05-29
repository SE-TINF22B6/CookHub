namespace Contracts.Models;

public class RecipeIngredientModel
{
    public required string IngredientName { get; set; }
    public double Quantity { get; set; }
    public string UnitOfMeasure { get; set; } = "";
}