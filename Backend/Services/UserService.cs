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
    
    public static bool TrySaveProfilePicture(string base64Image)
    {
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

        const string folderPath = "wwwroot/images/profile-pictures";
        var filePath = $"{folderPath}/{Guid.NewGuid()}.{fileExtension}";
        base64Image = base64Image.Split(',').Last();

        try
        {
            File.WriteAllBytes(filePath, Convert.FromBase64String(base64Image));
        }
        catch (Exception)
        {   // could not convert string or save image
            return false;
        }

        return true;
    }
}