using BlogPost.Api.CustumModel;
using BlogPost.Api.DAL;
using BlogPost.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogPost.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PostsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            var posts = await _context.Posts.Include(x=> x.BlogComments).ToListAsync();
            List<PostData> postsData = new List< PostData >();
            foreach (var post in posts)
            {
                PostData cls = new PostData();
                cls.Author = post.Author;
                cls.Id = post.Id;
                cls.Content = post.Content;
                cls.Title = post.Title;
                cls.CreatedAt = post.CreatedAt.ToString();
                cls.BlogComments = post.BlogComments;
                postsData.Add(cls);
            }
            return Ok(postsData);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPosts(int id)
        {
            var posts = await _context.Posts.FindAsync(id);
            
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }
        [HttpGet("Comments/{id}")]
        public  List<BlogComment> GetPostsBlogComment(int id)
        {
            var posts =  _context.Posts.Include(x => x.BlogComments).ToList();
            var filteredPost = posts.Where(x => x.Id == id).FirstOrDefault();
            List<BlogComment> lstbc=new List<BlogComment>();
            foreach (var blogComment in filteredPost.BlogComments) 
            { 
                lstbc.Add(blogComment);
            }
            if (lstbc == null)
            {
                return null;
            }
            return lstbc;
        }
        [HttpPost]
        public async Task<ActionResult> CreatePost(Post model)
        {
            try
            {
                model.CreatedAt = DateTime.Now;
                _context.Add(model);
                _context.SaveChanges();
                return Ok("Posts created");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task<ActionResult> UpdatePost(Post model)
        {
            if (model == null || model.Id == 0)
            {
                if (model == null)
                {
                    return BadRequest("Model data is invalid");
                }
                else if (model.Id == 0)
                {
                    return BadRequest($"Department Id {model.Id} is invalid");
                }
            }
            try
            {
                var posts = _context.Posts.Find(model.Id);
                if (posts == null)
                {
                    return NotFound($"Department not found with id {model.Id}");
                }
                posts.Title = model.Title;
                posts.Content = model.Content;
                posts.Author = model.Author;
                posts.CreatedAt = DateTime.Now;
                _context.SaveChanges();
                return Ok("Posts details updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> DeletePost(int id)
        {
            var posts = await _context.Posts.FindAsync(id);
            if (posts == null)
            {
                return NotFound($"Posts not found for id {id}");
            }
            _context.Posts.Remove(posts);
            _context.SaveChanges();
            return Ok("Posts deleted");
        }
    }
}
