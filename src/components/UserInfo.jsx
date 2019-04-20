import React, { Component } from "react";
import { Link } from "gatsby";
import { Location } from "@reach/router";
import profilePic from "./profilePic.jpg";

class UserInfo extends Component {
    render() {
        return (
            <Location>
                {({ location }) => (
                    <div
                        className={`fancy-links user-info ${
                            location.pathname === "/" ? "fancy-gradient" : ""
                        }`}
                    >
                        <img src={profilePic} alt={`Rustem Mustafin`} />
                        <p>
                            Blog by <a href="https://mobile.twitter.com/rulikkk">Rustem Mustafin</a>
                            , PM at Akvelon, who sometimes even pretends to code!{" "}
                            <Link to="/about-me">About me.</Link>
                        </p>
                    </div>
                )}
            </Location>
        );
    }
}

export default UserInfo;
