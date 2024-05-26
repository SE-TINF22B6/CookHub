using Contracts.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class RecipeMap : ClassMap<Recipe>
{
    public RecipeMap()
    {
        Id(recipe => recipe.Id);
        Map(recipe => recipe.Name).Not.Nullable();
        References<User>(recipe => recipe.Creator).Column("creator_id").Not.LazyLoad();
        Map(recipe => recipe.PictureUrl);
        Map(recipe => recipe.PrepTime);
        Map(recipe => recipe.CookingTime);
        Map(recipe => recipe.Difficulty);
        Map(recipe => recipe.Description).CustomSqlType("text");
        Map(recipe => recipe.InstructionText).CustomSqlType("text");
        Map(recipe => recipe.CreationDate);
        HasMany(recipe => recipe.Categories).Cascade.All().Element("category").Not.LazyLoad();
        HasMany(recipe => recipe.Ingredients).Cascade.All().Not.LazyLoad();
        HasMany(recipe => recipe.AdventureTexts).Cascade.All().Element("text").Not.LazyLoad();
        HasManyToMany(recipe => recipe.LikedBy).Cascade.All().Inverse().Table("liked_recipes").Not.LazyLoad();
    }
}