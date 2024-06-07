using Contracts.Models;

namespace Contracts.Entities;

public class HistoryEntry
{
    public virtual required User User { get; set; }
    public virtual required Recipe Recipe { get; set; }
    public virtual DateTime Time { get; set; } = DateTime.Now;

    // Equals(...) and GetHashCode(...) method must be overridden for NHibernate
    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != this.GetType()) return false;
        return Equals((HistoryEntry)obj);
    }

    public override int GetHashCode() => HashCode.Combine(User, Recipe, Time);

    public virtual HistoryEntryModel ToModel()
        => new()
        {
            Recipe = Recipe.ToModel(User.Id),
            Time = Time
        };
}