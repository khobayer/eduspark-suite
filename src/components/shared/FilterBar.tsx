import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, Download } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: FilterConfig[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onClear?: () => void;
  onExport?: () => void;
  showExport?: boolean;
}

export function FilterBar({
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  filters = [],
  filterValues = {},
  onFilterChange,
  onClear,
  onExport,
  showExport = true,
}: FilterBarProps) {
  const hasActiveFilters = searchValue || Object.values(filterValues).some((v) => v && v !== "all");

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-card border rounded-lg">
      <div className="relative flex-1 w-full sm:max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="pl-8 h-9 bg-secondary border-0"
        />
      </div>

      {filters.map((filter) => (
        <Select
          key={filter.key}
          value={filterValues[filter.key] || "all"}
          onValueChange={(value) => onFilterChange?.(filter.key, value)}
        >
          <SelectTrigger className="h-9 w-full sm:w-[150px] bg-secondary border-0">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All {filter.label}</SelectItem>
            {filter.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      <div className="flex items-center gap-2 ml-auto">
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-9 text-muted-foreground">
            <X className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        )}
        {showExport && (
          <Button variant="outline" size="sm" onClick={onExport} className="h-9">
            <Download className="h-3.5 w-3.5 mr-1" />
            Export
          </Button>
        )}
      </div>
    </div>
  );
}
