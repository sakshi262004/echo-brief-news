
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  hasMore: boolean;
}

export function LoadMoreButton({ 
  onClick, 
  isLoading = false,
  hasMore
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="flex justify-center py-6">
        <p className="text-sm text-muted-foreground">
          You've reached the end of the news feed
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-6">
      <Button 
        onClick={onClick} 
        disabled={isLoading}
        size="lg"
        className="relative"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : (
          "Load more"
        )}
      </Button>
    </div>
  );
}
