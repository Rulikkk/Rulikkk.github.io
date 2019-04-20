import React from "react";
import { Link } from "gatsby";

const Item = i => (
    <h1 key={i.path}>
        <Link to={i.path}>{i.name}</Link>
    </h1>
);

export default ({ items }) => <div className="fancy-links">{items.map(Item)}</div>;
