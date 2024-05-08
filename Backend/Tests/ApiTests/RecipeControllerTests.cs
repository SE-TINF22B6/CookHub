using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Services;
using Xunit;

namespace Tests.ApiTests;

public class RecipeControllerTests
{
    private readonly RecipeController _recipeController = new(null!, null!);
    
    [Fact]
    public void CanUploadRecipeImage()
    {
        // ARRANGE
        const string folderPath = "wwwroot/images/recipes";
        const string base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAFCAIAAAAVLyF7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVBhXhcpBCgAwDALB/v/T1qKIBEL3EEbISQCs3R68DdZm/oyEYZb5btRIn281rAngAmE2d4kg2D28AAAAAElFTkSuQmCC";
        if (Directory.Exists(folderPath))
        {
            Directory.Delete(folderPath, true);
        }
        Directory.CreateDirectory(folderPath);

        // ACT
        var result = _recipeController.UploadRecipeImage(base64Image);

        // ASSERT
        Assert.IsType<OkResult>(result);
        Assert.Single(Directory.GetFiles(folderPath));

        // CLEAN UP
        Directory.Delete(folderPath, true);
    }
}