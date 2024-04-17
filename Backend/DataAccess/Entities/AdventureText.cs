namespace DataAccess.Entities;

public class AdventureText
{
    public virtual int Id { get; set; }
    public virtual required string Text { get; set; }
    public virtual required Recipe Recipe { get; set; }
}