import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import withLayout from "../containers/withLayout";
import Sidebar from "../components/Sidebar";
import TagTemplateDetails from "../components/TagTemplateDetails";

class TagTemplate extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata;
    const { tag } = this.props.pageContext;

    return (
      <>
        <Helmet title={`All Posts tagged as "${tag}" - ${title}`} />
        <Sidebar {...this.props} />
        <TagTemplateDetails {...this.props} />
      </>
    );
  }
}

export default withLayout(TagTemplate);

export const pageQuery = graphql`
  query TagPage($tag: String) {
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
          linkedin
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
          layout: { eq: "post" }
          draft: { ne: true }
        }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;
