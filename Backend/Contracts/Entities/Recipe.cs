using System.Text.Json.Serialization;
using Contracts.Models;

namespace Contracts.Entities;

public class Recipe
{
    public virtual int Id { get; set; }
    public virtual string Name { get; set; } = null!;
    [JsonIgnore]
    public virtual User? Creator { get; set; }
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

    public virtual RecipeModel ToModel(int viewerId = -1)
        => new RecipeModel
        {
            Id = Id,
            Name = Name,
            CreatorId = Creator?.Id?? 0,
            CreatorName = Creator?.Name?? "Deleted user",
            PictureUrl = PictureUrl,
            PrepTime = PrepTime,
            CookingTime = CookingTime,
            Difficulty = Difficulty,
            Description = Description,
            InstructionText = InstructionText,
            CreationDate = CreationDate,
            Categories = Categories.Select(category => category.ToString()),
            AdventureTexts = AdventureTexts,
            LikeCount = LikedBy.Count,
            LikedByCurrentUser = viewerId > 0 && LikedBy.Any(user => user.Id == viewerId)
        };
}