import _ from "lodash";
import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import MainLinkList from "../components/MainLinkList";
import UserInfo from "../components/UserInfo";
import config from "../../data/SiteConfig";

class Categories extends React.Component {
  render() {
    const categories = _.sortBy(this.props.data.allMarkdownRemark.group, c =>
      c.name.toUpperCase()
    ).map(c => ({
      path: `/categories/${_.kebabCase(c.name)}`,
      name: `${c.name} (${c.count})`
    }));
    return (
      <Layout className="fancy-links">
        <Helmet>
          <title>{`Categories — ${config.siteTitle}`}</title>
        </Helmet>
        <SEO />
        <h1>Categories</h1>
        <p>This is a list of all available categories in this blog.</p>
        <MainLinkList items={categories} />
        <UserInfo />
      </Layout>
    );
  }
}

export default Categories;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoriesQuery {
    allMarkdownRemark(limit: 20000) {
      group(field: frontmatter___category) {
        name: fieldValue
        count: totalCount
      }
    }
  }
`;
