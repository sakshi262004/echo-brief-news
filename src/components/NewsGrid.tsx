
import { NewsArticle } from "@/types/news";
import { NewsCard } from "./NewsCard";

interface NewsGridProps {
  articles: NewsArticle[];
  isLoading?: boolean;
}

export function NewsGrid({ articles, isLoading }: NewsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index}
            className="animate-pulse bg-secondary rounded-lg h-96"
          />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-medium text-muted-foreground">
          No articles found
        </h3>
        <p className="mt-2 text-muted-foreground">
          Try changing your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {articles.map((article) => (
        <NewsCard key={article.id || article.url} article={article} />
      ))}
    </div>
  );
}
