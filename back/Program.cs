using back.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using back.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("MySqlConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<AppDbContext>(options => 
options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
// builder.Services.AddIdentityCore<AppUser>(o =>
// {
//     o.Password.RequireNonAlphanumeric = false;
// })
// .AddRoles<IdentityRole>()
// .AddEntityFrameworkStores<AppDbContext>()
// .AddSignInManager<SignInManager<AppUser>>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// using var scope = app.Services.CreateScope();
// var services = scope.ServiceProvider;
// try
// {
//     var userManager = services.GetRequiredService<UserManager<AppUser>>();
//     var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

//     await Seed.SeedAdminAsync(userManager, roleManager);

//     Console.WriteLine("-------->Data seeded successfully.");
// }
// catch (Exception ex)
// {
//     Console.WriteLine(ex.Message);
// }

app.Run();
