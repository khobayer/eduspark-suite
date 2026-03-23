import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { systemSettings } from "@/data/super-admin-data";
import { Settings, UserPlus, Bell, Shield, Save } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const iconMap: Record<string, typeof Settings> = {
  general: Settings,
  registration: UserPlus,
  notifications: Bell,
  security: Shield,
};

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState(systemSettings);

  const updateSetting = (groupId: string, key: string, value: string | boolean | number) => {
    setSettings(prev =>
      prev.map(group =>
        group.id === groupId
          ? {
              ...group,
              settings: group.settings.map(s =>
                s.key === key ? { ...s, value } : s
              ),
            }
          : group
      )
    );
  };

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="System Settings" titleBn="সিস্টেম সেটিংস" description="Configure platform-wide settings and preferences" descriptionBn="প্ল্যাটফর্ম-ব্যাপী সেটিংস এবং পছন্দ কনফিগার করুন">
        <Button size="sm" onClick={handleSave}><Save className="h-4 w-4 mr-1" />Save Changes</Button>
      </PageHeader>

      {settings.map((group, i) => {
        const Icon = iconMap[group.id] || Settings;
        return (
          <motion.div key={group.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                    <Icon className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">{group.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{group.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-0">
                {group.settings.map((setting, j) => (
                  <div key={setting.key}>
                    {j > 0 && <Separator className="my-0" />}
                    <div className="flex items-center justify-between py-4 gap-8">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{setting.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{setting.description}</p>
                      </div>
                      <div className="shrink-0 w-[200px]">
                        {setting.type === 'toggle' && (
                          <div className="flex justify-end">
                            <Switch
                              checked={setting.value as boolean}
                              onCheckedChange={(v) => updateSetting(group.id, setting.key, v)}
                            />
                          </div>
                        )}
                        {setting.type === 'text' && (
                          <Input
                            value={setting.value as string}
                            onChange={(e) => updateSetting(group.id, setting.key, e.target.value)}
                            className="h-9 bg-secondary border-0"
                          />
                        )}
                        {setting.type === 'number' && (
                          <Input
                            type="number"
                            value={setting.value as number}
                            onChange={(e) => updateSetting(group.id, setting.key, parseInt(e.target.value) || 0)}
                            className="h-9 bg-secondary border-0"
                          />
                        )}
                        {setting.type === 'select' && (
                          <Select
                            value={setting.value as string}
                            onValueChange={(v) => updateSetting(group.id, setting.key, v)}
                          >
                            <SelectTrigger className="h-9 bg-secondary border-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {setting.options?.map(opt => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
