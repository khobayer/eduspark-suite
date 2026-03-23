import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { EmptyState } from "@/components/shared/EmptyState";
import { DetailDrawer } from "@/components/shared/DetailDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { templates, type Template } from "@/data/super-admin-data";
import { Plus, FileText, Eye, Edit, Copy, Trash2, CreditCard, IdCard, Award, Receipt } from "lucide-react";
import { motion } from "framer-motion";

const typeConfig: Record<string, { label: string; icon: typeof FileText; color: string }> = {
  report_card: { label: 'Report Card', icon: FileText, color: 'bg-info/10 text-info border-info/20' },
  invoice: { label: 'Invoice', icon: CreditCard, color: 'bg-success/10 text-success border-success/20' },
  id_card: { label: 'ID Card', icon: IdCard, color: 'bg-accent text-accent-foreground border-border' },
  admit_card: { label: 'Admit Card', icon: IdCard, color: 'bg-warning/10 text-warning border-warning/20' },
  certificate: { label: 'Certificate', icon: Award, color: 'bg-primary/10 text-primary border-primary/20' },
  receipt: { label: 'Receipt', icon: Receipt, color: 'bg-muted text-muted-foreground border-border' },
};

export default function TemplateManagerPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Template | null>(null);

  const filtered = templates.filter(
    (t) => t.name.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, Template[]>>((acc, t) => {
    if (!acc[t.type]) acc[t.type] = [];
    acc[t.type].push(t);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <PageHeader title="Template Manager" description="Manage report cards, invoices, ID cards, and certificate templates">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Template</Button>
      </PageHeader>

      <FilterBar
        searchPlaceholder="Search templates..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { key: 'type', label: 'Type', options: Object.entries(typeConfig).map(([value, { label }]) => ({ label, value })) },
          { key: 'status', label: 'Status', options: [{ label: 'Active', value: 'active' }, { label: 'Draft', value: 'draft' }, { label: 'Archived', value: 'archived' }] },
        ]}
        showExport={false}
      />

      {Object.keys(grouped).length === 0 ? (
        <Card>
          <CardContent className="p-0">
            <EmptyState
              icon={<FileText className="h-7 w-7 text-muted-foreground" />}
              title="No templates found"
              description="Try adjusting your search or filters"
            />
          </CardContent>
        </Card>
      ) : (
        Object.entries(grouped).map(([type, items]) => {
          const conf = typeConfig[type];
          return (
            <div key={type} className="space-y-3">
              <div className="flex items-center gap-2">
                <conf.icon className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">{conf.label}s</h2>
                <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((tmpl, i) => (
                  <motion.div key={tmpl.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Card className="border hover:shadow-sm transition-shadow group cursor-pointer" onClick={() => setSelected(tmpl)}>
                      <CardContent className="p-5">
                        <div className="h-28 rounded-lg bg-muted/50 border-2 border-dashed border-border mb-4 flex items-center justify-center">
                          <conf.icon className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="text-sm font-semibold text-foreground">{tmpl.name}</h3>
                            {tmpl.isDefault && (
                              <Badge variant="secondary" className="text-[10px] shrink-0">Default</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{tmpl.description}</p>
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${conf.color}`}>
                                {conf.label}
                              </span>
                              {tmpl.status === 'draft' && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border bg-warning/10 text-warning border-warning/20">
                                  Draft
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-muted-foreground">{tmpl.usedBy} tenants</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Detail Drawer */}
      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name || ""}
        description={selected ? typeConfig[selected.type]?.label : ""}
      >
        {selected && (
          <div className="space-y-5">
            <div className="h-40 rounded-lg bg-muted/50 border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Template Preview</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Type</p>
                <p className="font-medium">{typeConfig[selected.type]?.label}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Status</p>
                <p className="font-medium capitalize">{selected.status}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Used By</p>
                <p className="font-medium">{selected.usedBy} tenants</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Last Updated</p>
                <p className="font-medium">{selected.lastUpdated}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Default</p>
                <p className="font-medium">{selected.isDefault ? 'Yes' : 'No'}</p>
              </div>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">{selected.description}</p>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button size="sm" className="flex-1"><Edit className="h-3.5 w-3.5 mr-1" />Edit</Button>
              <Button size="sm" variant="outline"><Copy className="h-3.5 w-3.5 mr-1" />Clone</Button>
              <Button size="sm" variant="outline" className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-1" />Delete</Button>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
