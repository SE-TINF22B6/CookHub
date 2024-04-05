namespace DataAccess.Entities;

public class Authentication
{
    public virtual required string AuthToken { get; set; }
    public virtual required User User { get; set; }
}