import { useState, useMemo } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet, TrendingUp, AlertTriangle, Receipt, Plus, CreditCard,
  ArrowDownRight, PieChart as PieChartIcon,
} from "lucide-react";
import { financeStatsExtended } from "@/data/finance-data";
import { FinanceInvoicesTab } from "@/components/finance/FinanceInvoicesTab";
import { FinanceFeeCategoriesTab } from "@/components/finance/FinanceFeeCategoriesTab";
import { FinanceFeeStructureTab } from "@/components/finance/FinanceFeeStructureTab";
import { FinanceExpensesTab } from "@/components/finance/FinanceExpensesTab";
import { FinanceAnalyticsTab } from "@/components/finance/FinanceAnalyticsTab";
import { FinanceDueTrackerTab } from "@/components/finance/FinanceDueTrackerTab";
import { PaymentEntryDialog } from "@/components/finance/PaymentEntryDialog";
import { ReceiptPreviewDialog } from "@/components/finance/ReceiptPreviewDialog";

export default function FinancePage() {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receiptInvoiceId, setReceiptInvoiceId] = useState<string | null>(null);
  const stats = financeStatsExtended;

  const collectionGrowth = (((stats.thisMonthCollection - stats.lastMonthCollection) / stats.lastMonthCollection) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <PageHeader title="Finance" titleBn="আর্থিক" description="Fee management, invoices, payments, and expense tracking">
        <Button size="sm" onClick={() => setPaymentOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />Record Payment
        </Button>
        <Button size="sm" variant="outline" onClick={() => { setReceiptInvoiceId('1'); setReceiptOpen(true); }}>
          <Receipt className="h-4 w-4 mr-1" />View Receipt
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Collection" titleBn="মোট আদায়" value={`৳${(stats.totalCollection / 1000).toFixed(0)}k`} change={`+${collectionGrowth}% this month`} changeType="positive" icon={Wallet} index={0} />
        <StatCard title="This Month" titleBn="এই মাসের আদায়" value={`৳${(stats.thisMonthCollection / 1000).toFixed(0)}k`} change={`${stats.paidInvoices} invoices paid`} changeType="positive" icon={TrendingUp} index={1} />
        <StatCard title="Total Due" titleBn="মোট বকেয়া" value={`৳${(stats.totalDue / 1000).toFixed(0)}k`} change={`${stats.overdueInvoices} overdue invoices`} changeType="negative" icon={AlertTriangle} index={2} />
        <StatCard title="Total Expense" titleBn="মোট খরচ" value={`৳${(stats.totalExpense / 1000).toFixed(0)}k`} change={`৳${(stats.thisMonthExpense / 1000).toFixed(0)}k this month`} changeType="neutral" icon={ArrowDownRight} index={3} />
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger value="invoices" className="text-xs">Invoices</TabsTrigger>
            <TabsTrigger value="due-tracker" className="text-xs">Due Tracker</TabsTrigger>
            <TabsTrigger value="fee-categories" className="text-xs">Fee Categories</TabsTrigger>
            <TabsTrigger value="fee-structure" className="text-xs">Fee Structure</TabsTrigger>
            <TabsTrigger value="expenses" className="text-xs">Expenses</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="invoices"><FinanceInvoicesTab onViewReceipt={(id) => { setReceiptInvoiceId(id); setReceiptOpen(true); }} /></TabsContent>
        <TabsContent value="due-tracker"><FinanceDueTrackerTab /></TabsContent>
        <TabsContent value="fee-categories"><FinanceFeeCategoriesTab /></TabsContent>
        <TabsContent value="fee-structure"><FinanceFeeStructureTab /></TabsContent>
        <TabsContent value="expenses"><FinanceExpensesTab /></TabsContent>
        <TabsContent value="analytics"><FinanceAnalyticsTab /></TabsContent>
      </Tabs>

      <PaymentEntryDialog open={paymentOpen} onClose={() => setPaymentOpen(false)} />
      <ReceiptPreviewDialog open={receiptOpen} onClose={() => setReceiptOpen(false)} invoiceId={receiptInvoiceId} />
    </div>
  );
}
