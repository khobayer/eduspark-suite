import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { DetailDrawer } from "@/components/shared/DetailDrawer";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { paymentRecords, billingStats, monthlyRevenueData, revenuByPlanData, type PaymentRecord } from "@/data/super-admin-data";
import { Wallet, TrendingUp, AlertTriangle, CreditCard, RefreshCw, Download, Eye, FileX } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const methodLabels: Record<string, string> = {
  bkash: 'bKash',
  nagad: 'Nagad',
  bank_transfer: 'Bank Transfer',
  card: 'Card',
  cash: 'Cash',
};

const methodColors: Record<string, string> = {
  bkash: 'bg-destructive/10 text-destructive border-destructive/20',
  nagad: 'bg-warning/10 text-warning border-warning/20',
  bank_transfer: 'bg-info/10 text-info border-info/20',
  card: 'bg-primary/10 text-primary border-primary/20',
  cash: 'bg-success/10 text-success border-success/20',
};

export default function BillingPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<PaymentRecord | null>(null);

  const filtered = paymentRecords.filter(
    (p) =>
      p.tenantName.toLowerCase().includes(search.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Billing & Payments" description="Track revenue, payments, and subscription billing">
        <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" />Export</Button>
        <Button size="sm"><RefreshCw className="h-4 w-4 mr-1" />Sync Payments</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={`৳${(billingStats.totalRevenue / 100000).toFixed(1)}L`} change={`+${billingStats.mrrGrowth}% MRR growth`} changeType="positive" icon={Wallet} index={0} />
        <StatCard title="This Month" value={`৳${(billingStats.thisMonthRevenue / 1000).toFixed(0)}k`} change={`${billingStats.activeSubscriptions} active subs`} changeType="positive" icon={TrendingUp} index={1} />
        <StatCard title="Pending" value={`৳${(billingStats.pendingPayments / 1000).toFixed(0)}k`} change="Awaiting confirmation" changeType="neutral" icon={AlertTriangle} index={2} />
        <StatCard title="Failed" value={`৳${(billingStats.failedPayments / 1000).toFixed(0)}k`} change={`${billingStats.churnRate}% churn rate`} changeType="negative" icon={CreditCard} index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Monthly Revenue Trend</CardTitle>
              <p className="text-xs text-muted-foreground">MRR growth over the past 6 months</p>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenueData}>
                    <defs>
                      <linearGradient id="billingRevGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13, border: '1px solid hsl(var(--border))' }} formatter={(value: number, name: string) => [`৳${value.toLocaleString()}`, name === 'revenue' ? 'Revenue' : name]} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#billingRevGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Revenue by Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenuByPlanData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={4} dataKey="value">
                      {revenuByPlanData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(value: number) => [`৳${value.toLocaleString()}`]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {revenuByPlanData.map((plan) => (
                  <div key={plan.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: plan.fill }} />
                      <span className="text-muted-foreground">{plan.name}</span>
                    </div>
                    <span className="font-medium">৳{(plan.value / 1000).toFixed(0)}k <span className="text-muted-foreground font-normal text-xs">({plan.count})</span></span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <FilterBar
        searchPlaceholder="Search by tenant or transaction ID..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { key: 'status', label: 'Status', options: [{ label: 'Completed', value: 'completed' }, { label: 'Pending', value: 'pending' }, { label: 'Failed', value: 'failed' }, { label: 'Refunded', value: 'refunded' }] },
          { key: 'method', label: 'Method', options: [{ label: 'bKash', value: 'bkash' }, { label: 'Nagad', value: 'nagad' }, { label: 'Bank Transfer', value: 'bank_transfer' }, { label: 'Card', value: 'card' }] },
          { key: 'plan', label: 'Plan', options: [{ label: 'Basic', value: 'Basic' }, { label: 'Pro', value: 'Pro' }, { label: 'Enterprise', value: 'Enterprise' }] },
        ]}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Payment Records</CardTitle>
              <span className="text-xs text-muted-foreground">{filtered.length} transactions</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <EmptyState
                icon={<FileX className="h-7 w-7 text-muted-foreground" />}
                title="No payments found"
                description="Try adjusting your search or filters"
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">Transaction</TableHead>
                    <TableHead className="text-xs">Tenant</TableHead>
                    <TableHead className="text-xs">Plan</TableHead>
                    <TableHead className="text-xs text-right">Amount</TableHead>
                    <TableHead className="text-xs">Method</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow key={p.id} className="cursor-pointer" onClick={() => setSelected(p)}>
                      <TableCell className="font-mono text-muted-foreground text-xs">{p.transactionId}</TableCell>
                      <TableCell className="text-sm font-medium">{p.tenantName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[11px] font-normal">{p.plan}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-right font-semibold">৳{p.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${methodColors[p.method] || 'bg-muted text-muted-foreground border-border'}`}>
                          {methodLabels[p.method]}
                        </span>
                      </TableCell>
                      <TableCell><StatusBadge status={p.status} /></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setSelected(p); }}>
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Payment Details"
        description={selected?.transactionId}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg text-foreground">{selected.tenantName}</p>
                <p className="text-sm text-muted-foreground">{selected.tenantId}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Transaction ID</p>
                <p className="font-mono font-medium text-xs">{selected.transactionId}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Amount</p>
                <p className="font-bold text-lg text-foreground">৳{selected.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Plan</p>
                <p className="font-medium">{selected.plan}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Payment Method</p>
                <p className="font-medium">{methodLabels[selected.method]}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Date</p>
                <p className="font-medium">{selected.date}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Invoice Period</p>
                <p className="font-medium">{selected.invoicePeriod}</p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1"><Download className="h-3.5 w-3.5 mr-1" />Download Receipt</Button>
              {selected.status === 'failed' && (
                <Button size="sm" className="flex-1"><RefreshCw className="h-3.5 w-3.5 mr-1" />Retry Payment</Button>
              )}
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
