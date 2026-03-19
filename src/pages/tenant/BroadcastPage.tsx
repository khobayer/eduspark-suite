import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { FilterBar } from "@/components/shared/FilterBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { broadcastMessages } from "@/data/tenant-data";
import { Radio, Send, MessageSquare, Mail, CheckCircle2, AlertTriangle, Plus } from "lucide-react";
import { motion } from "framer-motion";

const channelConfig: Record<string, { label: string; icon: typeof Send; color: string }> = {
  sms: { label: 'SMS', icon: MessageSquare, color: 'bg-info/10 text-info border-info/20' },
  whatsapp: { label: 'WhatsApp', icon: Send, color: 'bg-success/10 text-success border-success/20' },
  email: { label: 'Email', icon: Mail, color: 'bg-accent text-accent-foreground border-border' },
};

export default function BroadcastPage() {
  const [search, setSearch] = useState("");
  const sent = broadcastMessages.filter(m => m.status === 'sent').length;
  const totalDelivered = broadcastMessages.reduce((a, m) => a + m.deliveredCount, 0);
  const totalRecipients = broadcastMessages.filter(m => m.status === 'sent').reduce((a, m) => a + m.recipientCount, 0);

  const filtered = broadcastMessages.filter(
    m => m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Broadcast Center" titleBn="সম্প্রচার কেন্দ্র" description="Send SMS, WhatsApp, and email notifications to parents and staff">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />New Broadcast</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Messages Sent" titleBn="পাঠানো" value={sent} icon={Send} index={0} />
        <StatCard title="Total Delivered" titleBn="ডেলিভার্ড" value={totalDelivered.toLocaleString()} change={`${Math.round(totalDelivered / totalRecipients * 100)}% rate`} changeType="positive" icon={CheckCircle2} index={1} />
        <StatCard title="Scheduled" value={broadcastMessages.filter(m => m.status === 'scheduled').length} icon={Radio} index={2} />
        <StatCard title="Failed" value={broadcastMessages.filter(m => m.status === 'failed').length} icon={AlertTriangle} index={3} />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        {['all', 'sent', 'scheduled', 'draft'].map(tab => (
          <TabsContent key={tab} value={tab}>
            <FilterBar
              searchPlaceholder="Search messages..."
              searchValue={search}
              onSearchChange={setSearch}
              filters={[
                { key: 'channel', label: 'Channel', options: [{ label: 'SMS', value: 'sms' }, { label: 'WhatsApp', value: 'whatsapp' }, { label: 'Email', value: 'email' }] },
              ]}
              showExport={false}
            />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <Card>
                <CardContent className="p-0">
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered
                        .filter(m => tab === 'all' || m.status === tab)
                        .map(m => {
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
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
