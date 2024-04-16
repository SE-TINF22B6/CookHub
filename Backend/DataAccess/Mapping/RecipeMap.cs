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
        Map(recipe => recipe.CookingTime);
        Map(recipe => recipe.Category);
        Map(recipe => recipe.Difficulty);
        Map(recipe => recipe.Description);
        Map(recipe => recipe.InstructionText);
        Map(recipe => recipe.CreationDate);
        HasMany<Ingredient>(recipe => recipe.Ingredients).Cascade.All().Inverse().Not.LazyLoad();
        HasMany<AdventureText>(recipe => recipe.AdventureTexts).Cascade.All().Not.LazyLoad();
    }
}