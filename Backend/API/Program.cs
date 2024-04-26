using DataAccess.Entities;
using DataAccess.Repository;
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
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// dependency injection:
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<RecipeService>();
builder.Services.AddTransient<IngredientService>();
builder.Services.AddTransient<IRepository<User>, UserRepository>();
builder.Services.AddTransient<IRepository<Recipe>, RecipeRepository>();
builder.Services.AddTransient<IRepository<Ingredient>, IngredientRepository>();
builder.Services.AddTransient<IRepository<Authentication>, AuthenticationRepository>();
builder.Services.AddSingleton(DataAccess.DataAccess.CreateSessionFactory("Server=localhost;Port=5432;User Id=postgres;Password=password;Database=cookhub;"));

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

app.UseAuthorization();

app.MapControllers();

app.Run();