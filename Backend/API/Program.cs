using Contracts.Entities;
using DataAccess.Repository;
using OpenAI;
using OpenAI.Managers;
using Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("default", policy =>
    {
        policy.SetIsOriginAllowed(url => new Uri(url).Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var noApiToken = false;

if (string.IsNullOrEmpty(ConfigService.Config.OpenAiToken))
{
    Console.Error.Write("No OpenAI API token specified. Please enter the API token in the /Backend/config.json file.");
    noApiToken = true;
}

// dependency injection:
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<RecipeService>();
builder.Services.AddTransient<IngredientService>();
builder.Services.AddTransient<AdventurizeService>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IRecipeRepository, RecipeRepository>();
builder.Services.AddTransient<IRepository<Ingredient>, IngredientRepository>();
var sessionFactory = DataAccess.DataAccess.CreateSessionFactory(ConfigService.Config.DatabaseConnectionString);
builder.Services.AddSingleton(sessionFactory);
builder.Services.AddSingleton(new OpenAIService(new OpenAiOptions
{
    ApiKey = noApiToken? "no api token specified" : ConfigService.Config.OpenAiToken
}));
builder.Services.AddSingleton<Dictionary<string, int>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("default");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCookiePolicy();
app.UseAuthorization();

app.MapControllers();

CreateExampleData();

app.Run();

return;

void CreateExampleData()
{
    var userService = app.Services.GetService<UserService>()!;
    var recipeService = app.Services.GetService<RecipeService>()!;

    if (userService.GetUserByEmail("admin@cookhub.com") == null)
    {
        userService.CreateTestUser();
    }

    if (!recipeService.GetAllRecipes().Exists(recipe => recipe.Name == "Pizza Margherita"))
    {
        recipeService.CreateExampleRecipes();
        var testUser = userService.GetUserByEmail("admin@cookhub.com")!;
        userService.LikeRecipe(testUser, recipeService.GetRecipeById(1)!);
        userService.LikeRecipe(testUser, recipeService.GetRecipeById(2)!);
    }

    if (recipeService.GetRecipeById(1)?.AdventureTexts.Count == 0)
    {
        recipeService.CreateExampleAdventureTexts();
    }
}