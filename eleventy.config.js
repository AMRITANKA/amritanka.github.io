export default async function (eleventyConfig) {
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // Collection: all posts sorted by date descending
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Collection: all projects sorted by date descending
  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByGlob("projects/**/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Collection: featured projects
  eleventyConfig.addCollection("featuredProjects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("projects/**/*.md")
      .filter((item) => item.data.featured)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateFormat", function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Reading time filter
  eleventyConfig.addFilter("readingTime", function (content) {
    const wordsPerMinute = 200;
    const words = (content || "").split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  });

  // Limit filter
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return (arr || []).slice(0, limit);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "/",
  };
}
