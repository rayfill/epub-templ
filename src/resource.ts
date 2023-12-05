import hogan, { type Template } from 'hogan.js';

interface EpubContext {
  constants: {
    bookStyle: string;
    mimetype: string;
    container: string;
    cover: string;
  },
  templates: {
    contentOpf: Template;
    nav: Template;
    info: Template;
    index: Template;
    section: Template;
    exp: Template;
    toc: Template;
  }
}

export type ContentOpfSection = {
  section_id: string;
}
export type Image = {
  image_type: string; // jpeg | png
  image_id: string; // identity
  image_media_type: string; // mime-type
}
export type ContentOpfInput = {
  book_link: string;
  book_title: string;
  author: string;
  book_modified_time: string;
  sections: Array<ContentOpfSection>;
  images: Array<Image>;
}
export function createContentOpf(context: EpubContext, input: ContentOpfInput) {
  return context.templates.contentOpf.render(input);
}

export type NavChapter = {
  chapter?: {
    chapter_level: number;
    chapter_name: string;
  };
  sections: Array<NavSection>
}
export type NavSection = {
  section_id: string;
  section_title: string;
}
export type NavInput = {
  book_title: string;
  chapters: Array<NavSection>;
}
export function createNav(context: EpubContext, input: NavInput) {
  return context.templates.nav.render(input);
}

export type InfoInput = {
  book_title: string; // 作品タイトル
  author: string; // 作者
  book_link: string; // 作品URL
  book_modified_time: string; // 作成日時
}
export function createInfo(context: EpubContext, input: InfoInput) {
  return context.templates.info.render(input);
}

export type IndexHeader = {
  level: number;
  chapter_name: string;
}
export type IndexContent = {
  chapter?: {
    chapter_name: string;
    level: number;
  };
  sections: Array<IndexSection>;
}
export type IndexSection = {
  section_id: string; // xhtml href
  section_title: string; // section title
}
export type IndexInput = {
  contents: Array<IndexContent>;
}
export function createIndex(context: EpubContext, input: IndexInput) {
  return context.templates.index.render(input);
}

export type SectionBody = {
  paragraph: string;
}
export type SectionInput = {
  section_title: string;
  preface?: string;
  chapter_title?: string;
  headline: string;
  body: Array<SectionBody>;
  postscript?: string;
}
const brPattern = /<br>/gi;
function replaceBR(txt: string) {
    return txt.replace(brPattern, '<br/>');
}

// const rubyPattern = new RegExp('</?rb>', 'gi');
// function removeRuby(txt: string) {
//     return txt.replace(rubyPattern, '');
// }
export function createSection(context: EpubContext, input: SectionInput) {
  return replaceBR(context.templates.section.render(input));
}

export type ExpParagraph = string;
export type ExpInput = {
  body: Array<ExpParagraph>;
}
export function createExp(context: EpubContext, input: ExpInput) {
  return context.templates.exp.render(input);
}

export type TocSection = {
  index: number;
  section_title: string;
  section_id: string;
}
export type TocInput = {
  book_link: string;
  book_title: string;
  sections: Array<TocSection>;
}
export function createToc(context: EpubContext, input: TocInput) {
  return context.templates.toc.render(input);
}


import contentOpfTemplateFile from '../OEBPS/content.opf.templ?raw';
import navTemplateFile from '../OEBPS/xhtml/nav.xhtml.templ?raw';
import infoTemplateFile from '../OEBPS/xhtml/info.xhtml.templ?raw';
import indexTemplateFile from '../OEBPS/xhtml/index.xhtml.templ?raw';
import sectionTemplateFile from '../OEBPS/xhtml/section.xhtml.templ?raw';
import expTemplateFile from '../OEBPS/xhtml/exp.xhtml.templ?raw';
import tocTemplateFile from '../OEBPS/toc.ncx.templ?raw';
import bookStyle from '../OEBPS/style/book-style.css?raw';
import mimetype from '../mimetype?raw';
import container from '../META-INF/container.xml?raw';
import cover from '../OEBPS/xhtml/cover.xhtml?raw';

export async function setup(): Promise<EpubContext> {
   return {
     constants: {
      bookStyle,
      mimetype,
      container,
      cover,
     },
     templates: {
       contentOpf: hogan.compile(contentOpfTemplateFile, { asString: false }),
       nav: hogan.compile(navTemplateFile, { asString: false }),
       info: hogan.compile(infoTemplateFile, { asString: false }),
       index: hogan.compile(indexTemplateFile, { asString: false }),
       section: hogan.compile(sectionTemplateFile, { asString: false }),
       exp: hogan.compile(expTemplateFile, { asString: false }),
       toc: hogan.compile(tocTemplateFile, { asString: false }),
     }
   };
}
