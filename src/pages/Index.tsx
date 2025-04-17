
import { useState, useEffect } from "react";
import { NewsArticle, NewsCategory } from "@/types/news";
import { getNewsArticles, searchNewsArticles } from "@/services/newsApi";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsGrid } from "@/components/NewsGrid";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { ThemeProvider } from "@/components/ThemeProvider";

const Index = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState<NewsCategory>("general");
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 6;

  const fetchNews = async (reset = false) => {
    try {
      setIsLoading(true);
      
      let response;
      const currentPage = reset ? 1 : page;
      
      if (searchQuery) {
        response = await searchNewsArticles(searchQuery, currentPage, pageSize);
      } else {
        response = await getNewsArticles(currentPage, pageSize, category);
      }
      
      const { articles: newArticles, totalResults } = response;
      
      // If resetting, replace articles, otherwise append
      if (reset) {
        setArticles(newArticles);
        setPage(1);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      }
      
      // Check if we've loaded all available articles
      setHasMore((currentPage * pageSize) < totalResults);
      
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNews(true);
  }, [category]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchNews(true); // Reset and search
  };

  // Handle category change
  const handleCategoryChange = (newCategory: NewsCategory) => {
    if (newCategory !== category) {
      setCategory(newCategory);
      setSearchQuery(""); // Clear search when changing category
    }
  };

  // Load more articles
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchNews();
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header onSearch={handleSearch} />
        <CategoryFilter 
          selectedCategory={category} 
          onCategoryChange={handleCategoryChange} 
        />
        
        <main className="flex-1 container">
          {searchQuery && (
            <div className="pt-6 pb-2">
              <h2 className="text-xl font-medium">
                Search results for: <span className="text-primary">{searchQuery}</span>
              </h2>
            </div>
          )}
          
          <NewsGrid articles={articles} isLoading={isLoading && page === 1} />
          
          <LoadMoreButton 
            onClick={handleLoadMore} 
            isLoading={isLoading && page > 1} 
            hasMore={hasMore} 
          />
        </main>
        
        <footer className="border-t py-6 bg-secondary/40">
          <div className="container">
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2025 Echo Brief. All rights reserved.</p>
              <p className="mt-2">
                Bringing you concise news from around the world.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
