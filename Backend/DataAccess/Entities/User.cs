namespace DataAccess.Entities;

public class User
{
    public virtual required string Email { get; set; }
    public virtual string PasswordHash { get; set; } = null!;
    public virtual string Name { get; set; } = null!;
    public virtual string ProfilePicture { get; set; } = "";
    public virtual ICollection<Recipe> LikedRecipes { get; set; } = new List<Recipe>();
    public virtual ICollection<Recipe> History { get; set; } = new List<Recipe>();
}