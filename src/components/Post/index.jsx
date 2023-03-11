import { Link } from "gatsby";
import React from "react";
import format from "date-fns/format";
import "./style.scss";

class Post extends React.Component {
  render() {
    const {
      title,
      date,
      category,
      description,
    } = this.props.data.node.frontmatter;
    const { slug, categorySlug } = this.props.data.node.fields;

    return (
      <div className="post">
        <div className="post__meta">
          <time
            className="post__meta-time"
            dateTime={format(new Date(date), "MMMM d, yyyy")}
          >
            {format(new Date(date), "MMMM yyyy")}
          </time>
          <span className="post__meta-divider" />
          <span className="post__meta-category" key={categorySlug}>
            <Link to={categorySlug} className="post__meta-category-link">
              {category}
            </Link>
          </span>
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        <p className="post__description">{description}</p>
        <Link className="post__readmore" to={slug}>
          Read
        </Link>
      </div>
    );
  }
}

export default Post;
