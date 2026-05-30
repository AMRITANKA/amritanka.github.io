module.exports = function (eleventyConfig) {
  // ── Passthrough ──
  eleventyConfig.addPassthroughCopy("assets");

  // ── Filters ──
  eleventyConfig.addFilter("dateFormat", (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    if (!content) return "1 min read";
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  });

  eleventyConfig.addFilter("limit", (arr, n) => {
    if (!arr) return [];
    return arr.slice(0, n);
  });

  // ── Collections ──
  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("projects/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("featuredProjects", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("projects/**/*.md")
      .filter((p) => p.data.featured)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("posts/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // ── Config ──
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
