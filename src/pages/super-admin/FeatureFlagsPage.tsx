import { useState } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { DetailDrawer } from "@/components/shared/DetailDrawer";
import { featureFlags, type FeatureFlag } from "@/data/super-admin-data";
import { Plus, ToggleRight, Layers, Zap, Palette, FlaskConical, Settings, Eye } from "lucide-react";
import { motion } from "framer-motion";

const categoryConfig: Record<string, { label: string; icon: typeof Layers; color: string }> = {
  module: { label: 'Module', icon: Layers, color: 'bg-info/10 text-info border-info/20' },
  integration: { label: 'Integration', icon: Zap, color: 'bg-warning/10 text-warning border-warning/20' },
  ui: { label: 'UI', icon: Palette, color: 'bg-accent text-accent-foreground border-border' },
  experimental: { label: 'Experimental', icon: FlaskConical, color: 'bg-destructive/10 text-destructive border-destructive/20' },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  enabled: { label: 'Enabled', color: 'bg-success/10 text-success border-success/20' },
  disabled: { label: 'Disabled', color: 'bg-muted text-muted-foreground border-border' },
  beta: { label: 'Beta', color: 'bg-warning/10 text-warning border-warning/20' },
};

export default function FeatureFlagsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<FeatureFlag | null>(null);
  const [flags, setFlags] = useState(featureFlags);

  const filtered = flags.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.key.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFlag = (id: string) => {
    setFlags(prev => prev.map(f =>
      f.id === id ? { ...f, status: f.status === 'enabled' ? 'disabled' : 'enabled' } : f
    ));
  };

  const enabledCount = flags.filter(f => f.status === 'enabled').length;
  const betaCount = flags.filter(f => f.status === 'beta').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Feature Flags" titleBn="ফিচার ফ্ল্যাগ" description="Toggle features per plan, per tenant, or globally" descriptionBn="প্ল্যান, প্রতিষ্ঠান বা গ্লোবালি ফিচার টগল করুন">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Flag</Button>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-success/10 flex items-center justify-center">
              <ToggleRight className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{enabledCount}</p>
              <p className="text-xs text-muted-foreground">Enabled</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-warning/10 flex items-center justify-center">
              <FlaskConical className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{betaCount}</p>
              <p className="text-xs text-muted-foreground">In Beta</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{flags.length - enabledCount - betaCount}</p>
              <p className="text-xs text-muted-foreground">Disabled</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
              <Layers className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{flags.length}</p>
              <p className="text-xs text-muted-foreground">Total Flags</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <FilterBar
        searchPlaceholder="Search flags by name or key..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { key: 'category', label: 'Category', options: [{ label: 'Module', value: 'module' }, { label: 'Integration', value: 'integration' }, { label: 'UI', value: 'ui' }, { label: 'Experimental', value: 'experimental' }] },
          { key: 'status', label: 'Status', options: [{ label: 'Enabled', value: 'enabled' }, { label: 'Disabled', value: 'disabled' }, { label: 'Beta', value: 'beta' }] },
        ]}
        showExport={false}
      />

      {/* Feature Flag Cards */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-0">
            <EmptyState
              icon={<ToggleRight className="h-7 w-7 text-muted-foreground" />}
              title="No flags found"
              description="Try adjusting your search or filters"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((flag, i) => {
            const cat = categoryConfig[flag.category];
            const st = statusConfig[flag.status];
            return (
              <motion.div key={flag.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="border hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-foreground">{flag.name}</h3>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${st.color}`}>
                            {st.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{flag.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${cat.color}`}>
                            {cat.label}
                          </span>
                          <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono text-muted-foreground">{flag.key}</code>
                          {flag.isGlobal && (
                            <Badge variant="secondary" className="text-[10px] h-5">Global</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-3 text-[11px] text-muted-foreground">
                          {flag.enabledForPlans.length > 0 && (
                            <span>Plans: {flag.enabledForPlans.join(', ')}</span>
                          )}
                          {flag.enabledForTenants.length > 0 && (
                            <span>+{flag.enabledForTenants.length} specific tenants</span>
                          )}
                          <span>Updated: {flag.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Switch
                          checked={flag.status === 'enabled' || flag.status === 'beta'}
                          onCheckedChange={() => toggleFlag(flag.id)}
                        />
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelected(flag)}>
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Detail Drawer */}
      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name || ""}
        description={selected?.key}
      >
        {selected && (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="text-sm text-foreground">{selected.description}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Category</p>
                <p className="font-medium capitalize">{selected.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Status</p>
                <p className="font-medium capitalize">{selected.status}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Global</p>
                <p className="font-medium">{selected.isGlobal ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Last Updated</p>
                <p className="font-medium">{selected.lastUpdated}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Enabled For Plans</p>
              <div className="flex gap-2 flex-wrap">
                {selected.enabledForPlans.length > 0 ? selected.enabledForPlans.map(p => (
                  <Badge key={p} variant="secondary">{p}</Badge>
                )) : <p className="text-xs text-muted-foreground">No specific plans</p>}
              </div>
            </div>
            {selected.enabledForTenants.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Specific Tenants</p>
                <div className="flex gap-2 flex-wrap">
                  {selected.enabledForTenants.map(t => (
                    <Badge key={t} variant="outline" className="font-mono text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">Edit Flag</Button>
              <Button size="sm" variant="destructive" className="flex-1">Delete</Button>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
