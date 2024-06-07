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
        HasManyToMany(user => user.LikedRecipes).Table("liked_recipes").Not.LazyLoad();
        HasMany(user => user.History).Cascade.All().Inverse().Not.LazyLoad();
        HasMany(user => user.CreatedRecipes).Inverse().Not.LazyLoad();
    }
}