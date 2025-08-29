using DevBlog.Core.Entities.Identity;
using DevBlog.Core.Models.System;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.Reflection;
using System.Security.Claims;

namespace DevBlog.Api.Extensions
{
    public static class ClaimExtensions
    {
        public static void GetPermission(this List<RoleClaimsDto> allPermissions, Type policy)
        {
            FieldInfo[] fields = policy.GetFields(BindingFlags.Public | BindingFlags.Static);

            foreach (FieldInfo field in fields)
            {
                var attribute = field.GetCustomAttributes(typeof(DescriptionAttribute), true);
                string displayName = field.GetValue(null).ToString();
                var attributes = field.GetCustomAttributes(typeof(DescriptionAttribute), true);
                if (attributes.Length > 0)
                {
                    var description = (DescriptionAttribute)attributes[0];
                    displayName = description.Description;
                }
                allPermissions.Add(new RoleClaimsDto { Type = "Permission", Value = field.GetValue(null).ToString(), DisplayName = displayName});
            }
        }

        public static async Task AddPermissionClaim(this RoleManager<AppRole> roleManager, AppRole role, string permission)
        {
            var claims = await roleManager.GetClaimsAsync(role);
            if (!claims.Any(c => c.Type == "Permission" && c.Value == permission))
            {
                await roleManager.AddClaimAsync(role, new Claim("Permission", permission));
            }
        }
    }
}
