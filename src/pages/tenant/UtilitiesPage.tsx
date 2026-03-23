import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notices, type Notice } from "@/data/tenant-data";
import { IdCard, CreditCard, FileText, Bell, Pin, Plus, Download, Printer, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";
import { LocaleLabel } from "@/components/shared/LocaleLabel";

const utilityTools = [
  { name: 'Student ID Card', nameBn: 'শিক্ষার্থী আইডি কার্ড', description: 'Generate photo ID cards for students', descriptionBn: 'শিক্ষার্থীদের জন্য ফটো আইডি কার্ড তৈরি করুন', icon: IdCard, color: 'bg-info/10 text-info' },
  { name: 'Admit Card', nameBn: 'প্রবেশপত্র', description: 'Generate exam admit cards with schedule', descriptionBn: 'সময়সূচী সহ পরীক্ষার প্রবেশপত্র তৈরি করুন', icon: CreditCard, color: 'bg-warning/10 text-warning' },
  { name: 'Transfer Certificate', nameBn: 'ছাড়পত্র', description: 'Generate TC for outgoing students', descriptionBn: 'বহিষ্কৃত শিক্ষার্থীদের জন্য TC তৈরি করুন', icon: FileText, color: 'bg-accent text-accent-foreground' },
  { name: 'Character Certificate', nameBn: 'চরিত্র সনদ', description: 'Generate character certificates', descriptionBn: 'চরিত্র সনদপত্র তৈরি করুন', icon: Award, color: 'bg-success/10 text-success' },
];

const categoryIcons: Record<string, string> = {
  general: '📋', academic: '📚', exam: '📝', event: '🎉', holiday: '🏖️',
};

export default function UtilitiesPage() {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader title="Utilities" titleBn="ইউটিলিটি" description="ID cards, admit cards, certificates, and notices" descriptionBn="আইডি কার্ড, প্রবেশপত্র, সনদপত্র এবং নোটিশ" />

      <Tabs defaultValue="generators" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generators"><LocaleLabel en="Generators" bn="জেনারেটর" /></TabsTrigger>
          <TabsTrigger value="notices"><LocaleLabel en="Notice Board" bn="নোটিশ বোর্ড" /></TabsTrigger>
        </TabsList>

        <TabsContent value="generators">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {utilityTools.map((tool, i) => (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="border hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-xl ${tool.color} flex items-center justify-center shrink-0`}>
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground">{tool.name}</h3>
                        <p className="text-xs text-muted-foreground mb-0.5">{tool.nameBn}</p>
                        <p className="text-xs text-muted-foreground">{tool.description}</p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="h-8 text-xs"><Printer className="h-3 w-3 mr-1" />Generate</Button>
                          <Button size="sm" variant="outline" className="h-8 text-xs"><Download className="h-3 w-3 mr-1" />Bulk Download</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notices" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Notice</Button>
          </div>
          {notices.map((notice, i) => (
            <motion.div key={notice.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className={`border ${notice.pinned ? 'border-primary/30 bg-primary/[0.02]' : ''}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{categoryIcons[notice.category]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground">{notice.title}</h3>
                        {notice.pinned && <Pin className="h-3 w-3 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{notice.titleBn}</p>
                      <p className="text-sm text-muted-foreground">{notice.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-[10px] font-normal capitalize">{notice.category}</Badge>
                        <span className="text-[11px] text-muted-foreground">{notice.date}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
