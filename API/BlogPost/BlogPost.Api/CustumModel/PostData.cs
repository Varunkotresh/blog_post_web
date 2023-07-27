using BlogPost.Api.Models;

namespace BlogPost.Api.CustumModel
{
    public class PostData
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public string CreatedAt { get; set; }
        public List<BlogComment> BlogComments { get; set; }
    }
}
