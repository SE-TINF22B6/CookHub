namespace DataAccess.Entities;

public class User
{
    public virtual required string Email { get; set; }
    public virtual required string PasswordHash { get; set; }
    public virtual required string Name { get; set; }
    public virtual string ProfilePicture { get; set; } = "";
    public virtual ICollection<Recipe> LikedRecipes { get; set; } = new List<Recipe>();
    public virtual ICollection<Recipe> History { get; set; } = new List<Recipe>();
}