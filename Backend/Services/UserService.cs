using System.Text.RegularExpressions;
using Contracts.Entities;
using DataAccess.Repository;

namespace Services;

/// <summary>
/// Class that handles user logic
/// </summary>
public partial class UserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }
    
    public IEnumerable<User> GetAllUsers()
    {
        return _repository.GetAll();
    }

    public void CreateUser(User user) => _repository.Create(user);

    public User? GetUserById(int id) => _repository.Get(id);

    public User? GetUserByEmail(string email) => _repository.GetByEmail(email);

    public bool TryValidateUserData(string email, string password, out User? user)
    {
        user = _repository.GetByEmail(email);
        return user != null && CryptoService.GetHash(password).SequenceEqual(user.PasswordHash);
    }

    public void LikeRecipe(User user, Recipe recipe)
    {
        user.LikedRecipes.Add(recipe);
        _repository.Update(user);
    }
    
    public void UnlikeRecipe(User user, Recipe recipe)
    {
        {
            var likedRecipe = user.LikedRecipes.FirstOrDefault(r => r.Id == recipe.Id);
            
            if (likedRecipe != null)
            {
                user.LikedRecipes.Remove(likedRecipe);
                _repository.Update(user);
            }
        }
    }

    
    public ICollection<Recipe>? GetLikedRecipesByUserId(int userId)
    {
        var user = _repository.Get(userId);
        return user?.LikedRecipes;
    }

    public void CreateTestUser()
        => _repository.Create(new User
        {
            Email = "admin@cookhub.com",
            PasswordHash = CryptoService.GetHash("password"),
            Name = "Carlos",
            ProfilePicture = "7800de47-3004-495a-bdb5-55a22e3ed9a3.png"
        });
    
    public static bool TrySaveProfilePicture(string base64Image, out string fileName)
    {
        fileName = "";

        if (base64Image.Length > 1_073_741_824) // = 1 GB
        {   // image is too large
            return false;
        }

        var mimeType = base64Image.Split(';')[0][5..];
        var fileExtension = mimeType switch
        {
            "image/png" => "png",
            "image/jpeg" => "jpg",
            "image/webp" => "webp",
            _ => ""
        };

        if (fileExtension == "")
        {   // invalid mime type
            return false;
        }

        const string folderPath = "wwwroot/images/profile-pictures/";
        fileName = $"{Guid.NewGuid()}.{fileExtension}";
        base64Image = base64Image.Split(',').Last();

        try
        {
            File.WriteAllBytes(folderPath + fileName, Convert.FromBase64String(base64Image));
        }
        catch (Exception)
        {   // could not convert string or save image
            return false;
        }

        return true;
    }

    public bool TryValidateRegisterData(string name, string email, string password, out string error)
    {
        error = string.Empty;

        if (!UsernameRegex().IsMatch(name))
            error += "Invalid username. ";

        if (!EmailRegex().IsMatch(email))
            error += "Invalid email. ";

        if (!PasswordRegex().IsMatch(password))
            error += "Invalid password. ";

        var existingUser = GetUserByEmail(email);

        if (existingUser != null)
            error += "This email is already registered. ";

        return error == string.Empty;
    }

    public bool TryChangeUsername(int userId, string newUsername, out string error)
    {
        if (!UsernameRegex().IsMatch(newUsername))
        {
            error = "Invalid username.";
            return false;
        }

        var user = GetUserById(userId);

        if (user == null)
        {
            error = $"Could not find user with id {userId}";
            return false;
        }

        user.Name = newUsername;
        _repository.Update(user);

        error = string.Empty;
        return true;
    }

    public bool TryChangePassword(int userId, string oldPassword, string newPassword, out string error)
    {
        if (!PasswordRegex().IsMatch(newPassword))
        {
            error = "New password is invalid.";
            return false;
        }

        var user = GetUserById(userId);

        if (user == null)
        {
            error = $"Could not find user with id {userId}";
            return false;
        }

        if (!CryptoService.GetHash(oldPassword).SequenceEqual(user.PasswordHash))
        {
            error = "Old password is invalid.";
            return false;
        }

        user.PasswordHash = CryptoService.GetHash(newPassword);
        _repository.Update(user);

        error = string.Empty;
        return true;
    }

    [GeneratedRegex("^[A-Za-z0-9_]{4,16}$")]
    private static partial Regex UsernameRegex();

    [GeneratedRegex(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,24}$")]
    private static partial Regex EmailRegex();

    [GeneratedRegex(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$")]
    private static partial Regex PasswordRegex();
}