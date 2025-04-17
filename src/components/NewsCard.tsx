
import { formatDistanceToNow } from "date-fns";
import { NewsArticle } from "@/types/news";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  // Map category to badge color
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "technology":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "business":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "entertainment":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      case "health":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "science":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "sports":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="group overflow-hidden h-full hover:shadow-md transition-all duration-300 animate-fade-up">
        {article.urlToImage && (
          <div className="h-48 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge 
              variant="outline" 
              className={getCategoryColor(article.category)}
            >
              {article.category || "News"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>
          <h3 className="text-lg font-semibold mt-2 line-clamp-2">
            {article.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pb-4">
          {article.description && (
            <p className="text-muted-foreground text-sm line-clamp-3">
              {article.description}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="border-t pt-3 flex justify-between text-xs text-muted-foreground">
          <span>
            {article.source.name}
          </span>
          {article.author && (
            <span>
              By {article.author}
            </span>
          )}
        </CardFooter>
      </Card>
    </a>
  );
}
