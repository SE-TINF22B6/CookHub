namespace DataAccess.Entities;

public class Recipe
{
    public virtual int Id { get; set; }
    public virtual required string Name { get; set; }
    public virtual required User Creator { get; set; }
    public virtual string PictureUrl { get; set; } = "";
    public virtual int PrepTime { get; set; }
    public virtual int CookingTime { get; set; }
    public virtual RecipeCategory Category { get; set; }
    public virtual int Difficulty { get; set; }
    public virtual string Description { get; set; } = "";
    public virtual string InstructionText { get; set; } = "";
    public virtual string AdventureText { get; set; } = "";
    public virtual DateTime CreationDate { get; set; } = DateTime.Now.ToUniversalTime();
    public virtual ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
}