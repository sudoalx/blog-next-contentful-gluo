/*
 * This file is used to configure the site settings.
 * You can toggle the features of the site here.
 */

export const siteConfig = {
  // The title of the site
  title: "Gluo Dev Blog",

  // The description of the site
  description: "A blog about software development and technology.",

  // The URL of the site
  url: "https://blog-next-contentful-gluo.vercel.app/",

  navigation: {
    // Show the language switch
    showLanguageSwitch: false,
  },

  // Posts grid settings
  postsGrid: {
    distribution: "rows", // rows or columns
    numberOfColumns: 3,
  },

  // Post card settings
  postCard: {
    // Show the author profile picture
    showAuthorProfilePicture: true,
    // Show the reading time
    showReadingTime: true,
    // Show the date
    showDate: true,
    // Show the excerpt
    showExcerpt: true,
  },

  // Post page settings
  post: {
    // Show the author profile picture
    showAuthorProfilePicture: true,
    // Share menu settings
    shareMenu: {
      enabled: true,
      Text: "Share this post!",
      socialMedia: {
        linkedin: true,
        twitter: true,
        facebook: true,
        copyLink: true,
      },
    },
    // Show excerpt as quoteblock in the post
    showExcerptAsQuote: false,
    // Show the table of contents to the left or right of the post
    positionTableOfContents: "right", // left or right
  },
};
