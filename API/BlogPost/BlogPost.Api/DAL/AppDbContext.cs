using Microsoft.EntityFrameworkCore;
using BlogPost.Api.Models;

namespace BlogPost.Api.DAL
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { 
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<BlogComment> BlogComments { get; set; }
        public DbSet<Users> User { get; set; }
    }
}
