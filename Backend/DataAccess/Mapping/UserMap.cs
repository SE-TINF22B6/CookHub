using DataAccess.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class UserMap : ClassMap<User>
{
    public UserMap()
    {
        Table("User");
        Id(test => test.Email);
        Map(test => test.PasswordHash).Not.Nullable();
    }
}