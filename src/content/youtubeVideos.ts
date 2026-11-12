// Spark's YouTube videos and the page each one is embedded on.
//
// One source of truth for both the on-page embed (YouTubeEmbed) and the
// VideoObject structured data (schemaGraph.ts). A video with an empty
// youtubeId renders nothing and adds no schema, so a slot can be wired to its
// page before the video URL is known.

export type YouTubeVideoKey =
  | 'quickbooks'
  | 'demand'
  | 'textWithSparki'
  | 'threePL'
  | 'wholesale'
  | 'customerReturns'
  | 'foundations'
  | 'aiAssistant'
  | 'purchasing'
  | 'warehousing'
  | 'forecastFromExport';

export interface YouTubeVideo {
  /** 11 character id from the watch URL (youtube.com/watch?v=<id>). */
  youtubeId: string;
  /** Route path the video is embedded on, matching routeMeta. */
  pagePath: string;
  /** Other route paths that embed the same video. */
  alsoOn?: string[];
  /** Video title as published on YouTube. */
  name: string;
  /** Video description as published on YouTube. */
  description: string;
  /** Publish date on YouTube (YYYY-MM-DD). */
  uploadDate: string;
  /** ISO 8601 duration, e.g. PT2M30S. */
  duration?: string;
}

export const youtubeVideos: Record<YouTubeVideoKey, YouTubeVideo[]> = {
  quickbooks: [
    {
      youtubeId: 'UAXvTix7X4M',
      pagePath: '/features/accounting',
      alsoOn: ['/accountants'],
      name: 'QuickBooks Online Integration | Spark Inventory',
      description:
        'From inventory moves to accounting entries. Spark Inventory connects operational activity with QuickBooks Online: inventory asset entries, bills, invoices, payments, and cost of goods.',
      uploadDate: '2026-10-19',
      duration: 'PT36S',
    },
  ],
  demand: [
    {
      youtubeId: '7Z6vhlo30JE',
      pagePath: '/reduce-stockouts-overstock',
      alsoOn: ['/demand-forecasting-software'],
      name: 'Still Guessing What to Reorder? Meet Demand ESP | Spark Inventory',
      description:
        "Demand ESP is the forecasting inside Spark Inventory. It reads the sales history you already have and finds each item's own pattern to forecast what to reorder.",
      uploadDate: '2026-10-19',
      duration: 'PT31S',
    },
  ],
  textWithSparki: [
    {
      youtubeId: 'pjbzNf9D6vY',
      pagePath: '/text-with-sparki',
      name: 'Meet Spark Solo: Inventory Work by Text | Spark Inventory',
      description:
        'Your inventory work, by text. Supplier updates, purchase orders, reorder decisions, and Demand ESP signals in one conversation. Review the next move on your phone, then hand work off to Spark or your AI assistant.',
      uploadDate: '2026-10-19',
      duration: 'PT1M9S',
    },
  ],
  threePL: [
    {
      youtubeId: '__GiHXyAfag',
      pagePath: '/3pl',
      name: '3PL Inventory Control Tower | Spark Inventory',
      description:
        'Every client has its own demand pattern. This Spark tour moves from client health and demand risk to seasonal planning, forecast review, and purchasing.',
      uploadDate: '2026-10-19',
      duration: 'PT30S',
    },
  ],
  wholesale: [
    {
      youtubeId: 'NQpKVnfCJZw',
      pagePath: '/features/wholesale-suppliers',
      name: 'From Wholesale Order to Fulfillment | Spark Inventory',
      description:
        "Spark brings customer ordering and the operator's sales-order workflow into one platform, so the team can see the order, track its stage, and keep work moving through fulfillment.",
      uploadDate: '2026-10-19',
      duration: 'PT13S',
    },
  ],
  customerReturns: [
    {
      youtubeId: 'j7p2s_2Rxiw',
      pagePath: '/features/sales',
      name: 'Customer Returns: From Sales Order Back to Stock | Spark Inventory',
      description:
        'Start from the original sales order, record the returned units, review the return, and receive them into a warehouse location so on-hand stock updates.',
      uploadDate: '2026-10-19',
      duration: 'PT32S',
    },
  ],
  foundations: [
    {
      youtubeId: 'Lw32t5H0aAw',
      pagePath: '/',
      name: 'Getting Started with Spark Inventory | Foundations',
      description:
        'Getting started with Spark Inventory. Choose the tools you use, bring in your records, and select your goal. Foundations shows the steps for that goal.',
      uploadDate: '2026-10-19',
      duration: 'PT42S',
    },
  ],
  // Titles, descriptions, dates and lengths below were read from each video's
  // YouTube page on 2026-11-12.
  aiAssistant: [
    {
      youtubeId: '34fNYz0Jw44',
      pagePath: '/chatgpt-inventory-management',
      name: 'Connect ChatGPT or Claude to Your Inventory | Spark MCP',
      description:
        'Turn the files you already have into inventory you can act on. Connect ChatGPT, Claude, or your own compatible AI agent to Spark Inventory through MCP.',
      uploadDate: '2026-09-09',
      duration: 'PT30S',
    },
  ],
  purchasing: [
    {
      youtubeId: 'Qrb2BQNNXD0',
      pagePath: '/features/purchasing',
      name: 'What Should I Reorder? Watch Sparki Create a Purchase Order',
      description:
        'Your reorder list shouldn’t take all Monday. Watch Sparki turn a real inventory recommendation into a draft purchase order in Spark Inventory.',
      uploadDate: '2026-09-14',
      duration: 'PT1M28S',
    },
    {
      youtubeId: 'PbwjunN9EBY',
      pagePath: '/features/purchasing',
      name: 'Before You Reorder: Check Demand, Stock & Incoming Purchase Orders',
      description:
        'Before buying more inventory, check the full picture. In this Spark Inventory walkthrough, we review an item’s Demand ESP forecast and seasonal pattern, check warehouse stock, and open the purchase order already on the way.',
      uploadDate: '2026-09-16',
      duration: 'PT1M26S',
    },
  ],
  warehousing: [
    {
      youtubeId: 'F3Gg_TXw6kM',
      pagePath: '/features/warehousing',
      name: 'Before You Reorder, Check Your Other Warehouse | Spark Inventory',
      description:
        'One warehouse is running low. Another already has the stock. Before placing another purchase order, check whether a warehouse transfer can cover the need.',
      uploadDate: '2026-09-10',
      duration: 'PT1M25S',
    },
    {
      youtubeId: 'EB-0t7xw1lM',
      pagePath: '/features/warehousing',
      name: 'How to Receive a Partial Purchase Order | 50 Ordered, 46 Delivered',
      description:
        'Ordered 50 units, but only 46 arrived? Watch how to receive a partial purchase order in Spark Inventory, update stock accurately, and keep the remaining four units visible for follow-up.',
      uploadDate: '2026-09-11',
      duration: 'PT1M23S',
    },
  ],
  forecastFromExport: [
    {
      youtubeId: 'x81KcYjZkCI',
      pagePath: '/demand-forecasting-software',
      name: 'From Raw Inventory Export to Demand Forecast in Spark',
      description:
        'Your inventory data does not need to arrive in a perfect template. This walkthrough shows how Spark Inventory can start with an existing system export, make the mapped data and exceptions reviewable, preserve sales history, build item-level forecasts with Demand ESP, and carry the result into a reorder recommendation and draft purchase order.',
      uploadDate: '2026-09-23',
      duration: 'PT2M25S',
    },
  ],
};

export function publishedVideos(key: YouTubeVideoKey) {
  return youtubeVideos[key].filter((video) => video.youtubeId);
}

export function youtubeThumbnailUrl(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function youtubeEmbedUrl(youtubeId: string) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}`;
}

// VideoObject nodes for every published YouTube video on a route. The first
// keeps the plain #video id other pages use; later ones are numbered. Pages
// that already describe a self-hosted video pass offset 1 so ids stay unique.
export function buildYouTubeVideoSchema(siteUrl: string, routePath: string, offset = 0) {
  const pageUrl = routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}/`;
  return Object.values(youtubeVideos)
    .flat()
    .filter((video) => video.youtubeId && (video.pagePath === routePath || video.alsoOn?.includes(routePath)))
    .map((video, index) => {
      const position = index + offset;
      return {
        '@type': 'VideoObject',
        '@id': `${pageUrl}#video${position === 0 ? '' : `-${position + 1}`}`,
        name: video.name,
        description: video.description,
        thumbnailUrl: [youtubeThumbnailUrl(video.youtubeId)],
        embedUrl: youtubeEmbedUrl(video.youtubeId),
        url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
        uploadDate: video.uploadDate,
        ...(video.duration ? { duration: video.duration } : {}),
        inLanguage: 'en',
        publisher: { '@id': `${siteUrl}/#organization` },
        isPartOf: { '@id': `${pageUrl}#webpage` },
      };
    });
}
