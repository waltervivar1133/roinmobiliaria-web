import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "a",
  "blockquote",
  "figure",
  "figcaption",
  "img",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "br",
  "hr",
];

const normalizeText = (value: string) =>
  value.replace(/\s+/g, " ").trim().toLocaleLowerCase("es");

export function normalizeBlogContent(html: string, title: string): string {
  const normalizedTitle = normalizeText(title);

  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: [
        "src",
        "srcset",
        "sizes",
        "alt",
        "width",
        "height",
        "loading",
        "decoding",
      ],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    nestingLimit: 50,
    transformTags: {
      h1: "h2",
      h5: "h2",
      h6: "h2",
      img: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          loading: "lazy",
          decoding: "async",
        },
      }),
    },
    exclusiveFilter: (frame) => {
      const text = normalizeText(frame.text);

      if (/^h[1-6]$/.test(frame.tag) && text === normalizedTitle) {
        return true;
      }

      if (frame.tag === "p" && !text && frame.mediaChildren.length === 0) {
        return true;
      }

      if (frame.tag === "a" && !text && frame.mediaChildren.includes("img")) {
        return "excludeTag";
      }

      return false;
    },
  });
}
