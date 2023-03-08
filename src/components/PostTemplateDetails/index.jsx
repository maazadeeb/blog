import { Link } from "gatsby";
import React from "react";
import format from "date-fns/format";
import Disqus from "../Disqus/Disqus";
import { isDev } from "../../utils/flags";
import "./style.scss";
import ProfilePic from "../ProfilePic";

class PostTemplateDetails extends React.Component {
  render() {
    const { subtitle, author } = this.props.data.site.siteMetadata;
    const post = this.props.data.markdownRemark;
    const tags = post.fields.tagSlugs;

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">
          All Articles
        </Link>
      </div>
    );

    const tagsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {tags &&
            tags.map((tag, i) => (
              <li className="post-single__tags-list-item" key={tag}>
                <Link to={tag} className="post-single__tags-list-item-link">
                  {post.frontmatter.tags[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );

    const commentsBlock = (
      <div>
        <Disqus
          postNode={post}
          siteMetadata={this.props.data.site.siteMetadata}
        />
      </div>
    );

    return (
      <>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            <div
              className="post-single__body"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div className="post-single__date">
              <em>
                Published{" "}
                {format(new Date(post.frontmatter.date), "d MMM yyyy")}
              </em>
            </div>
          </div>
          <div className="post-single__footer">
            {tagsBlock}
            <hr />
            <div className="post-single__footer-author-details">
              <ProfilePic
                className="post-single__footer-author-details-photo"
                alt={author.name}
              />
              <p className="post-single__footer-author-details-text">
                {subtitle}
                <a
                  href={`https://twitter.com/${author.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <br /> <strong>{author.name}</strong> on Twitter
                </a>
              </p>
            </div>
            {!isDev() && commentsBlock}
          </div>
        </div>
      </>
    );
  }
}

export default PostTemplateDetails;
