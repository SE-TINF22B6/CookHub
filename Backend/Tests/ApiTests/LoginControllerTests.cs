using API.Controllers;
using API.Models;
using DataAccess.Entities;
using DataAccess.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using NSubstitute;
using Services;
using Xunit;

namespace Tests.ApiTests;

[Collection("TestDatabase")]
public class LoginControllerTests : IDisposable
{
    private readonly ISessionFactory _testDatabaseFactory;
    private readonly LoginController _loginController;
    private readonly Dictionary<string,string> _authTokens;
    private readonly UserService _userService;

    public LoginControllerTests()
    {
        _testDatabaseFactory = Tests.CreateTestDatabaseFactory();
        _authTokens = new Dictionary<string, string>();
        _userService = new UserService(new UserRepository(_testDatabaseFactory));
        _loginController = new LoginController(_userService, _authTokens)
        {
            ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext() }
        };
    }

    public void Dispose()
        => Tests.DisposeTestDatabase(_testDatabaseFactory);

    [Fact]
    public void CanLogIn()
    {
        // ARRANGE
        _userService.CreateTestUser();
        var loginData = new LoginDataModel
        {
            Email = "admin@cookhub.com",
            Password = "password"
        };

        // ACT
        var result = _loginController.Login(loginData);

        // ASSERT
        Assert.IsType<OkResult>(result);
        Assert.Single(_authTokens);
        var responseCookies = _loginController.Response.GetTypedHeaders().SetCookie;
        Assert.Contains(responseCookies, cookie => cookie.Value == _authTokens.Single().Key);
    }

    [Fact]
    public void RefuseWrongLoginData()
    {
        // ARRANGE
        var loginData = new LoginDataModel
        {
            Email = "blablabla",
            Password = "blabla"
        };
        
        // ACT
        var result = _loginController.Login(loginData);
        
        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Empty(_authTokens);
        var responseCookies = _loginController.Response.GetTypedHeaders().SetCookie;
        Assert.DoesNotContain(responseCookies, cookie => cookie.Name == "auth-token");
    }

    [Fact]
    public void CanLogOut()
    {
        // ARRANGE
        CanLogIn();
        var loginController = GetLoginControllerWithAuthTokenRequestCookie();

        // ACT
        loginController.LogOut();

        // ASSERT
        Assert.Empty(_authTokens);
        var responseCookies = loginController.Response.GetTypedHeaders().SetCookie;
        Assert.DoesNotContain(responseCookies, cookie => cookie.Name == "auth-token");
    }

    [Fact]
    public void CanRegisterNewUser()
    {
        // ARRANGE
        var registerData = new RegisterDataModel
        {
            Email = "test@example.com",
            Name = "TestUser",
            Password = "Test1234"
        };

        // ACT
        var result = _loginController.Register(registerData);
        
        // ASSERT
        Assert.IsType<OkResult>(result);
        var userInDatabase = _userService.GetUserByEmail(registerData.Email);
        Assert.NotNull(userInDatabase);
    }

    [Fact]
    public void AutomaticallyLogInAfterRegistration()
    {
        // ACT
        CanRegisterNewUser();
        
        // ASSERT
        Assert.Single(_authTokens);
        var responseCookies = _loginController.Response.GetTypedHeaders().SetCookie;
        Assert.Contains(responseCookies, cookie => cookie.Value == _authTokens.Single().Key);
    }

    [Fact]
    public void RefuseBadRegisterData()
    {
        // ARRANGE
        _userService.CreateTestUser();
        var registerData = new RegisterDataModel
        {
            Email = "admin@cookhub.com",
            Name = "yo",
            Password = "hallo"
        };

        // ACT
        var result = _loginController.Register(registerData);

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);

        var responseCookies = _loginController.Response.GetTypedHeaders().SetCookie;
        Assert.DoesNotContain(responseCookies, cookie => cookie.Name == "auth-token");
        Assert.Empty(_authTokens);

        var message = (result as BadRequestObjectResult)!.Value!.ToString()!;
        Assert.Contains("Invalid username.", message);
        Assert.Contains("Invalid password.", message);
        Assert.Contains("This email is already registered.", message);
    }

    [Fact]
    public void CanReturnLoggedInUser()
    {
        // ARRANGE
        CanLogIn();
        var loginController = GetLoginControllerWithAuthTokenRequestCookie();

        // ACT
        var result = loginController.IsLoggedIn();

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var returnedUserData = (result as OkObjectResult)!.Value;
        Assert.IsType<User>(returnedUserData);
    }

    [Fact]
    public void CanReturnThatUserIsNotLoggedIn()
    {
        // ACT
        var result = _loginController.IsLoggedIn();

        // ASSERT
        Assert.IsType<NotFoundObjectResult>(result);
        var message = (result as NotFoundObjectResult)!.Value!.ToString()!;
        Assert.Equal("Not logged in", message);
    }

    private LoginController GetLoginControllerWithAuthTokenRequestCookie()
    {
        var httpContextMock = Substitute.For<HttpContext>();
        httpContextMock.Request.Cookies["auth-token"].Returns(_authTokens.Single().Key);

        return new LoginController(_userService, _authTokens)
        {
            ControllerContext = new ControllerContext { HttpContext = httpContextMock }
        };
    }
}