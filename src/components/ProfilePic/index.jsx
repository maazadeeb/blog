import { StaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { Component } from "react";

class ProfilePic extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query ProfilePicQuery {
            file(relativePath: { eq: "photo.jpg" }) {
              childImageSharp {
                gatsbyImageData(width: 75, height: 75, layout: FIXED)
              }
            }
          }
        `}
        render={data => (
          <GatsbyImage
            image={data.file.childImageSharp.gatsbyImageData}
            {...this.props}
          />
        )}
      ></StaticQuery>
    );
  }
}

export default ProfilePic;
