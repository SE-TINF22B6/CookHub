using DataAccess.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class UserMap : ClassMap<User>
{
    public UserMap()
    {
        Table("Users");
        Id(user => user.Email);
        Map(user => user.PasswordHash).Not.Nullable();
        Map(user => user.Name).Not.Nullable();
        Map(user => user.ProfilePicture);
        HasMany<Recipe>(user => user.LikedRecipes).Table("LikedRecipes").Not.LazyLoad();
        HasMany<Recipe>(user => user.History).Table("History").Not.LazyLoad();
    }
}