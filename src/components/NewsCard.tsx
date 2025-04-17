
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

  // Simplified category color mapping for brown tones
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "technology":
        return "bg-secondary/20 text-secondary-foreground";
      case "business":
        return "bg-accent/20 text-accent-foreground";
      case "entertainment":
        return "bg-primary/20 text-primary-foreground";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="group overflow-hidden h-full hover:shadow-md transition-all duration-300 animate-fade-up border-border/50">
        {article.urlToImage && (
          <div className="h-48 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale-[20%] group-hover:grayscale-0"
            />
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge 
              variant="outline" 
              className={`${getCategoryColor(article.category)} border-border/50`}
            >
              {article.category || "News"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>
          <h3 className="text-lg font-medium mt-2 line-clamp-2 text-foreground">
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
        
        <CardFooter className="border-t border-border/50 pt-3 flex justify-between text-xs text-muted-foreground">
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
