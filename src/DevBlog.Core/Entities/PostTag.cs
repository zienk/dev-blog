﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevBlog.Core.Entities
{
    [Table("PostTags")]
    [PrimaryKey(nameof(PostId), nameof(TagId))]
    public class PostTag
    {
        public Guid PostId { get; set; }
        public Guid TagId { get; set; }
    }
}
