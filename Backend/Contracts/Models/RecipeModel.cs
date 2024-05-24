using Contracts.Entities;

namespace Contracts.Models;

public class RecipeModel
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int CreatorId { get; set; }
    public required string CreatorName { get; set; }
    public required string PictureUrl { get; set; }
    public int PrepTime { get; set; }
    public int CookingTime { get; set; }
    public int Difficulty { get; set; }
    public required string Description { get; set; }
    public required string InstructionText { get; set; }
    public DateTime CreationDate { get; set; } = DateTime.Now.ToUniversalTime();
    public IEnumerable<string> Categories { get; set; } = new List<string>();
    public IEnumerable<RecipeIngredient> Ingredients { get; set; } = new List<RecipeIngredient>();
    public IEnumerable<string> AdventureTexts { get; set; } = new List<string>();
    public int LikeCount { get; set; }
    public bool LikedByCurrentUser { get; set; }
}