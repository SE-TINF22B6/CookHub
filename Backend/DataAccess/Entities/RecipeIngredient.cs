namespace DataAccess.Entities;

public class RecipeIngredient
{
    public virtual required Recipe Recipe { get; set; }
    public virtual required Ingredient Ingredient { get; set; }
    public virtual double Quantity { get; set; }
    public virtual string UnitOfMeasure { get; set; } = "";

    // Equals(...) and GetHashCode(...) method must be overridden for NHibernate
    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != this.GetType()) return false;
        RecipeIngredient other = (RecipeIngredient)obj;
        return Recipe.Equals(other.Recipe) && Ingredient.Equals(other.Ingredient);
    }

    public override int GetHashCode() => HashCode.Combine(Recipe, Ingredient);
}