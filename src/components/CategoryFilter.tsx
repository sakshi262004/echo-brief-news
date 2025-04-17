
import { Button } from "@/components/ui/button";
import { NewsCategory } from "@/types/news";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
}

export function CategoryFilter({ 
  selectedCategory,
  onCategoryChange 
}: CategoryFilterProps) {
  const categories: Array<{ value: NewsCategory; label: string }> = [
    { value: "general", label: "All" },
    { value: "business", label: "Business" },
    { value: "technology", label: "Technology" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "science", label: "Science" },
    { value: "sports", label: "Sports" }
  ];

  return (
    <div className="container py-4 border-b">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.value)}
            className={cn(
              "rounded-full whitespace-nowrap",
              selectedCategory === category.value && "bg-primary text-white"
            )}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
