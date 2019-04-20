import _ from "lodash";
import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import MainLinkList from "../components/MainLinkList";
import UserInfo from "../components/UserInfo";
import config from "../../data/SiteConfig";

class Tags extends React.Component {
  render() {
    const tags = _.sortBy(this.props.data.allMarkdownRemark.group, t => t.name.toUpperCase()).map(
      t => ({
        path: `/tags/${_.kebabCase(t.name)}`,
        name: `#${t.name} (${t.count})`
      })
    );
    return (
      <Layout>
        <Helmet>
          <title>{`Tags — ${config.siteTitle}`}</title>
        </Helmet>
        <SEO />
        <h1>Tags</h1>
        <p>This is a list of all available tags in this blog.</p>
        <MainLinkList items={tags} />
        <UserInfo />
      </Layout>
    );
  }
}

export default Tags;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(limit: 20000) {
      group(field: frontmatter___tags) {
        name: fieldValue
        count: totalCount
      }
    }
  }
`;
