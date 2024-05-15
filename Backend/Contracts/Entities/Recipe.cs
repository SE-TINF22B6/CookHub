using System.Text.Json.Serialization;

namespace Contracts.Entities;

public class Recipe
{
    public virtual int Id { get; set; }
    public virtual string Name { get; set; } = null!;
    [JsonIgnore]
    public virtual User Creator { get; set; } = null!;
    public virtual int CreatorId => Creator.Id;
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
    [JsonIgnore]
    public virtual ICollection<User> LikedBy { get; set; } = new List<User>();
    public virtual IEnumerable<int> LikedUserIds => LikedBy.Select(user => user.Id);

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