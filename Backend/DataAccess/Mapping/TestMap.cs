using DataAccess.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class TestMap : ClassMap<TestEntity>
{
    public TestMap()
    {
        Table("Test");
        Id(test => test.Email);
        Map(test => test.Password).Not.Nullable();
    }
}