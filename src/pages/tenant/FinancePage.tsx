import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { invoices, feeHeads, financeStats, collectionChartData } from "@/data/mock-data-extended";
import { Wallet, TrendingUp, AlertTriangle, Receipt, Plus, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function FinancePage() {
  const [search, setSearch] = useState("");

  const filtered = invoices.filter(
    (inv) =>
      inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Finance" titleBn="আর্থিক" description="Fee management, invoices, and expense tracking">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Invoice</Button>
        <Button size="sm" variant="outline"><Receipt className="h-4 w-4 mr-1" />Record Payment</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Collection" titleBn="মোট আদায়" value={`৳${(financeStats.totalCollection / 1000).toFixed(0)}k`} change="+8.2% vs last month" changeType="positive" icon={Wallet} index={0} />
        <StatCard title="This Month" titleBn="এই মাসে" value={`৳${(financeStats.thisMonthCollection / 1000).toFixed(0)}k`} icon={TrendingUp} index={1} />
        <StatCard title="Total Due" titleBn="মোট বকেয়া" value={`৳${(financeStats.totalDue / 1000).toFixed(0)}k`} change={`${financeStats.overdueInvoices} overdue`} changeType="negative" icon={AlertTriangle} index={2} />
        <StatCard title="Paid Invoices" titleBn="পরিশোধিত" value={financeStats.paidInvoices} icon={CreditCard} index={3} />
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices / চালান</TabsTrigger>
          <TabsTrigger value="fee-structure">Fee Structure / ফি কাঠামো</TabsTrigger>
          <TabsTrigger value="analytics">Analytics / বিশ্লেষণ</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <FilterBar
            searchPlaceholder="Search by student or invoice..."
            searchValue={search}
            onSearchChange={setSearch}
            filters={[
              { key: 'status', label: 'Status', options: [{ label: 'Paid', value: 'paid' }, { label: 'Partial', value: 'partial' }, { label: 'Overdue', value: 'overdue' }, { label: 'Pending', value: 'pending' }] },
              { key: 'feeHead', label: 'Fee Head', options: [{ label: 'Tuition Fee', value: 'tuition' }, { label: 'Exam Fee', value: 'exam' }, { label: 'Lab Fee', value: 'lab' }] },
            ]}
          />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Invoice</TableHead>
                      <TableHead className="text-xs">Student</TableHead>
                      <TableHead className="text-xs">Class</TableHead>
                      <TableHead className="text-xs">Fee Head</TableHead>
                      <TableHead className="text-xs text-right">Amount</TableHead>
                      <TableHead className="text-xs text-right">Paid</TableHead>
                      <TableHead className="text-xs text-right">Due</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((inv) => (
                      <TableRow key={inv.id} className="cursor-pointer">
                        <TableCell className="text-sm font-mono text-muted-foreground">{inv.invoiceNo}</TableCell>
                        <TableCell className="text-sm font-medium">{inv.studentName}</TableCell>
                        <TableCell className="text-sm">{inv.class}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{inv.feeHead}</TableCell>
                        <TableCell className="text-sm text-right font-medium">৳{inv.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-right text-success">৳{inv.paid.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-right font-medium text-destructive">{inv.due > 0 ? `৳${inv.due.toLocaleString()}` : '—'}</TableCell>
                        <TableCell><StatusBadge status={inv.status} /></TableCell>
                        <TableCell className="text-sm text-muted-foreground">{inv.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="fee-structure">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Fee Heads / ফি হেড</CardTitle>
                  <Button size="sm" variant="outline"><Plus className="h-3.5 w-3.5 mr-1" />Add Fee Head</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Name</TableHead>
                      <TableHead className="text-xs">Bangla Name</TableHead>
                      <TableHead className="text-xs text-right">Amount (৳)</TableHead>
                      <TableHead className="text-xs">Frequency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeHeads.map((fh) => (
                      <TableRow key={fh.id}>
                        <TableCell className="text-sm font-medium">{fh.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{fh.nameBn}</TableCell>
                        <TableCell className="text-sm text-right font-medium">৳{fh.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm capitalize text-muted-foreground">{fh.frequency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">Collection vs Expense</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={collectionChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} formatter={(value: number) => [`৳${value.toLocaleString()}`]} />
                        <Bar dataKey="collection" fill="hsl(172, 66%, 30%)" radius={[4, 4, 0, 0]} name="Collection" />
                        <Bar dataKey="expense" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Expense" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">Monthly Collection Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={collectionChartData}>
                        <defs>
                          <linearGradient id="collectionGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(172, 66%, 30%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(172, 66%, 30%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} formatter={(value: number) => [`৳${value.toLocaleString()}`]} />
                        <Area type="monotone" dataKey="collection" stroke="hsl(172, 66%, 30%)" fill="url(#collectionGrad)" strokeWidth={2} name="Collection" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
