using DataAccess.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class RecipeMap : ClassMap<Recipe>
{
    public RecipeMap()
    {
        Id(recipe => recipe.Id);
        Map(recipe => recipe.Name).Not.Nullable();
        References<User>(recipe => recipe.Creator).Column("CreatorEmail");
        Map(recipe => recipe.PictureUrl);
        Map(recipe => recipe.PrepTime);
        Map(recipe => recipe.Description);
        Map(recipe => recipe.InstructionText);
        Map(recipe => recipe.AdventureText);
        Map(recipe => recipe.CreationDate);
        HasManyToMany<Ingredient>(recipe => recipe.Ingredients).Table("recipe_ingredients").Cascade.SaveUpdate().Not.LazyLoad();
    }
}