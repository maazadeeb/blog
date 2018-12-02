import React from "react";
import "./style.scss";
import "../../assets/fonts/fontello-f69cba61/css/fontello.css";

class Links extends React.Component {
  render() {
    const author = this.props.data;
    const links = {
      telegram: author.telegram,
      twitter: author.twitter,
      github: author.github,
      vk: author.vk,
      rss: author.rss,
      email: author.email,
      stackoverflow: author.stackoverflow
    };

    return (
      <div className="links">
        <ul className="links__list">
          <li className="links__list-item">
            <a
              href={`https://www.twitter.com/${links.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              rel="noopener noreferrer"
            >
              <i className="icon-twitter" />
            </a>
          </li>
          <li className="links__list-item">
            <a
              href={`https://www.github.com/${links.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icon-github" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={`mailto:${links.email}`}>
              <i className="icon-mail" />
            </a>
          </li>
          <li className="links__list-item">
            <a
              href={`https://stackoverflow.com/users/${links.stackoverflow}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icon-stackoverflow" />
            </a>
          </li>
          <li className="links__list-item">
            <a href={links.rss} target="_blank" rel="noopener noreferrer">
              <i className="icon-rss" />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Links;
