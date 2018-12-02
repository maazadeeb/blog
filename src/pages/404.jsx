import { Link, graphql } from "gatsby";
import React from "react";
import Sidebar from "../components/Sidebar";
import withLayout from "../containers/withLayout";

class NotFoundRoute extends React.Component {
  render() {
    return (
      <div>
        <Sidebar {...this.props} />
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">Page not found</h1>
              <div className="page__body">
                <p>
                  The page you're trying to access doesn't exist. Go to the{" "}
                  <Link to="/">home page</Link> maybe?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withLayout(NotFoundRoute);

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          stackoverflow
          twitter
          github
          rss
          vk
        }
      }
    }
  }
`;
