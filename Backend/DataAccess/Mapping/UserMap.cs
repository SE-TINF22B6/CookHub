using Contracts.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class UserMap : ClassMap<User>
{
    public UserMap()
    {
        Table("Users");
        Id(user => user.Id);
        Map(user => user.Email).Not.Nullable().Unique();
        Map(user => user.PasswordHash).Not.Nullable();
        Map(user => user.Name).Not.Nullable();
        Map(user => user.ProfilePicture);
        HasManyToMany<Recipe>(user => user.LikedRecipes).Table("liked_recipes").Cascade.All().Not.LazyLoad();
        HasManyToMany<Recipe>(user => user.History).Table("history").Not.LazyLoad();
    }
}