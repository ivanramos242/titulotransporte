import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const exportDir = path.join(root, "migration-export");
const outDir = path.join(root, "src", "data");

fs.mkdirSync(outDir, { recursive: true });

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(exportDir, file), "utf8"));
}

function decodeEntities(value = "") {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&#8217;", "'")
    .replaceAll("&#8211;", "-")
    .replaceAll("&#8212;", "-")
    .replaceAll("&#8220;", "“")
    .replaceAll("&#8221;", "”")
    .replaceAll("&#038;", "&");
}

function stripTags(html = "") {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function cleanHtml(html = "") {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\sdata-[a-z0-9_-]+="[^"]*"/gi, "")
    .replace(/\sid="et-boc"/gi, "")
    .replace(/\sclass="et_builder_inner_content[^"]*"/gi, ' class="wp-migrated-content"')
    .trim();
}

function headings(html = "") {
  return [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
}

function normalizeWpItem(item, type) {
  const title = stripTags(item.title?.rendered || item.name || "");
  const html = cleanHtml(item.content?.rendered || item.description || "");
  return {
    id: item.id,
    type,
    slug: item.slug,
    path: type === "product" ? `/producto/${item.slug}/` : `/${item.slug === "inicio" ? "" : `${item.slug}/`}`,
    title,
    excerpt: stripTags(item.excerpt?.rendered || item.short_description || "").slice(0, 320),
    html,
    textLength: stripTags(html).length,
    headings: headings(html),
    date: item.date || null,
    modified: item.modified || item.date_modified || null,
    featuredMedia: item.featured_media || item.images?.[0]?.id || null,
  };
}

const pages = readJson("pages-wpapi.json").map((item) => normalizeWpItem(item, "page"));
const posts = readJson("posts-wpapi.json").map((item) => normalizeWpItem(item, "post"));
const products = readJson("products-wpapi.json").map((item) => normalizeWpItem(item, "product"));
const media = readJson("media-wpapi.json").map((item) => ({
  id: item.id,
  slug: item.slug,
  url: item.source_url,
  alt: item.alt_text || stripTags(item.title?.rendered || ""),
  width: item.media_details?.width || null,
  height: item.media_details?.height || null,
}));

const questionRows = fs
  .readFileSync(path.join(exportDir, "questions-full.tsv"), "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => line.split("\t"));

const questions = questionRows.map((row) => {
  const [
    id,
    slug,
    title,
    prompt,
    code,
    law,
    optionA,
    optionB,
    optionC,
    optionD,
    optionE,
    optionF,
    optionG,
    optionH,
    answer,
    module,
    mode,
  ] = row;
  const options = [optionA, optionB, optionC, optionD, optionE, optionF, optionG, optionH]
    .map((text, index) => ({ key: String.fromCharCode(97 + index), text }))
    .filter((option) => option.text);

  return {
    id: Number(id),
    slug,
    title,
    prompt,
    code,
    law,
    options,
    answer,
    module,
    mode,
  };
});

const content = {
  generatedAt: new Date().toISOString(),
  pages,
  posts,
  products,
  media,
};

fs.writeFileSync(path.join(outDir, "wp-content.json"), JSON.stringify(content, null, 2));
fs.writeFileSync(
  path.join(outDir, "questions-sample.json"),
  JSON.stringify(
    {
      total: questions.length,
      sampleSize: Math.min(120, questions.length),
      questions: questions.slice(0, 120),
      modules: [...new Set(questions.map((question) => question.module).filter(Boolean))].sort(),
    },
    null,
    2,
  ),
);

console.log(`Generated ${pages.length} pages, ${posts.length} posts, ${products.length} products.`);
console.log(`Generated ${questions.length} questions, sample exported to src/data/questions-sample.json.`);
