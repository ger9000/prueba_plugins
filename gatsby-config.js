module.exports = {
  siteMetadata: {
    title: 'Vacaciones Costa'
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`
      }
    },
    `gatsby-transformer-csv`,
    `gatsby-transformer-sharp`
  ]
}
