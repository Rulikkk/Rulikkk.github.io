import React from "react";
import Helmet from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";
import config from "../../data/SiteConfig";
import "./1.scss";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        <div className="content-wrapper">
          <div className="content">
            <Header />
            <Helmet>
              <meta name="description" content={config.siteDescription} />
              {/* https://stackoverflow.com/questions/10218178/necessary-to-add-link-tag-for-favicon-ico ? */}
              <link rel="icon" type="image/png" href="favicon.png" />
            </Helmet>
            {children}
          </div>
        </div>
        <Footer config={config} />
      </div>
    );
  }
}
