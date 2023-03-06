const lost = require("lost");
const pxtorem = require("postcss-pxtorem");
const postcssImport = require("postcss-import");

module.exports = {
  siteMetadata: {
    url: "https://maazadeeb.com",
    siteUrl: "https://maazadeeb.com",
    title: "Blog by Maaz Syed Adeeb",
    subtitle:
      "Learner. Experimentalist. Code, food and football never cease to thrill me.",
    copyright: "© All rights reserved.",
    disqusShortname: "maazadeeb",
    menu: [
      {
        label: "Articles",
        path: "/",
      },
      {
        label: "About me",
        path: "/about/",
      } /* ,
      {
        label: "Contact me",
        path: "/contact/"
      } */,
    ],
    author: {
      name: "Maaz Syed Adeeb",
      email: "maaz.adeeb@gmail.com",
      telegram: "#",
      twitter: "maazadeeb6",
      github: "maazadeeb",
      rss: "/rss.xml",
      vk: "#",
      stackoverflow: "2950032/maazadeeb",
      linkedin: "maazadeeb",
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                site_url: url
                title
                description: subtitle
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.site_url + edge.node.fields.slug,
                  guid: site.siteMetadata.site_url + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              ),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        layout
                        draft
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-table-of-contents",
            options: {
              exclude: "Table of Contents",
              tight: true,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents",
            },
          },
          "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: { wrapperStyle: "margin-bottom: 1.0725rem" },
          },
          {
            resolve: `gatsby-remark-embed-snippet`,
            options: {
              directory: `${__dirname}`,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-external-links",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: { trackingId: "UA-105814760-1" },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Roboto:400,400i,500,700"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap.xml",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Blog by Maaz",
        short_name: "Blog by Maaz",
        start_url: "/",
        background_color: "#5d93ff",
        theme_color: "#5d93ff",
        display: "standalone",
        icon: "static/images/favicon.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        postCssPlugins: [
          lost(),
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              "font",
              "font-size",
              "line-height",
              "letter-spacing",
              "margin",
              "margin-top",
              "margin-left",
              "margin-bottom",
              "margin-right",
              "padding",
              "padding-top",
              "padding-left",
              "padding-bottom",
              "padding-right",
              "border-radius",
              "width",
              "max-width",
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
      },
    },
    "gatsby-plugin-netlify",
  ],
};
