using DataAccess.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class AuthenticationMap : ClassMap<Authentication>
{
    public AuthenticationMap()
    {
        Id(authentication => authentication.AuthToken);
        References<User>(authentication => authentication.User);
    }
}