import { useState, useMemo } from "react";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { expenses, expenseCategories } from "@/data/finance-data";
import { Plus, MoreHorizontal, Eye, Edit } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FinanceExpensesTab() {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchSearch = !search || e.description.toLowerCase().includes(search.toLowerCase()) || e.voucherNo.toLowerCase().includes(search.toLowerCase()) || e.paidTo.toLowerCase().includes(search.toLowerCase());
      const matchCat = !filterValues.category || filterValues.category === "all" || e.category === filterValues.category;
      const matchStatus = !filterValues.status || filterValues.status === "all" || e.status === filterValues.status;
      return matchSearch && matchCat && matchStatus;
    });
  }, [search, filterValues]);

  const totalExpense = filtered.reduce((a, e) => a + e.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Track institutional expenses, vouchers, and approvals</p>
        <Button size="sm" variant="outline"><Plus className="h-3.5 w-3.5 mr-1" />Add Expense</Button>
      </div>

      <FilterBar
        searchPlaceholder="Search expenses..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { key: "category", label: "Category", options: expenseCategories.map((c) => ({ label: c, value: c })) },
          { key: "status", label: "Status", options: [{ label: "Approved", value: "approved" }, { label: "Pending", value: "pending" }, { label: "Rejected", value: "rejected" }] },
        ]}
        filterValues={filterValues}
        onFilterChange={(k, v) => setFilterValues((p) => ({ ...p, [k]: v }))}
        onClear={() => { setSearch(""); setFilterValues({}); }}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">Voucher</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Category</TableHead>
                    <TableHead className="text-xs hidden md:table-cell">Description</TableHead>
                    <TableHead className="text-xs text-right">Amount</TableHead>
                    <TableHead className="text-xs hidden lg:table-cell">Paid To</TableHead>
                    <TableHead className="text-xs hidden lg:table-cell">Method</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((exp) => (
                    <TableRow key={exp.id} className="group">
                      <TableCell className="text-sm font-mono text-muted-foreground">{exp.voucherNo}</TableCell>
                      <TableCell className="text-sm">{exp.date}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{exp.category}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate hidden md:table-cell">{exp.description}</TableCell>
                      <TableCell className="text-sm text-right font-medium tabular-nums text-destructive">৳{exp.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{exp.paidTo}</TableCell>
                      <TableCell className="text-sm capitalize text-muted-foreground hidden lg:table-cell">{exp.paymentMethod}</TableCell>
                      <TableCell><StatusBadge status={exp.status === "approved" ? "paid" : exp.status} /></TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="px-4 py-3 border-t text-xs text-muted-foreground flex items-center justify-between">
              <span>{filtered.length} expenses</span>
              <span>Total: <span className="font-medium text-destructive">৳{totalExpense.toLocaleString()}</span></span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
