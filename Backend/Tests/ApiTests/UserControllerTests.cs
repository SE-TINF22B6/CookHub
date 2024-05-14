using API.Controllers;
using DataAccess.Repository;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Services;
using Xunit;

namespace Tests.ApiTests;

[Collection("TestDatabase")]
public class UserControllerTests : IDisposable
{
    private readonly UserController _userController;
    private readonly ISessionFactory _testDatabaseFactory;

    public UserControllerTests()
    {
        _testDatabaseFactory = Tests.CreateTestDatabaseFactory();
        _userController = new UserController(new UserService(new UserRepository(_testDatabaseFactory)), new RecipeService(new RecipeRepository(_testDatabaseFactory)));
    }

    public void Dispose() => Tests.DisposeTestDatabase(_testDatabaseFactory);

    [Fact]
    public void CanUploadProfilePicture()
    {
        // ARRANGE
        const string folderPath = "wwwroot/images/profile-pictures";
        const string base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAFCAIAAAAVLyF7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVBhXhcpBCgAwDALB/v/T1qKIBEL3EEbISQCs3R68DdZm/oyEYZb5btRIn281rAngAmE2d4kg2D28AAAAAElFTkSuQmCC";
        if (Directory.Exists(folderPath))
        {
            Directory.Delete(folderPath, true);
        }
        Directory.CreateDirectory(folderPath);

        // ACT
        var result = _userController.UploadProfilePicture(base64Image);

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var filesInFolder = Directory.GetFiles(folderPath);
        Assert.Single(filesInFolder);
        var returnedFileName = (result as OkObjectResult)!.Value!.ToString()!;
        Assert.Contains(returnedFileName, filesInFolder.Single());

        // CLEAN UP
        Directory.Delete(folderPath, true);
    }
    
    [Fact]
    public void DontSaveBadBase64Image()
    {
        // ARRANGE
        const string folderPath = "wwwroot/images/profile-pictures";
        if (Directory.Exists(folderPath))
        {
            Directory.Delete(folderPath, true);
        }
        Directory.CreateDirectory(folderPath);
        
        // ACT
        var result = _userController.UploadProfilePicture("blabla");
        
        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Empty(Directory.GetFiles(folderPath));
        
        // CLEAN UP
        Directory.Delete(folderPath, true);
    }
}