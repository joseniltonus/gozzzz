/**
 * JSON-LD para /blog/[slug] e /blog (índice).
 *
 * Por post: BlogPosting (recomendado pra blogs YMYL — substitui Article com
 * mais semântica), FAQPage local (do FAQ específico), BreadcrumbList,
 * Organization referenciada por @id.
 *
 * Para o índice: ItemList (lista de artigos) + Breadcrumb. Ajuda Google
 * a entender hierarquia e descobrir os posts mais rápido.
 */

import type { BlogPost } from '@/data/posts';
import { BLOG_AUTHOR } from '@/data/posts';

const ORG_ID = 'https://gozzzz.app/#org';
const BASE_URL = 'https://gozzzz.app';

export function buildBlogIndexSchemaGraph(posts: BlogPost[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/blog#collection`,
        url: `${BASE_URL}/blog`,
        name: 'Blog GoZzzz · Ciência do sono',
        description:
          'Artigos sobre sono, cronótipo, ritmo circadiano e neurociência aplicada — em português, com fundamento.',
        inLanguage: 'pt-BR',
        publisher: { '@id': ORG_ID },
        about: {
          '@type': 'Thing',
          name: 'Sleep medicine and circadian rhythms',
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: posts.length,
          itemListElement: posts.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${BASE_URL}/blog/${p.slug}`,
            name: p.title,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GoZzzz', item: `${BASE_URL}/web` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
        ],
      },
    ],
  };
}

export function buildBlogPostSchemaGraph(post: BlogPost): Record<string, unknown> {
  const url = `${BASE_URL}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#post`,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        headline: post.title,
        description: post.metaDescription,
        url,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: 'pt-BR',
        author: {
          '@type': 'Organization',
          '@id': ORG_ID,
          name: BLOG_AUTHOR.name,
          url: BASE_URL,
        },
        publisher: { '@id': ORG_ID },
        image: `${BASE_URL}/og/sono-plus.png`,
        articleSection: post.category,
        wordCount: estimateWordCount(post),
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: post.title,
        description: post.metaDescription,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/og/sono-plus.png`,
          width: 1200,
          height: 800,
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#post-headline', '#post-intro'],
        },
      },
      ...(post.faq.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: post.faq.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            },
          ]
        : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GoZzzz', item: `${BASE_URL}/web` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

function estimateWordCount(post: BlogPost): number {
  let count = (post.title + ' ' + post.intro).split(/\s+/).length;
  for (const block of post.body) {
    if ('text' in block && typeof block.text === 'string') {
      count += block.text.split(/\s+/).length;
    } else if ('items' in block) {
      for (const item of block.items) count += item.split(/\s+/).length;
    }
  }
  return count;
}
