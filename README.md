# DevBlog - Nền tảng chia sẻ kiến thức cho Developer Việt Nam 🚀

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![Angular](https://img.shields.io/badge/Angular-20.2-DD0031?logo=angular)](https://angular.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Một nền tảng blog chuyên nghiệp được xây dựng để chia sẻ kiến thức về lập trình, công nghệ mới, và kinh nghiệm thực tế cho cộng đồng developer Việt Nam.

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
- [Tính năng chính](#-tính-năng-chính)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication & Authorization](#-authentication--authorization)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [Tài liệu học tập](#-tài-liệu-học-tập)

## 🎯 Giới thiệu

**DevBlog** là một hệ thống blog được thiết kế theo kiến trúc **Clean Architecture** và **Domain-Driven Design (DDD)**, giúp developers Việt Nam:

- 📝 **Chia sẻ kiến thức**: Viết và chia sẻ bài viết về công nghệ, kinh nghiệm lập trình
- 🔍 **Học hỏi kinh nghiệm**: Tìm kiếm và học từ các bài viết chất lượng cao
- 💬 **Tương tác cộng đồng**: Comment, thảo luận và networking với các developers khác
- 🏆 **Xây dựng profile**: Tạo portfolio cá nhân thông qua các bài viết chất lượng

### Tại sao chọn DevBlog?

- ✅ **Kiến trúc sạch**: Clean Architecture giúp code dễ maintain và scale
- ✅ **Performance cao**: Tối ưu hóa với caching, lazy loading
- ✅ **Bảo mật**: JWT authentication, role-based authorization
- ✅ **UI/UX hiện đại**: Angular + CoreUI cho trải nghiệm mượt mà
- ✅ **API First**: RESTful API có thể tích hợp với mobile app

## 🏗 Kiến trúc hệ thống

### Clean Architecture Layers

```
┌─────────────────────────────────────────────────┐
│                  Presentation                   │
│          (Angular UI + WebApp MVC)              │
├─────────────────────────────────────────────────┤
│                   API Layer                     │
│            (RESTful Web API)                    │
├─────────────────────────────────────────────────┤
│              Application Core                   │
│        (Business Logic & Interfaces)            │
├─────────────────────────────────────────────────┤
│              Infrastructure                     │
│    (Data Access, External Services)             │
└─────────────────────────────────────────────────┘
```

### Giải thích các Layer:

#### 1. **Presentation Layer** (Tầng giao diện)
- **Angular Admin UI**: Giao diện quản trị sử dụng Angular 20 + CoreUI
- **WebApp MVC**: Giao diện người dùng sử dụng ASP.NET Core MVC với Razor Pages

#### 2. **API Layer** (Tầng API)
- **RESTful API**: Cung cấp endpoints cho cả Admin và Public
- **Authentication**: JWT Bearer token
- **Authorization**: Policy-based với custom permissions

#### 3. **Core Layer** (Tầng nghiệp vụ)
- **Entities**: Domain models (Post, User, Category, etc.)
- **Interfaces**: Repository patterns, Unit of Work
- **Business Logic**: Services, Specifications
- **DTOs**: Data Transfer Objects cho API

#### 4. **Infrastructure Layer** (Tầng hạ tầng)
- **Entity Framework Core**: ORM cho data access
- **Identity**: ASP.NET Core Identity cho authentication
- **External Services**: Email, File storage, etc.

## 🛠 Công nghệ sử dụng

### Backend (.NET 8)
- **ASP.NET Core Web API**: RESTful API framework
- **Entity Framework Core**: ORM với Code-First approach
- **ASP.NET Core Identity**: Authentication & User management
- **AutoMapper**: Object mapping
- **FluentValidation**: Input validation
- **Swagger/OpenAPI**: API documentation
- **JWT Bearer**: Token-based authentication
- **Serilog**: Structured logging

### Frontend (Angular 20)
- **Angular 20**: SPA framework
- **CoreUI 5.5**: Admin template
- **PrimeNG**: UI components library
- **RxJS**: Reactive programming
- **NgRx** (optional): State management
- **Chart.js**: Data visualization
- **NSwag**: TypeScript client generation từ OpenAPI

### Database & Tools
- **SQL Server**: Primary database
- **Redis** (optional): Caching layer
- **Docker**: Containerization
- **GitHub Actions**: CI/CD pipeline

## 📁 Cấu trúc dự án

```
DevBlog/
├── src/                              # Source code chính
│   ├── DevBlog.Api/                 # Web API project
│   │   ├── Controllers/             # API Controllers
│   │   │   ├── AdminApi/           # Admin endpoints
│   │   │   └── PublicApi/          # Public endpoints
│   │   ├── Services/                # API services (JWT, etc.)
│   │   ├── Filters/                 # Action filters
│   │   ├── Middleware/              # Custom middleware
│   │   └── Program.cs               # Entry point
│   │
│   ├── DevBlog.Core/                # Core business logic
│   │   ├── Entities/                # Domain entities
│   │   │   ├── Blog/               # Blog-related entities
│   │   │   └── Identity/           # User, Role entities
│   │   ├── Models/                  # DTOs và ViewModels
│   │   ├── Repositories/            # Repository interfaces
│   │   ├── SeedWorks/              # Base classes, constants
│   │   └── Specifications/          # Query specifications
│   │
│   ├── DevBlog.Infrastructure/     # Infrastructure implementation
│   │   ├── Data/                   # DbContext, Migrations
│   │   ├── Repositories/           # Repository implementations
│   │   ├── Services/               # External service integrations
│   │   └── Identity/               # Identity configuration
│   │
│   └── DevBlog.WebApp/             # MVC Web application
│       ├── Controllers/            # MVC Controllers
│       ├── Views/                  # Razor views
│       ├── wwwroot/               # Static files
│       └── Areas/                 # Area-based organization
│
├── dev-blog-admin-ui/              # Angular Admin UI
│   ├── src/
│   │   ├── app/                   # Angular application
│   │   │   ├── api/              # Generated API clients
│   │   │   ├── views/            # Page components
│   │   │   ├── shared/           # Shared components
│   │   │   └── core/             # Core services
│   │   ├── assets/               # Images, fonts
│   │   └── environments/         # Environment configs
│   ├── angular.json              # Angular configuration
│   └── package.json              # NPM dependencies
│
├── tests/                         # Unit & Integration tests
│   ├── DevBlog.Api.Tests/
│   ├── DevBlog.Core.Tests/
│   └── DevBlog.Infrastructure.Tests/
│
├── docs/                          # Documentation
├── scripts/                       # Build & deployment scripts
├── DevBlog.sln                   # Solution file
└── README.md                     # This file
```

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống

- ✅ [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- ✅ [Node.js 20.x hoặc 22.x](https://nodejs.org/)
- ✅ [SQL Server 2019+](https://www.microsoft.com/sql-server/) hoặc [SQL Server Express](https://www.microsoft.com/sql-server/sql-server-express)
- ✅ [Visual Studio 2022](https://visualstudio.microsoft.com/) hoặc [VS Code](https://code.visualstudio.com/)
- ✅ [Git](https://git-scm.com/)

### Bước 1: Clone repository

```bash
git clone https://github.com/yourusername/DevBlog.git
cd DevBlog
```

### Bước 2: Cài đặt Backend

#### 2.1. Cấu hình Database Connection

Mở file `appsettings.json` trong `src/DevBlog.Api/` và cập nhật connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=DevBlogDb;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

#### 2.2. Chạy Database Migrations

```bash
cd src/DevBlog.Api
dotnet ef database update
```

#### 2.3. Seed dữ liệu mẫu (optional)

```bash
dotnet run --seed
```

#### 2.4. Chạy API

```bash
dotnet run
```

API sẽ chạy tại: `https://localhost:7001` (hoặc port được configure)

### Bước 3: Cài đặt Frontend (Angular Admin)

#### 3.1. Cài đặt dependencies

```bash
cd dev-blog-admin-ui
npm install
```

#### 3.2. Generate API Client từ Swagger

```bash
npm run nswag-admin
```

#### 3.3. Cấu hình API endpoint

Mở file `src/environments/environment.ts` và cập nhật:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001'
};
```

#### 3.4. Chạy Angular development server

```bash
npm start
```

Admin UI sẽ mở tại: `http://localhost:4200`

### Bước 4: Chạy Web Application (optional)

```bash
cd src/DevBlog.WebApp
dotnet run
```

WebApp sẽ chạy tại: `https://localhost:7002`

## ⚡ Tính năng chính

### 👤 User Management
- Đăng ký/Đăng nhập với email confirmation
- Quản lý profile và avatar
- Password reset qua email
- Two-factor authentication (2FA)

### 📝 Blog Management
- **CRUD Posts**: Tạo, sửa, xóa bài viết với rich text editor
- **Categories**: Phân loại bài viết theo chủ đề
- **Tags**: Gắn tag cho bài viết để dễ tìm kiếm
- **Draft/Publish**: Lưu nháp và xuất bản bài viết
- **SEO Optimization**: Meta tags, URL slug tự động

### 💬 Interaction Features
- Comment system với nested replies
- Like/Bookmark bài viết
- Share lên social media
- Follow authors

### 🔍 Search & Filter
- Full-text search
- Filter theo category, tag, author
- Sort theo date, views, likes

### 📊 Analytics (Admin)
- Dashboard với charts
- Post views tracking
- User engagement metrics
- Popular posts/categories

### 🔐 Security Features
- JWT token với refresh token
- Role-based access control (RBAC)
- Permission-based authorization
- API rate limiting
- XSS/CSRF protection

## 📖 API Documentation

### Authentication Flow

#### 1. Login
```http
POST /api/admin/auth
Content-Type: application/json

{
  "username": "admin@devblog.com",
  "password": "Admin@123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "fdb8fdbecf1d03ce5e6125c067733c0d51de209c...",
  "expiresIn": 3600
}
```

#### 2. Use Token
```http
GET /api/admin/posts
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Main API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **Auth** |
| POST | `/api/admin/auth` | Login | No |
| POST | `/api/admin/token/refresh` | Refresh token | Yes |
| POST | `/api/admin/token/revoke` | Logout | Yes |
| **Posts** |
| GET | `/api/posts` | Get public posts | No |
| GET | `/api/posts/{id}` | Get post detail | No |
| POST | `/api/admin/post` | Create post | Yes (Author) |
| PUT | `/api/admin/post/{id}` | Update post | Yes (Author) |
| DELETE | `/api/admin/post` | Delete posts | Yes (Admin) |
| **Categories** |
| GET | `/api/categories` | Get all categories | No |
| POST | `/api/admin/post-category` | Create category | Yes (Admin) |
| PUT | `/api/admin/post-category/{id}` | Update category | Yes (Admin) |
| **Users** |
| GET | `/api/admin/user/paging` | Get users list | Yes (Admin) |
| POST | `/api/admin/user` | Create user | Yes (Admin) |
| PUT | `/api/admin/user/{id}` | Update user | Yes (Admin) |
| **Roles & Permissions** |
| GET | `/api/admin/role/paging` | Get roles | Yes (Admin) |
| POST | `/api/admin/role` | Create role | Yes (Admin) |
| PUT | `/api/admin/role/permissions` | Update permissions | Yes (Admin) |

### Swagger/OpenAPI

Khi chạy API ở development mode, bạn có thể truy cập Swagger UI tại:
```
https://localhost:7001/swagger
```

## 🗄 Database Schema

### Core Tables

#### Users Table
```sql
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    UserName NVARCHAR(256) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    Avatar NVARCHAR(500),
    IsActive BIT,
    DateCreated DATETIME2,
    -- ASP.NET Identity fields...
)
```

#### Posts Table
```sql
CREATE TABLE Posts (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Title NVARCHAR(500) NOT NULL,
    Slug VARCHAR(500) NOT NULL UNIQUE,
    Content NVARCHAR(MAX),
    Description NVARCHAR(1000),
    Thumbnail NVARCHAR(500),
    CategoryId UNIQUEIDENTIFIER,
    AuthorUserId UNIQUEIDENTIFIER,
    ViewCount INT DEFAULT 0,
    Status INT, -- Draft, Published, Archived
    DateCreated DATETIME2,
    DateModified DATETIME2,
    FOREIGN KEY (CategoryId) REFERENCES PostCategories(Id),
    FOREIGN KEY (AuthorUserId) REFERENCES Users(Id)
)
```

#### PostCategories Table
```sql
CREATE TABLE PostCategories (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(250) NOT NULL,
    Slug VARCHAR(250) NOT NULL UNIQUE,
    ParentId UNIQUEIDENTIFIER NULL,
    SeoDescription NVARCHAR(160),
    SortOrder INT,
    IsActive BIT,
    DateCreated DATETIME2,
    FOREIGN KEY (ParentId) REFERENCES PostCategories(Id)
)
```

### Relationships

```mermaid
erDiagram
    Users ||--o{ Posts : "writes"
    Posts }o--|| PostCategories : "belongs to"
    Posts ||--o{ PostTags : "has"
    Tags ||--o{ PostTags : "tagged in"
    Posts ||--o{ Comments : "has"
    Users ||--o{ Comments : "writes"
    Users ||--o{ UserRoles : "has"
    Roles ||--o{ UserRoles : "assigned to"
    Roles ||--o{ RoleClaims : "has permissions"
```

## 🔐 Authentication & Authorization

### JWT Configuration

Trong `appsettings.json`:

```json
{
  "JwtSettings": {
    "SecretKey": "your-secret-key-min-32-characters-long",
    "Issuer": "DevBlog",
    "Audience": "DevBlogUsers",
    "ExpiryMinutes": 60
  }
}
```

### Permission System

Hệ thống sử dụng permission-based authorization với các permissions được định nghĩa trong `Permissions.cs`:

```csharp
public static class Permissions
{
    public static class Posts
    {
        public const string View = "Permissions.Posts.View";
        public const string Create = "Permissions.Posts.Create";
        public const string Edit = "Permissions.Posts.Edit";
        public const string Delete = "Permissions.Posts.Delete";
    }
    // More permissions...
}
```

### Roles mặc định

1. **Admin**: Full access
2. **Editor**: Manage posts và categories
3. **Author**: Create và edit own posts
4. **User**: Read và comment

## 🚢 Deployment

### Docker Deployment

#### 1. Build Docker images

```bash
# Build API image
docker build -f src/DevBlog.Api/Dockerfile -t devblog-api .

# Build Angular image
docker build -f dev-blog-admin-ui/Dockerfile -t devblog-admin .
```

#### 2. Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: mcr.microsoft.com/mssql/server:2019-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=Your@Password123
    ports:
      - "1433:1433"
    volumes:
      - sql_data:/var/opt/mssql

  api:
    image: devblog-api
    depends_on:
      - db
    environment:
      - ConnectionStrings__DefaultConnection=Server=db;Database=DevBlogDb;User=sa;Password=Your@Password123;
    ports:
      - "5000:80"

  admin:
    image: devblog-admin
    depends_on:
      - api
    ports:
      - "4200:80"

volumes:
  sql_data:
```

#### 3. Run với Docker Compose

```bash
docker-compose up -d
```

### Azure Deployment

1. **Azure SQL Database**: Tạo database trên Azure
2. **Azure App Service**: Deploy API và WebApp
3. **Azure Static Web Apps**: Deploy Angular SPA
4. **Azure Blob Storage**: Lưu trữ images/files
5. **Azure CDN**: Tối ưu static content delivery

### CI/CD với GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: '8.0.x'
    
    - name: Build and publish API
      run: |
        dotnet build
        dotnet publish -c Release -o ./publish
    
    - name: Deploy to Azure App Service
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'devblog-api'
        publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
        package: './publish'
```

## 🤝 Contributing

Chúng tôi luôn chào đón contributions từ cộng đồng!

### Development Process

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

### Coding Standards

- **C# Code**: Follow [Microsoft C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions)
- **TypeScript/Angular**: Follow [Angular Style Guide](https://angular.io/guide/styleguide)
- **Git Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/)

### Testing

```bash
# Run backend tests
dotnet test

# Run frontend tests
cd dev-blog-admin-ui
npm test

# Run e2e tests
npm run e2e
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Database connection failed
- Kiểm tra SQL Server service đang chạy
- Verify connection string trong appsettings.json
- Ensure SQL Server authentication mode

#### 2. CORS errors in Angular
- Check CORS configuration trong Program.cs
- Verify API URL trong environment.ts

#### 3. JWT token invalid
- Check token expiry time
- Verify secret key configuration
- Ensure clock sync between client/server

#### 4. npm install fails
- Clear npm cache: `npm cache clean --force`
- Delete node_modules và package-lock.json
- Run `npm install` again

## 🗺️ Roadmap & Implementation Guide

### Các tính năng sắp tới (Upcoming Features)

#### Phase 1: Core Enhancements (Q1 2025)

##### 1. 🔍 **Advanced Search với Elasticsearch**
**Mục tiêu**: Tìm kiếm full-text nhanh và chính xác hơn

**Implementation Steps**:
```csharp
// 1. Install packages
// dotnet add package NEST
// dotnet add package Elasticsearch.Net

// 2. Create Elasticsearch service
public interface IElasticsearchService
{
    Task<ISearchResponse<PostDocument>> SearchPostsAsync(string query);
    Task IndexPostAsync(Post post);
    Task DeletePostAsync(Guid postId);
}

// 3. Implementation trong Infrastructure layer
public class ElasticsearchService : IElasticsearchService
{
    private readonly IElasticClient _elasticClient;
    
    public ElasticsearchService(IConfiguration configuration)
    {
        var settings = new ConnectionSettings(new Uri(configuration["Elasticsearch:Uri"]))
            .DefaultIndex("devblog-posts");
        _elasticClient = new ElasticClient(settings);
    }
    
    // Implement methods...
}

// 4. Register trong Program.cs
builder.Services.AddSingleton<IElasticsearchService, ElasticsearchService>();
```

**Tasks**:
- [ ] Setup Elasticsearch Docker container
- [ ] Create PostDocument DTO for indexing
- [ ] Implement indexing on post create/update
- [ ] Create search API endpoint
- [ ] Update Angular UI với search suggestions

##### 2. 💬 **Real-time Chat với SignalR**
**Mục tiêu**: Chat real-time giữa users

**Implementation Guide**:
```csharp
// 1. Create Chat Hub
public class ChatHub : Hub
{
    private readonly IUserConnectionManager _userConnectionManager;
    
    public async Task SendMessage(string receiverId, string message)
    {
        var senderId = Context.UserIdentifier;
        await Clients.User(receiverId).SendAsync("ReceiveMessage", senderId, message);
        
        // Save to database
        await _chatService.SaveMessageAsync(senderId, receiverId, message);
    }
    
    public override async Task OnConnectedAsync()
    {
        await _userConnectionManager.AddConnection(Context.UserIdentifier, Context.ConnectionId);
        await base.OnConnectedAsync();
    }
}

// 2. Configure trong Program.cs
builder.Services.AddSignalR();
app.MapHub<ChatHub>("/chathub");

// 3. Angular client
// npm install @microsoft/signalr
import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
    .withUrl('/chathub', { accessTokenFactory: () => this.token })
    .build();
```

**Database Schema**:
```sql
CREATE TABLE ChatMessages (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    SenderId UNIQUEIDENTIFIER NOT NULL,
    ReceiverId UNIQUEIDENTIFIER NOT NULL,
    Message NVARCHAR(1000) NOT NULL,
    IsRead BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (SenderId) REFERENCES Users(Id),
    FOREIGN KEY (ReceiverId) REFERENCES Users(Id)
);
```

##### 3. 📧 **Email Newsletter System**
**Mục tiêu**: Gửi newsletter cho subscribers

**Implementation**:
```csharp
// 1. Create Newsletter entities
public class Subscriber
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public bool IsActive { get; set; }
    public DateTime SubscribedAt { get; set; }
    public string UnsubscribeToken { get; set; }
}

public class Newsletter
{
    public Guid Id { get; set; }
    public string Subject { get; set; }
    public string Content { get; set; }
    public DateTime ScheduledAt { get; set; }
    public NewsletterStatus Status { get; set; }
}

// 2. Email service với SendGrid
public class EmailService : IEmailService
{
    private readonly ISendGridClient _sendGridClient;
    
    public async Task SendNewsletterAsync(Newsletter newsletter, List<Subscriber> subscribers)
    {
        var msg = new SendGridMessage();
        msg.SetFrom("newsletter@devblog.vn", "DevBlog");
        msg.AddTos(subscribers.Select(s => new EmailAddress(s.Email)).ToList());
        msg.SetSubject(newsletter.Subject);
        msg.AddContent(MimeType.Html, newsletter.Content);
        
        await _sendGridClient.SendEmailAsync(msg);
    }
}

// 3. Background job với Hangfire
public class NewsletterJob
{
    public async Task ProcessScheduledNewsletters()
    {
        var newsletters = await _newsletterService.GetScheduledNewslettersAsync();
        // Process and send...
    }
}
```

#### Phase 2: Social Features (Q2 2025)

##### 4. 👥 **Social Login (OAuth 2.0)**
**Providers**: Google, GitHub, Facebook

**Implementation Steps**:
```csharp
// 1. Configure OAuth trong Program.cs
builder.Services.AddAuthentication()
    .AddGoogle(options =>
    {
        options.ClientId = configuration["Authentication:Google:ClientId"];
        options.ClientSecret = configuration["Authentication:Google:ClientSecret"];
    })
    .AddGitHub(options =>
    {
        options.ClientId = configuration["Authentication:GitHub:ClientId"];
        options.ClientSecret = configuration["Authentication:GitHub:ClientSecret"];
    });

// 2. External login controller
[HttpGet("external-login/{provider}")]
public IActionResult ExternalLogin(string provider, string returnUrl = null)
{
    var redirectUrl = Url.Action(nameof(ExternalLoginCallback), new { returnUrl });
    var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
    return Challenge(properties, provider);
}
```

##### 5. 🏆 **Gamification System**
**Features**: Points, Badges, Leaderboard

**Database Design**:
```sql
-- User Points
CREATE TABLE UserPoints (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Points INT DEFAULT 0,
    Level INT DEFAULT 1,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- Badges
CREATE TABLE Badges (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(100),
    Description NVARCHAR(500),
    Icon NVARCHAR(200),
    RequiredPoints INT
);

-- User Badges
CREATE TABLE UserBadges (
    UserId UNIQUEIDENTIFIER,
    BadgeId UNIQUEIDENTIFIER,
    EarnedAt DATETIME2,
    PRIMARY KEY (UserId, BadgeId)
);
```

**Point System Logic**:
```csharp
public class PointService : IPointService
{
    private readonly Dictionary<UserAction, int> _pointRules = new()
    {
        { UserAction.CreatePost, 10 },
        { UserAction.ReceiveLike, 2 },
        { UserAction.CommentOnPost, 3 },
        { UserAction.SharePost, 5 }
    };
    
    public async Task AwardPointsAsync(Guid userId, UserAction action)
    {
        var points = _pointRules[action];
        await _userPointRepository.AddPointsAsync(userId, points);
        
        // Check for new badges
        await CheckAndAwardBadgesAsync(userId);
    }
}
```

##### 6. 📊 **Analytics Dashboard với Chart.js**
**Metrics**: Views, Engagement, User Growth

**Implementation**:
```typescript
// Angular component
export class AnalyticsDashboardComponent implements OnInit {
    public chartData: ChartConfiguration['data'];
    
    ngOnInit() {
        this.loadAnalytics();
    }
    
    private loadAnalytics() {
        this.analyticsService.getPostAnalytics().subscribe(data => {
            this.chartData = {
                labels: data.labels,
                datasets: [{
                    data: data.views,
                    label: 'Views',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)'
                }]
            };
        });
    }
}
```

#### Phase 3: Advanced Features (Q3 2025)

##### 7. 🤖 **AI-Powered Features**

**7.1 Content Recommendations**
```csharp
public class RecommendationService
{
    private readonly IOpenAIService _openAIService;
    
    public async Task<List<Post>> GetRecommendationsAsync(Guid userId)
    {
        // Get user reading history
        var history = await _userHistoryRepository.GetReadingHistoryAsync(userId);
        
        // Use OpenAI embeddings for similarity
        var embeddings = await _openAIService.GetEmbeddingsAsync(history);
        
        // Find similar posts
        return await _postRepository.FindSimilarPostsAsync(embeddings);
    }
}
```

**7.2 Auto-tagging với AI**
```csharp
public async Task<List<string>> GenerateTagsAsync(string content)
{
    var prompt = $"Generate 5 relevant tags for this blog post: {content.Substring(0, 500)}";
    var response = await _openAIService.CompletionAsync(prompt);
    return ParseTags(response);
}
```

##### 8. 💰 **Monetization Features**

**8.1 Premium Subscriptions**
```csharp
public class SubscriptionService
{
    public async Task<Subscription> CreateSubscriptionAsync(Guid userId, SubscriptionPlan plan)
    {
        // Integrate with Stripe
        var customer = await _stripeService.CreateCustomerAsync(userId);
        var subscription = await _stripeService.CreateSubscriptionAsync(customer.Id, plan);
        
        // Save to database
        return await _subscriptionRepository.CreateAsync(new Subscription
        {
            UserId = userId,
            StripeSubscriptionId = subscription.Id,
            Plan = plan,
            Status = SubscriptionStatus.Active
        });
    }
}
```

**8.2 Donation System**
```csharp
// Buy Me a Coffee integration
public class DonationController : ControllerBase
{
    [HttpPost("donate")]
    public async Task<IActionResult> ProcessDonation([FromBody] DonationRequest request)
    {
        var payment = await _paymentService.ProcessPaymentAsync(request);
        if (payment.Success)
        {
            await _notificationService.NotifyAuthorAsync(request.AuthorId, 
                $"You received a {request.Amount} donation!");
        }
        return Ok(payment);
    }
}
```

##### 9. 📱 **Mobile App với .NET MAUI**

**Project Structure**:
```
DevBlog.Mobile/
├── Platforms/
│   ├── Android/
│   ├── iOS/
│   └── Windows/
├── Views/
│   ├── HomePage.xaml
│   ├── PostDetailPage.xaml
│   └── ProfilePage.xaml
├── ViewModels/
├── Services/
└── MauiProgram.cs
```

**API Integration**:
```csharp
public class BlogApiService
{
    private readonly HttpClient _httpClient;
    
    public async Task<List<Post>> GetPostsAsync()
    {
        var response = await _httpClient.GetAsync("api/posts");
        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<Post>>(content);
    }
}
```

##### 10. 🌍 **Multi-language Support (i18n)**

**Backend Implementation**:
```csharp
// Resource files structure
Resources/
├── SharedResource.resx (default - English)
├── SharedResource.vi.resx (Vietnamese)
└── SharedResource.ja.resx (Japanese)

// Configure trong Program.cs
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[] { "en", "vi", "ja" };
    options.SetDefaultCulture(supportedCultures[0])
        .AddSupportedCultures(supportedCultures)
        .AddSupportedUICultures(supportedCultures);
});
```

**Angular Implementation**:
```bash
# Generate locale files
ng add @angular/localize
ng generate @angular/localize:extract
```

```typescript
// app.module.ts
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);

// Use in template
<p>{{ 'WELCOME_MESSAGE' | translate }}</p>
```

### 📋 Implementation Checklist Template

Khi implement mỗi feature, follow checklist này:

#### Backend Tasks:
- [ ] Create domain entities
- [ ] Define DTOs and ViewModels
- [ ] Implement repository interfaces
- [ ] Create repository implementations
- [ ] Add business logic services
- [ ] Create API controllers
- [ ] Add validation rules
- [ ] Write unit tests
- [ ] Add integration tests
- [ ] Update Swagger documentation

#### Frontend Tasks:
- [ ] Create Angular services
- [ ] Generate API clients (NSwag)
- [ ] Create components
- [ ] Implement routing
- [ ] Add state management (if needed)
- [ ] Create UI/UX designs
- [ ] Add form validations
- [ ] Write component tests
- [ ] Add e2e tests

#### Database Tasks:
- [ ] Design table schema
- [ ] Create Entity Framework migrations
- [ ] Add indexes for performance
- [ ] Create stored procedures (if needed)
- [ ] Add seed data

#### DevOps Tasks:
- [ ] Update Docker configuration
- [ ] Modify CI/CD pipelines
- [ ] Update environment variables
- [ ] Configure monitoring
- [ ] Update documentation

### 🔧 Technical Debt & Refactoring

#### Planned Refactoring:
1. **Repository Pattern Enhancement**
   - Implement Generic Repository
   - Add Specification Pattern
   - Improve query performance

2. **Caching Strategy**
   - Implement Redis caching
   - Add cache invalidation logic
   - Memory cache for static data

3. **Code Quality**
   - Add SonarQube analysis
   - Implement code coverage > 80%
   - Refactor long methods

4. **Performance Optimization**
   - Implement lazy loading for images
   - Add pagination for all lists
   - Optimize database queries with indexes

### 🎯 Success Metrics

Mỗi feature cần đạt các metrics sau:
- **Performance**: Response time < 200ms
- **Test Coverage**: > 80%
- **Code Quality**: SonarQube rating A
- **Security**: OWASP compliance
- **User Experience**: Loading time < 3s

## 📚 Tài liệu học tập

### Clean Architecture & DDD
- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design của Eric Evans](https://www.domainlanguage.com/ddd/)
- [Implementing Domain-Driven Design](https://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577)

### .NET Core Resources
- [Microsoft Docs - ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [ASP.NET Core Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity)

### Angular Resources
- [Angular Documentation](https://angular.io/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [CoreUI Angular Documentation](https://coreui.io/angular/docs/)

### Best Practices
- [SOLID Principles](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [REST API Design Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- [Security Best Practices for ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/)

### Video Tutorials (Tiếng Việt)
- [TEDU YouTube Channel](https://www.youtube.com/c/TEDU)
- [200Lab Education](https://200lab.io/)
- [CodeGym Vietnam](https://codegym.vn/)

## 📞 Support & Contact

- 📧 Email: support@devblog.vn
- 💬 Discord: [Join our community](https://discord.gg/devblog)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/DevBlog/issues)
- 📖 Wiki: [Project Wiki](https://github.com/yourusername/DevBlog/wiki)

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Acknowledgments

- [ASP.NET Core team](https://github.com/dotnet/aspnetcore)
- [Angular team](https://github.com/angular/angular)
- [CoreUI team](https://github.com/coreui/coreui-angular)
- Cộng đồng developer Việt Nam

---

**Happy Coding! 🎉**

*Được phát triển với ❤️ bởi cộng đồng DevBlog Việt Nam*
