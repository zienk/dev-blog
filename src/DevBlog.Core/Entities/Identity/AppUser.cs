using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevBlog.Core.Entities.Identity
{
    [Table("AppUsers")]
    public class AppUser : IdentityUser<Guid>
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public decimal Balance { get; set; }
        public DateTime Dob { get; set; }
        public string? Avatar { get; set; }

        public bool IsActive { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? VipStartDate { get; set; }
        public DateTime? VipExpiryDate { get; set; }
        public DateTime? LastLoginDate { get; set; }

    }
}
