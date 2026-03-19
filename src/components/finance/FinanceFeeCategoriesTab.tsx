import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { feeCategories } from "@/data/finance-data";
import { Plus, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

const typeColors: Record<string, string> = {
  academic: "bg-primary/10 text-primary border-0",
  utility: "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))] border-0",
  "one-time": "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-0",
  recurring: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-0",
};

export function FinanceFeeCategoriesTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Organize fee heads into categories for structured billing</p>
        <Button size="sm" variant="outline"><Plus className="h-3.5 w-3.5 mr-1" />Add Category</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {feeCategories.map((cat, idx) => (
          <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className={`hover:shadow-md transition-shadow ${!cat.isActive ? "opacity-60" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <FolderOpen className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{cat.name}</p>
                      <p className="text-[11px] text-muted-foreground">{cat.nameBn}</p>
                    </div>
                  </div>
                  <Switch checked={cat.isActive} />
                </div>
                <p className="text-xs text-muted-foreground mb-3">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`text-[10px] ${typeColors[cat.type] || ""}`}>
                    {cat.type.replace("-", " ")}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{cat.feeHeadCount} fee heads</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
