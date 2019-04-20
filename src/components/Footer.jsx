import React, { Component } from "react";
import { Link } from "gatsby";
import { GoHome, GoListUnordered, GoTag, GoRss } from "react-icons/go";

class Footer extends Component {
  render() {
    const { config } = this.props;
    const url = config.siteRss;
    const { copyright } = config;

    // Use this to hide home link on main page
    // const show = ({ isCurrent }) => (isCurrent ? { style: { display: "none" } } : {});

    if (!copyright) {
      return null;
    }
    return (
      <footer className="notice-container fancy-links">
        <Link to="/" title="Home" /* getProps={show} // uncomment to hide home link on main page */>
          <GoHome /> <span>RMust.me</span>
        </Link>
        <Link to="/categories" title="Categories">
          <GoListUnordered /> <span>Categories</span>
        </Link>
        <Link to="/tags" title="Tags">
          <GoTag /> <span>Tags</span>
        </Link>
        <Link to="/rss.xml" title="RSS">
          <GoRss /> <span>RSS</span>
        </Link>
        <h4>{copyright}</h4>
      </footer>
    );
  }
}

export default Footer;
