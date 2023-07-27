using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogPost.Api.DAL;
using BlogPost.Api.Models;

namespace BlogPost.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogComment>>> GetBlogComments()
        {
          if (_context.BlogComments == null)
          {
              return NotFound();
          }
            return await _context.BlogComments.ToListAsync();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogComment>> GetBlogComment(int id)
        {
          if (_context.BlogComments == null)
          {
              return NotFound();
          }
            var blogComment = await _context.BlogComments.FindAsync(id);

            if (blogComment == null)
            {
                return NotFound();
            }

            return blogComment;
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogComment(int id, BlogComment blogComment)
        {
            if (id != blogComment.Id)
            {
                return BadRequest();
            }

            _context.Entry(blogComment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogCommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BlogComment>> PostBlogComment(BlogComment blogComment)
        {
          if (_context.BlogComments == null)
          {
              return Problem("Entity set 'AppDbContext.BlogComments'  is null.");
          }
            _context.BlogComments.Add(blogComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlogComment", new { id = blogComment.Id }, blogComment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogComment(int id)
        {
            if (_context.BlogComments == null)
            {
                return NotFound();
            }
            var blogComment = await _context.BlogComments.FindAsync(id);
            if (blogComment == null)
            {
                return NotFound();
            }

            _context.BlogComments.Remove(blogComment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogCommentExists(int id)
        {
            return (_context.BlogComments?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
