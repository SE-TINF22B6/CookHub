using DataAccess.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class RecipeIngredientsMap : ClassMap<RecipeIngredient>
{
    public RecipeIngredientsMap()
    {
        CompositeId()
            .KeyReference(x => x.Recipe)
            .KeyReference(x => x.Ingredient);
        Map(x => x.Quantity);
        Map(x => x.UnitOfMeasure);
    }
}