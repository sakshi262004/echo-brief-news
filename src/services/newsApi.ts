
import { NewsArticle, NewsCategory } from "../types/news";

// Mock data for our news application
// In a real application, this would be replaced with actual API calls

const mockNewsArticles: NewsArticle[] = [
  {
    id: "1",
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Zack Whittaker",
    title: "Apple unveils new MacBook Pro with M3 chip, promising dramatic performance improvements",
    description: "Apple has announced its new MacBook Pro featuring the M3 chip, which the company claims offers dramatic performance improvements compared to its predecessor.",
    url: "https://example.com/article1",
    urlToImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    content: "Apple has announced its new MacBook Pro featuring the M3 chip...",
    category: "technology"
  },
  {
    id: "2",
    source: { id: "bbc-news", name: "BBC News" },
    author: "BBC News",
    title: "Global markets rally as inflation concerns ease",
    description: "Stock markets around the world have rallied after new data suggested inflation pressures might be easing in major economies.",
    url: "https://example.com/article2",
    urlToImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    content: "Stock markets around the world have rallied after new data suggested...",
    category: "business"
  },
  {
    id: "3",
    source: { id: "espn", name: "ESPN" },
    author: "John Smith",
    title: "Champions League: Liverpool secure dramatic win against Real Madrid",
    description: "Liverpool secured a dramatic 3-2 win against Real Madrid in their Champions League encounter at Anfield.",
    url: "https://example.com/article3",
    urlToImage: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?q=80&w=1780&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    content: "Liverpool secured a dramatic 3-2 win against Real Madrid...",
    category: "sports"
  },
  {
    id: "4",
    source: { id: "medical-news", name: "Medical News Today" },
    author: "Dr. Sarah Johnson",
    title: "New study reveals benefits of Mediterranean diet for heart health",
    description: "A comprehensive new study has reinforced the significant benefits of following a Mediterranean diet for long-term heart health and reduced risk of cardiovascular disease.",
    url: "https://example.com/article4",
    urlToImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    content: "A comprehensive new study has reinforced the significant benefits...",
    category: "health"
  },
  {
    id: "5",
    source: { id: "cnn", name: "CNN" },
    author: "Jessica Brown",
    title: "New streaming service gains 10 million subscribers in first month",
    description: "A new streaming platform has shattered industry expectations by gaining over 10 million subscribers within just one month of its launch.",
    url: "https://example.com/article5",
    urlToImage: "https://images.unsplash.com/photo-1518929458113-777257e3292a?q=80&w=1978&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    content: "A new streaming platform has shattered industry expectations...",
    category: "entertainment"
  },
  {
    id: "6",
    source: { id: "tech-news", name: "Tech News" },
    author: "Michael Chen",
    title: "Revolutionary quantum computing breakthrough could transform cryptography",
    description: "Scientists announce a major breakthrough in quantum computing that could fundamentally transform the field of cryptography and data security.",
    url: "https://example.com/article6",
    urlToImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
    content: "Scientists announce a major breakthrough in quantum computing...",
    category: "technology"
  },
  {
    id: "7",
    source: { id: "business-insider", name: "Business Insider" },
    author: "Emma Wilson",
    title: "Major tech company announces surprising acquisition of AI startup",
    description: "In an unexpected move, a leading tech company has announced the acquisition of a promising AI startup for $2.5 billion.",
    url: "https://example.com/article7",
    urlToImage: "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?q=80&w=2065&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    content: "In an unexpected move, a leading tech company has announced...",
    category: "business"
  },
  {
    id: "8",
    source: { id: "nature", name: "Nature" },
    author: "Dr. Robert Miller",
    title: "Researchers discover new species in unexplored rainforest region",
    description: "An international team of scientists has discovered several previously unknown species during an expedition to a remote rainforest region.",
    url: "https://example.com/article8",
    urlToImage: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=2074&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    content: "An international team of scientists has discovered several previously unknown species...",
    category: "science"
  }
];

// Function to get articles with pagination
export const getNewsArticles = async (
  page: number = 1, 
  pageSize: number = 5, 
  category?: NewsCategory
): Promise<{ articles: NewsArticle[], totalResults: number }> => {
  // Simulate API request latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredArticles = [...mockNewsArticles];
  
  if (category && category !== "general") {
    filteredArticles = filteredArticles.filter(article => article.category === category);
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  return {
    articles: paginatedArticles,
    totalResults: filteredArticles.length
  };
};

// Function to search articles
export const searchNewsArticles = async (
  query: string,
  page: number = 1,
  pageSize: number = 5
): Promise<{ articles: NewsArticle[], totalResults: number }> => {
  // Simulate API request latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const searchResults = mockNewsArticles.filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) || 
    (article.description && article.description.toLowerCase().includes(query.toLowerCase()))
  );
  
  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = searchResults.slice(startIndex, endIndex);
  
  return {
    articles: paginatedResults,
    totalResults: searchResults.length
  };
};
