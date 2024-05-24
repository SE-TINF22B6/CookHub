using Contracts.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class RecipeIngredientsMap : ClassMap<RecipeIngredient>
{
    public RecipeIngredientsMap()
    {
        CompositeId()
            .KeyReference(x => x.Recipe, "recipe_id")
            .KeyReference(x => x.Ingredient, part => part.Not.Lazy(),"ingredient_id");
        Map(x => x.Quantity);
        Map(x => x.UnitOfMeasure);
    }
}