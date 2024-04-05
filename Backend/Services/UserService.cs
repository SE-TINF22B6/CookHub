using DataAccess.Entities;
using DataAccess.Repository;

namespace Services;

/// <summary>
/// Class that handles user logic
/// </summary>
public class UserService
{
    private readonly IRepository<User> _repository;

    public UserService(IRepository<User> repository)
    {
        _repository = repository;
    }

    public bool TryValidateUserData(string email, string password)
    {
        var user = _repository.Get(email);
        return user != null && user.PasswordHash == password;
    }
}