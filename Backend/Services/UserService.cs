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

    public User? GetUserByEmail(string email) => _repository.Get(email);

    public bool TryValidateUserData(string email, string password)
    {
        var user = _repository.Get(email);
        return user != null && user.PasswordHash == password;
    }

    public void LikeRecipe(User user, Recipe recipe)
    {
        user.LikedRecipes.Add(recipe);
        _repository.Update(user);
    }

    public void CreateTestUser()
        => _repository.Create(new User
        {
            Email = "admin@cookhub.com",
            PasswordHash = "password",
            Name = "Carlos",
            ProfilePicture = "7800de47-3004-495a-bdb5-55a22e3ed9a3.png"
        });
}