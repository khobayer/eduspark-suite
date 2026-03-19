import { useState, useMemo } from "react";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { financeInvoices } from "@/data/finance-data";
import { MoreHorizontal, Eye, Printer, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PAGE_SIZE = 8;

interface Props {
  onViewReceipt: (id: string) => void;
}

export function FinanceInvoicesTab({ onViewReceipt }: Props) {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return financeInvoices.filter((inv) => {
      const matchSearch = !search ||
        inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
        inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
        inv.studentId.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !filterValues.status || filterValues.status === "all" || inv.status === filterValues.status;
      const matchCategory = !filterValues.category || filterValues.category === "all" || inv.category === filterValues.category;
      const matchClass = !filterValues.class || filterValues.class === "all" || inv.class === filterValues.class;
      return matchSearch && matchStatus && matchCategory && matchClass;
    });
  }, [search, filterValues]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalAmount = filtered.reduce((a, i) => a + i.amount, 0);
  const totalDue = filtered.reduce((a, i) => a + i.due, 0);

  return (
    <div className="space-y-4">
      <FilterBar
        searchPlaceholder="Search by student, invoice no..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[
          { key: "status", label: "Status", options: [{ label: "Paid", value: "paid" }, { label: "Partial", value: "partial" }, { label: "Overdue", value: "overdue" }, { label: "Pending", value: "pending" }] },
          { key: "category", label: "Category", options: [{ label: "Academic", value: "Academic" }, { label: "Examination", value: "Examination" }, { label: "Facility", value: "Facility" }, { label: "Admission", value: "Admission" }] },
          { key: "class", label: "Class", options: [{ label: "Class 7", value: "Class 7" }, { label: "Class 8", value: "Class 8" }, { label: "Class 9", value: "Class 9" }, { label: "Class 10", value: "Class 10" }] },
        ]}
        filterValues={filterValues}
        onFilterChange={(k, v) => { setFilterValues((p) => ({ ...p, [k]: v })); setPage(1); }}
        onClear={() => { setSearch(""); setFilterValues({}); setPage(1); }}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">Invoice</TableHead>
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs hidden md:table-cell">Class</TableHead>
                    <TableHead className="text-xs hidden lg:table-cell">Fee Head</TableHead>
                    <TableHead className="text-xs text-right">Amount</TableHead>
                    <TableHead className="text-xs text-right hidden sm:table-cell">Paid</TableHead>
                    <TableHead className="text-xs text-right">Due</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs hidden lg:table-cell">Due Date</TableHead>
                    <TableHead className="text-xs w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.length === 0 ? (
                    <TableRow><TableCell colSpan={10} className="text-center py-12 text-muted-foreground">No invoices found.</TableCell></TableRow>
                  ) : paginated.map((inv) => (
                    <TableRow key={inv.id} className="group">
                      <TableCell className="text-sm font-mono text-muted-foreground">{inv.invoiceNo}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{inv.studentName}</p>
                          <p className="text-[11px] text-muted-foreground font-mono">{inv.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm hidden md:table-cell">{inv.class} - {inv.section}</TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{inv.feeHead}</TableCell>
                      <TableCell className="text-sm text-right font-medium tabular-nums">৳{inv.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-right tabular-nums hidden sm:table-cell text-[hsl(var(--success))]">৳{inv.paid.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-right tabular-nums font-medium">{inv.due > 0 ? <span className="text-destructive">৳{inv.due.toLocaleString()}</span> : <span className="text-muted-foreground">—</span>}</TableCell>
                      <TableCell><StatusBadge status={inv.status} /></TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{inv.dueDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onViewReceipt(inv.id)}><Printer className="h-3.5 w-3.5 mr-2" />View Receipt</DropdownMenuItem>
                            <DropdownMenuItem><CreditCard className="h-3.5 w-3.5 mr-2" />Record Payment</DropdownMenuItem>
                            <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary & Pagination */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 border-t gap-2">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Showing {filtered.length} invoices</span>
                <span>Total: <span className="font-medium text-foreground">৳{totalAmount.toLocaleString()}</span></span>
                {totalDue > 0 && <span>Due: <span className="font-medium text-destructive">৳{totalDue.toLocaleString()}</span></span>}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button key={i} variant={page === i + 1 ? "default" : "ghost"} size="icon" className="h-8 w-8 text-xs" onClick={() => setPage(i + 1)}>{i + 1}</Button>
                  ))}
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(page + 1)}><ChevronRight className="h-4 w-4" /></Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
