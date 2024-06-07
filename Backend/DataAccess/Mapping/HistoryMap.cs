using Contracts.Entities;
using FluentNHibernate.Mapping;

namespace DataAccess.Mapping;

public class HistoryMap : ClassMap<HistoryEntry>
{
    public HistoryMap()
    {
        CompositeId()
            .KeyReference(entry => entry.User, "user_id")
            .KeyReference(entry => entry.Recipe, part => part.Not.Lazy(), "recipe_id");
        Map(entry => entry.Time);
    }
}