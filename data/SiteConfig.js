module.exports = {
  siteTitle: "RMust.me", // Site title.
  siteTitleShort: "RMust.me", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "RMust.me", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://rmust.me", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "One more place to write more.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "", // GA tracking ID.
  disqusShortname: "", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD.MM.YYYY", // Date format for display.
  userName: "Rulikkk", // Username to display in the author segment.
  userTwitter: "rulikkk", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Earth", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription: "Project manager at Akvelon, also sometimes codes (or just pretends to).", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Home",
      url: "/"
    },
    {
      label: "My GitHub",
      url: "https://github.com/rulikkk"
    },
    {
      label: "My Twitter",
      url: "https://mobile.twitter.com/rulikkk"
    },
    {
      label: "Site Rss",
      url: "/rss.xml"
    },
    {
      label: "This site does not use cookies, I hope"
    }
    // ,
    // {
    //   label: "Email",
    //   url: "mailto:vagr9k@gmail.com"
    // }
  ],
  copyright: "Copyright © 2019 Rustem Mustafin", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};
