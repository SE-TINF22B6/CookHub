namespace DataAccess.Entities;

public class Recipe
{
    public virtual int Id { get; set; }
    public virtual required string Name { get; set; }
    public virtual required User Creator { get; set; }
    public virtual string PictureUrl { get; set; } = "";
    public virtual int PrepTime { get; set; }
    public virtual int CookingTime { get; set; }
    public virtual int Difficulty { get; set; }
    public virtual string Description { get; set; } = "";
    public virtual string InstructionText { get; set; } = "";
    public virtual DateTime CreationDate { get; set; } = DateTime.Now.ToUniversalTime();
    public virtual ICollection<RecipeCategory> Categories { get; set; } = new List<RecipeCategory>();
    public virtual ICollection<RecipeIngredient> Ingredients { get; set; } = new List<RecipeIngredient>();
    public virtual ICollection<string> AdventureTexts { get; set; } = new List<string>();

    public override string ToString() =>
        $"Name: {Name}\n" +
        $"Preparation time: {PrepTime} minutes\n" +
        $"Cooking time: {CookingTime} minutes\n" +
        $"Difficulty: {Difficulty}/100\n" +
        "\n" +
        "Ingredients:\n" +
        string.Join('\n', Ingredients.Select(recipeIngredient => recipeIngredient.ToString())) + "\n" +
        "\n" +
        "Instructions:\n" +
        InstructionText;
}