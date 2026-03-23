import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { financeInvoices } from "@/data/finance-data";
import { Printer, Download, CheckCircle } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface Props {
  open: boolean;
  onClose: () => void;
  invoiceId: string | null;
}

export function ReceiptPreviewDialog({ open, onClose, invoiceId }: Props) {
  const { t } = useLocale();
  const invoice = financeInvoices.find((i) => i.id === invoiceId);
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-base">Payment Receipt</DialogTitle>
        </DialogHeader>

        <div className="border rounded-lg p-5 space-y-4 bg-card">
          {/* Institution Header */}
          <div className="text-center space-y-1">
            <p className="font-bold text-foreground">Dhaka Model School</p>
            <p className="text-xs text-muted-foreground">ঢাকা মডেল স্কুল</p>
            <p className="text-[11px] text-muted-foreground">House 12, Road 5, Dhanmondi, Dhaka-1205</p>
          </div>

          <Separator />

          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Payment Receipt / পেমেন্ট রসিদ</p>
            <p className="text-sm font-mono text-muted-foreground mt-1">{invoice.receiptNo || `RCP-${invoice.id.padStart(3, "0")}`}</p>
          </div>

          <Separator />

          {/* Student Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[11px] text-muted-foreground">Student</p>
              <p className="font-medium text-foreground">{invoice.studentName}</p>
              <p className="text-[11px] text-muted-foreground">{invoice.studentNameBn}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-muted-foreground">ID</p>
              <p className="font-mono text-foreground">{invoice.studentId}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Class</p>
              <p className="text-foreground">{invoice.class} - {invoice.section}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-muted-foreground">Roll</p>
              <p className="text-foreground">{invoice.roll}</p>
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Invoice No</span>
              <span className="font-mono text-foreground">{invoice.invoiceNo}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee Head</span>
              <span className="text-foreground">{invoice.feeHead}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Month</span>
              <span className="text-foreground">{invoice.month}</span>
            </div>

            <Separator />

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="font-medium text-foreground">৳{invoice.amount.toLocaleString()}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-[hsl(var(--success))]">−৳{invoice.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-[hsl(var(--success))]">৳{invoice.paid.toLocaleString()}</span>
            </div>
            {invoice.due > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining Due</span>
                <span className="font-medium text-destructive">৳{invoice.due.toLocaleString()}</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="capitalize text-foreground">{invoice.paymentMethod || "Cash"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Date</span>
              <span className="text-foreground">{invoice.paidDate || "—"}</span>
            </div>
            {invoice.collectedBy && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Collected By</span>
                <span className="text-foreground">{invoice.collectedBy}</span>
              </div>
            )}
          </div>

          {invoice.status === "paid" && (
            <div className="flex items-center justify-center gap-2 text-[hsl(var(--success))] pt-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Fully Paid</span>
            </div>
          )}

          <p className="text-[10px] text-center text-muted-foreground pt-2">
            This is a computer-generated receipt. No signature is required.<br />
            এটি একটি কম্পিউটার জেনারেটেড রসিদ। স্বাক্ষরের প্রয়োজন নেই।
          </p>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1" />Download</Button>
          <Button size="sm"><Printer className="h-3.5 w-3.5 mr-1" />Print</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
