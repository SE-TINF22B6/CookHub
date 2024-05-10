using System.Text.Json.Serialization;

namespace DataAccess.Entities;

public class User
{
    public virtual required string Email { get; set; }
    [JsonIgnore]
    public virtual byte[] PasswordHash { get; set; } = null!;
    public virtual string Name { get; set; } = null!;
    public virtual string ProfilePicture { get; set; } = "";
    [JsonIgnore]
    public virtual ICollection<Recipe> LikedRecipes { get; set; } = new List<Recipe>();
    [JsonIgnore]
    public virtual ICollection<Recipe> History { get; set; } = new List<Recipe>();
}