using API.Controllers;

namespace Tests;

public class WeatherControllerTests
{
    [Fact]
    public void GetRequestShouldReturnResponse()
    {
        var weatherForecastController = new WeatherForecastController(null);
        var response = weatherForecastController.Get();
        Assert.NotEmpty(response);
    }
}