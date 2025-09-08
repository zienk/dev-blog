using DevBlog.Api.Authorization;
using DevBlog.Api.Extensions;
using DevBlog.Api.Filters;
using DevBlog.Api.Services;
using DevBlog.Core.ConfigOptions;
using DevBlog.Core.Entities.Identity;
using DevBlog.Core.Models.Content;
using DevBlog.Core.SeedWorks;
using DevBlog.Infrastructure.Data;
using DevBlog.Infrastructure.Repositories;
using DevBlog.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Get the connection string from configuration (json)
var configuration = builder.Configuration; 
var connectionString = configuration.GetConnectionString("DefaultConnection");

var DevCorsPolicy = "DevCorsPolicy";

// Add custom authorization handlers and policy provider
builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();
builder.Services.AddScoped<IAuthorizationHandler, PermissionAuthorizationHandler>();

// Config DbContext and ASP.NET Core Identity
builder.Services.AddDbContext<DevBlogContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddIdentity<AppUser, AppRole>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<DevBlogContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Password settings
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // User settings
    options.User.AllowedUserNameCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = false;
});

// Add services to the container.

// Base Repositories and Unit of Work
builder.Services.AddScoped(typeof(IRepository<,>), typeof(RepositoryBase<,>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Business services and repositories
var services = typeof(PostRepository).Assembly.GetTypes()
    .Where(x => x.GetInterfaces().Any(i => i.Name == typeof(IRepository<,>).Name) 
                && !x.IsAbstract && x.IsClass && !x.IsGenericType);

foreach (var service in services)
{
    var allInterfaces = service.GetInterfaces();
    var directInterfaces = allInterfaces.Except(allInterfaces.SelectMany(i => i.GetInterfaces())).FirstOrDefault();
    if (directInterfaces != null)
    {
        builder.Services.Add(new ServiceDescriptor(directInterfaces, service, ServiceLifetime.Scoped));
    }
}

// Auto Mapper
builder.Services.AddAutoMapper(typeof(PostInListDto));

// AUTHENTICATION AND AUTHORIZATION
// Register Configure JWT Token Settings read from appsettings.json
builder.Services.Configure<JwtTokenSettings>(configuration.GetSection("JwtTokenSettings"));

// Register SignInManager and UserManager for AuthController
builder.Services.AddScoped<SignInManager<AppUser>, SignInManager<AppUser>>();
builder.Services.AddScoped<UserManager<AppUser>, UserManager<AppUser>>();

// Register TokenService for AuthController
builder.Services.AddScoped<ITokenService, TokenService>();

// Register RoleManager for seeding roles
builder.Services.AddScoped<RoleManager<AppRole>, RoleManager<AppRole>>();

//Default config for ASP.NET Core
builder.Services.AddControllers();

// CORS 
builder.Services.AddCors(options =>
{
    options.AddPolicy(DevCorsPolicy, builder =>
    {
        builder.AllowAnyMethod()
               .AllowAnyHeader()
               .WithOrigins(configuration["AllowedOrigins"])
               .AllowCredentials();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.CustomOperationIds(apiDesc =>
    {
        return apiDesc.TryGetMethodInfo(out MethodInfo methodInfo) ? methodInfo.Name : null;
    });
    c.SwaggerDoc("AdminAPI", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Version = "v1",
        Title = "API for Administrators",
        Description = "API for DevBlog core domain. This domain keeps track of campaigns, campaign rules, and campaign execution."
    });
    c.ParameterFilter<SwaggerNullableParameterFilter>();
});

// Enable Authentication
builder.Services.AddAuthentication(o =>
{
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;

    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = configuration["JwtTokenSettings:Issuer"],
        ValidAudience = configuration["JwtTokenSettings:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtTokenSettings:Key"]))
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("AdminAPI/swagger.json", "AdminAPI");
        c.DisplayOperationId();
        c.DisplayRequestDuration();
    });
}

app.UseHttpsRedirection();

app.UseCors(DevCorsPolicy);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

// Seeding Data
app.MigrateDatabase();

app.Run();
