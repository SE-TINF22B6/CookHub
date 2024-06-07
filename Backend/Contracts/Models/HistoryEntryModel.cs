namespace Contracts.Models;

public class HistoryEntryModel
{
    public required RecipeModel Recipe { get; set; }
    public DateTime Time { get; set; }
}