import React, { Component } from "react";
import "./UserLinks.css";

class UserLinks extends Component {
  getLinkElements() {
    const { userLinks } = this.props.config;
    const { labeled } = this.props;
    return userLinks.map(link => (
      <a key={link.label} href={link.url}>
        {labeled ? link.label : ""}
      </a>
    ));
  }
  render() {
    const { userLinks } = this.props.config;
    if (!userLinks) {
      return null;
    }
    return <>{this.getLinkElements()}</>;
  }
}

export default UserLinks;
