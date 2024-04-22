using DataAccess.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class RecipeMap : ClassMap<Recipe>
{
    public RecipeMap()
    {
        Id(recipe => recipe.Id);
        Map(recipe => recipe.Name).Not.Nullable();
        References<User>(recipe => recipe.Creator).Column("CreatorEmail").Not.LazyLoad();
        Map(recipe => recipe.PictureUrl);
        Map(recipe => recipe.PrepTime);
        Map(recipe => recipe.CookingTime);
        Map(recipe => recipe.Difficulty);
        Map(recipe => recipe.Description);
        Map(recipe => recipe.InstructionText);
        Map(recipe => recipe.CreationDate);
        HasMany(recipe => recipe.Categories).Cascade.All().Element("category");
        HasMany(recipe => recipe.Ingredients).Cascade.All().Inverse().Not.LazyLoad();
        HasMany(recipe => recipe.AdventureTexts).Cascade.All().Element("text");
    }
}