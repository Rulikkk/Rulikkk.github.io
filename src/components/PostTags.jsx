import React, { Component } from "react";
import _ from "lodash";
import { Link } from "gatsby";

class PostTags extends Component {
  render() {
    const { tags, category } = this.props;
    return (
      <div className="fancy-links">
        {tags &&
          tags.map(tag => (
            <Link key={tag} className="post-tag" to={`/tags/${_.kebabCase(tag)}`}>
              {"#" + tag}
            </Link>
          ))}
        {category && (
          <Link className="post-tag" to={`/categories/${_.kebabCase(category)}`}>
            Category:
            {category}
          </Link>
        )}
      </div>
    );
  }
}

export default PostTags;
