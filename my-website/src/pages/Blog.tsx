import { useEffect, useState, type FC } from "react";
import { api } from "../lib/api";

type Post = {
  _id: string;
  title: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
};

const Blog: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await api.listPosts();
        setPosts(response.posts);
      } catch {
        setPosts([]);
      }
    };

    void loadPosts();
  }, []);

  return (
    <section className="blog-section">
      <h1>Blog</h1>
      {!posts.length ? <p>Admin can upload posts from the Admin panel.</p> : null}
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post._id} className="blog-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            {post.tags.length ? <p className="blog-tags">#{post.tags.join(" #")}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
