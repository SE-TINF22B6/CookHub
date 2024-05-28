using System.Text.Json.Serialization;
using Contracts.Models;

namespace Contracts.Entities;

public class User
{
    public virtual int Id { get; set; }
    [JsonIgnore]
    public virtual string Email { get; set; } = null!;
    [JsonIgnore]
    public virtual byte[] PasswordHash { get; set; } = null!;
    public virtual string Name { get; set; } = null!;
    public virtual string ProfilePicture { get; set; } = "";
    [JsonIgnore]
    public virtual ICollection<Recipe> LikedRecipes { get; set; } = new List<Recipe>();
    [JsonIgnore]
    public virtual ICollection<Recipe> History { get; set; } = new List<Recipe>();
    public virtual ICollection<Recipe> CreatedRecipes { get; set; } = new List<Recipe>();

    public virtual UserModel ToModel()
        => new()
        {
            Id = Id,
            Name = Name,
            ProfilePicture = ProfilePicture
        };
}