import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLocale } from "@/contexts/LocaleContext";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { overdueStudents, financeStatsExtended } from "@/data/finance-data";
import { AlertTriangle, Phone, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

export function FinanceDueTrackerTab() {
  const stats = financeStatsExtended;
  const totalOverdue = overdueStudents.reduce((a, s) => a + s.totalDue, 0);

  return (
    <div className="space-y-6">
      {/* Due Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Overdue Amount", value: `৳${totalOverdue.toLocaleString()}`, sub: `${overdueStudents.length} students`, color: "text-destructive" },
          { label: "Overdue Invoices", value: stats.overdueInvoices, sub: "Require follow-up", color: "text-[hsl(var(--warning))]" },
          { label: "Collection Rate", value: `${stats.collectionRate}%`, sub: "Current month", color: "text-[hsl(var(--success))]" },
        ].map((item, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-[11px] text-muted-foreground">{item.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Overdue Students List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <CardTitle className="text-sm font-semibold">{t("Overdue Students", "বকেয়া শিক্ষার্থী")}</CardTitle>
              </div>
              <Button size="sm" variant="outline">
                <Send className="h-3.5 w-3.5 mr-1" />Send Reminders
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs hidden md:table-cell">Class</TableHead>
                    <TableHead className="text-xs text-right">Total Due</TableHead>
                    <TableHead className="text-xs hidden sm:table-cell text-center">Months</TableHead>
                    <TableHead className="text-xs hidden lg:table-cell">Invoices</TableHead>
                    <TableHead className="text-xs hidden lg:table-cell">Last Payment</TableHead>
                    <TableHead className="text-xs">Severity</TableHead>
                    <TableHead className="text-xs w-24">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueStudents.map((s) => {
                    const severity = s.overdueMonths >= 3 ? "critical" : s.overdueMonths >= 2 ? "high" : "medium";
                    const severityColor = severity === "critical" ? "bg-destructive/10 text-destructive border-destructive/20" : severity === "high" ? "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/20" : "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))] border-[hsl(var(--info))]/20";
                    return (
                      <TableRow key={s.studentId}>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-destructive/10 text-destructive text-xs">
                                {s.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{s.name}</p>
                              <p className="text-[11px] text-muted-foreground font-mono">{s.studentId}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm hidden md:table-cell">{s.class} - {s.section}</TableCell>
                        <TableCell className="text-sm text-right font-bold tabular-nums text-destructive">৳{s.totalDue.toLocaleString()}</TableCell>
                        <TableCell className="hidden sm:table-cell text-center">
                          <Badge variant="outline" className="text-[10px]">{s.overdueMonths} month{s.overdueMonths > 1 ? "s" : ""}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{s.invoiceCount} invoices</TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{s.lastPaymentDate || "Never"}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${severityColor}`}>
                            {severity}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Call Guardian">
                              <Phone className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Send SMS">
                              <MessageSquare className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
