import React, { Component } from "react";
import { Link } from "gatsby";
import { GoHome } from "react-icons/go";
import config from "../../data/SiteConfig";
import { Location } from "@reach/router";

class Header extends Component {
    render() {
        return (
            <header className="fancy-links">
                <Location>
                    {({ location }) =>
                        location.pathname === "/" ? (
                            <h1>{config.siteTitle}</h1>
                        ) : (
                            <h3>
                                <Link to="/">
                                    <GoHome /> {config.siteTitle}
                                </Link>
                            </h3>
                        )
                    }
                </Location>
            </header>
        );
    }
}

export default Header;
