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
    }
}