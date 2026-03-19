import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { feeStructure } from "@/data/finance-data";
import { Plus, Edit, Check, X } from "lucide-react";
import { motion } from "framer-motion";

const frequencyLabel: Record<string, string> = {
  monthly: "Monthly", quarterly: "Quarterly", yearly: "Yearly", "per-exam": "Per Exam", "one-time": "One-time",
};

export function FinanceFeeStructureTab() {
  const grouped = feeStructure.reduce((acc, item) => {
    if (!acc[item.categoryName]) acc[item.categoryName] = [];
    acc[item.categoryName].push(item);
    return acc;
  }, {} as Record<string, typeof feeStructure>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Define fee amounts per class, frequency, and waiverability</p>
        <Button size="sm" variant="outline"><Plus className="h-3.5 w-3.5 mr-1" />Add Fee Head</Button>
      </div>

      {Object.entries(grouped).map(([category, items], idx) => (
        <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">{category}</CardTitle>
                <Badge variant="secondary" className="text-[10px]">{items.length} items</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">Fee Head</TableHead>
                    <TableHead className="text-xs hidden sm:table-cell">Bangla</TableHead>
                    <TableHead className="text-xs text-right">Amount (৳)</TableHead>
                    <TableHead className="text-xs hidden md:table-cell">Frequency</TableHead>
                    <TableHead className="text-xs hidden lg:table-cell">Applicable To</TableHead>
                    <TableHead className="text-xs hidden md:table-cell text-center">Waivable</TableHead>
                    <TableHead className="text-xs text-center">Active</TableHead>
                    <TableHead className="text-xs w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm font-medium">{item.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">{item.nameBn}</TableCell>
                      <TableCell className="text-sm text-right font-medium tabular-nums">৳{item.amount.toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="text-[10px]">{frequencyLabel[item.frequency]}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {item.applicableTo.map((c) => (
                            <Badge key={c} variant="secondary" className="text-[10px] h-5">{c.replace("Class ", "C")}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        {item.isWaivable ? <Check className="h-4 w-4 text-[hsl(var(--success))] mx-auto" /> : <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={item.isActive ? "active" : "inactive"} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
