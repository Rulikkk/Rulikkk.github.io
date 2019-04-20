import moment from "moment";
import React from "react";
import { Link } from "gatsby";

class PostListing extends React.Component {
  getPostList() {
    return this.props.postEdges.map(postEdge => ({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
      cups: Math.max(1, Math.round(postEdge.node.timeToRead / 5))
    }));
  }

  render() {
    const postList = this.getPostList();
    return (
      <div className="fancy-links">
        {/* Your post list here. */
        postList.map(post => (
          <div key={post.title}>
            <Link to={post.path}>
              <h1 style={{ marginTop: "3rem", marginBottom: `${1 / 3}rem` }}>{post.title}</h1>
            </Link>
            <div style={{ fontSize: "80%", color: "rgba(0,0,0,0.5)" }}>
              {moment(post.date).format("MMMM Do YYYY")} • {post.timeToRead} min to read
              {/*new Array(post.cups).fill("🥃").join("")*/}
            </div>
            <div>
              <p style={{ marginTop: `${1 / 3}em`, lineHeight: "1.5em" }}>{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
