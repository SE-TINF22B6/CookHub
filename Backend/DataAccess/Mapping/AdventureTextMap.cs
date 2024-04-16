using DataAccess.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class AdventureTextMap : ClassMap<AdventureText>
{
    public AdventureTextMap()
    {
        Id(adventureText => adventureText.Id);
        Map(adventureText => adventureText.Text);
        References<Recipe>(adventureText => adventureText.Recipe);
    }
}