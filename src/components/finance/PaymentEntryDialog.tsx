import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function PaymentEntryDialog({ open, onClose }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment recorded successfully!", { description: "Receipt has been generated." });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Record Payment / পেমেন্ট রেকর্ড
          </DialogTitle>
          <DialogDescription>Enter payment details against an invoice or student</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Invoice No</Label>
              <Input placeholder="INV-2025-XXX" />
            </div>
            <div className="space-y-1.5">
              <Label>Student ID</Label>
              <Input placeholder="STU-2024-XXX" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Amount (৳) *</Label>
              <Input type="number" placeholder="5000" required />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Date *</Label>
              <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Payment Method *</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash / নগদ</SelectItem>
                  <SelectItem value="bkash">bKash</SelectItem>
                  <SelectItem value="nagad">Nagad</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Transaction ID</Label>
              <Input placeholder="Reference/TXN ID" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Discount (৳)</Label>
            <Input type="number" placeholder="0" />
          </div>

          <div className="space-y-1.5">
            <Label>Note / মন্তব্য</Label>
            <Textarea placeholder="Optional payment note..." rows={2} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
