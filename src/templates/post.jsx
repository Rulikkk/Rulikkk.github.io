import moment from "moment";
import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import { GoHome } from "react-icons/go";
import Layout from "../components/Layout";
import Header from "../components/Header";
import PostTags from "../components/PostTags";
import SEO from "../components/SEO";
import UserInfo from "../components/UserInfo";
import config from "../../data/SiteConfig";
import "./code-theme.css";

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pageContext;
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} — ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className="post-content">
          <h1 style={{ marginBottom: 0 }}>{post.title}</h1>
          <div
            style={{
              fontSize: "80%",
              color: "rgba(0,0,0,0.5)",
              marginTop: `${1 / 3}rem`,
              marginBottom: `${2 / 3}rem`
            }}
          >
            {moment(post.date).format("MMMM Do YYYY")} • {postNode.timeToRead} min to read
            {/*new Array(post.cups).fill("🥃").join("")*/}
          </div>
        </div>
        {
          // <div className="links">
          //   <Link to="/">
          //     <GoHome />
          //   </Link>{" "}
          //   <Link to={slug}>•</Link>
          // </div>
        }
        <div className="post-content" dangerouslySetInnerHTML={{ __html: postNode.html }} />
        <PostTags tags={post.tags} category={post.category} />
        <UserInfo />
        {/*<div className="post-meta">
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>*/}
        {/*<UserInfo config={config} />*/}
        {/*<Disqus postNode={postNode} />*/}
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
