namespace DataAccess.Entities;

public class User
{
    public virtual required string Email { get; set; }
    public virtual required string PasswordHash { get; set; }
}