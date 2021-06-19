import { StaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { Component } from "react";

class ProfilePic extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query ProfilePicQuery {
            file(relativePath: { eq: "photo.jpg" }) {
              childImageSharp {
                fixed(width: 75, height: 75) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        `}
        render={data => (
          <Img fixed={data.file.childImageSharp.fixed} {...this.props} />
        )}
      ></StaticQuery>
    );
  }
}

export default ProfilePic;
