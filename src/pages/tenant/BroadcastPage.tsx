import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { broadcastMessages } from "@/data/tenant-data";
import { Radio, Send, MessageSquare, Mail, CheckCircle2, AlertTriangle, Plus, MoreHorizontal, Eye, Copy, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";
import { LocaleLabel } from "@/components/shared/LocaleLabel";
import { toast } from "sonner";

const channelConfig: Record<string, { label: string; icon: typeof Send; color: string }> = {
  sms: { label: 'SMS', icon: MessageSquare, color: 'bg-info/10 text-info border-info/20' },
  whatsapp: { label: 'WhatsApp', icon: Send, color: 'bg-success/10 text-success border-success/20' },
  email: { label: 'Email', icon: Mail, color: 'bg-accent text-accent-foreground border-border' },
};

export default function BroadcastPage() {
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const sent = broadcastMessages.filter(m => m.status === 'sent').length;
  const totalDelivered = broadcastMessages.reduce((a, m) => a + m.deliveredCount, 0);
  const totalRecipients = broadcastMessages.filter(m => m.status === 'sent').reduce((a, m) => a + m.recipientCount, 0);

  const filtered = broadcastMessages.filter(
    m => m.subject.toLowerCase().includes(search.toLowerCase())
  );

  const renderTable = (messages: typeof broadcastMessages) => {
    if (messages.length === 0) {
      return (
        <EmptyState
          icon={<MessageSquare className="h-7 w-7 text-muted-foreground" />}
          title="No messages found"
          description="Try adjusting your search or create a new broadcast"
          actionLabel="New Broadcast"
          onAction={() => toast.info("Create broadcast dialog coming soon")}
        />
      );
    }
    return (
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs">Subject</TableHead>
            <TableHead className="text-xs">Channel</TableHead>
            <TableHead className="text-xs">Recipients</TableHead>
            <TableHead className="text-xs text-right">Sent</TableHead>
            <TableHead className="text-xs text-right">Delivered</TableHead>
            <TableHead className="text-xs">Status</TableHead>
            <TableHead className="text-xs">Time</TableHead>
            <TableHead className="text-xs w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map(m => {
            const ch = channelConfig[m.channel];
            return (
              <TableRow key={m.id} className="cursor-pointer">
                <TableCell className="text-sm font-medium">{m.subject}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${ch.color}`}>
                    {ch.label}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{m.recipients}</TableCell>
                <TableCell className="text-sm text-right font-medium">{m.recipientCount}</TableCell>
                <TableCell className="text-sm text-right">{m.deliveredCount > 0 ? m.deliveredCount : '—'}</TableCell>
                <TableCell><StatusBadge status={m.status} /></TableCell>
                <TableCell className="text-xs text-muted-foreground">{m.sentAt || '—'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Details</DropdownMenuItem>
                      <DropdownMenuItem><Copy className="h-3.5 w-3.5 mr-2" />Duplicate</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setConfirmDelete(m.subject)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-2" />Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader title="Broadcast Center" titleBn="সম্প্রচার কেন্দ্র" description="Send SMS, WhatsApp, and email notifications to parents and staff" descriptionBn="অভিভাবক ও কর্মচারীদের কাছে SMS, WhatsApp এবং ইমেইল বিজ্ঞপ্তি পাঠান">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />{t("New Broadcast", "নতুন সম্প্রচার")}</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Messages Sent" titleBn="পাঠানো বার্তা" value={sent} icon={Send} index={0} />
        <StatCard title="Total Delivered" titleBn="মোট ডেলিভার্ড" value={totalDelivered.toLocaleString()} change={totalRecipients > 0 ? `${Math.round(totalDelivered / totalRecipients * 100)}% rate` : ''} changeType="positive" icon={CheckCircle2} index={1} />
        <StatCard title="Scheduled" titleBn="নির্ধারিত" value={broadcastMessages.filter(m => m.status === 'scheduled').length} icon={Radio} index={2} />
        <StatCard title="Failed" titleBn="ব্যর্থ" value={broadcastMessages.filter(m => m.status === 'failed').length} icon={AlertTriangle} index={3} />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all"><LocaleLabel en="All Messages" bn="সব বার্তা" /></TabsTrigger>
          <TabsTrigger value="sent"><LocaleLabel en="Sent" bn="পাঠানো" /></TabsTrigger>
          <TabsTrigger value="scheduled"><LocaleLabel en="Scheduled" bn="নির্ধারিত" /></TabsTrigger>
          <TabsTrigger value="draft"><LocaleLabel en="Drafts" bn="খসড়া" /></TabsTrigger>
        </TabsList>

        {['all', 'sent', 'scheduled', 'draft'].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <FilterBar
              searchPlaceholder="Search messages..."
              searchValue={search}
              onSearchChange={setSearch}
              filters={[
                { key: 'channel', label: 'Channel', options: [{ label: 'SMS', value: 'sms' }, { label: 'WhatsApp', value: 'whatsapp' }, { label: 'Email', value: 'email' }] },
              ]}
              showExport={false}
            />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardContent className="p-0">
                  {renderTable(
                    filtered.filter(m => tab === 'all' || m.status === tab)
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      <ConfirmDialog
        open={!!confirmDelete}
        onOpenChange={() => setConfirmDelete(null)}
        title="Delete Broadcast"
        description={`Are you sure you want to delete "${confirmDelete}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => { toast.success("Broadcast deleted."); setConfirmDelete(null); }}
      />
    </div>
  );
}
