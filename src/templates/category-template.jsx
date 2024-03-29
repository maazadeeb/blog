import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Sidebar from "../components/Sidebar";
import withLayout from "../containers/withLayout";
import CategoryTemplateDetails from "../components/CategoryTemplateDetails";

class CategoryTemplate extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata;
    const { category } = this.props.pageContext;

    return (
      <>
        <Helmet title={`${category} - ${title}`} />
        <Sidebar {...this.props} />
        <CategoryTemplateDetails {...this.props} />
      </>
    );
  }
}

export default withLayout(CategoryTemplate);

export const pageQuery = graphql`
  query CategoryPage($category: String) {
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
          category: { eq: $category }
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
