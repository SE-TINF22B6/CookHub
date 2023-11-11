namespace DataAccess.Entities;

public class User
{
    public virtual string Email { get; set; }
    public virtual string PasswordHash { get; set; }
}