using Contracts.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class IngredientMap : ClassMap<Ingredient>
{
    public IngredientMap()
    {
        Id(ingredient => ingredient.Id);
        Map(ingredient => ingredient.Name).Not.Nullable();
    }
}