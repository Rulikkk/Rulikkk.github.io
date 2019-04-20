import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import UserInfo from "../components/UserInfo";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

class Err404 extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Page not found — ${config.siteTitle}`} />
        <SEO />
        <p>
          There is no such page here. But there is a lot of cool stuff <Link to="/">at home.</Link>
        </p>
        <UserInfo />
      </Layout>
    );
  }
}

export default Err404;
