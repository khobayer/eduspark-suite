import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { gradeScales, tenantRoles } from "@/data/tenant-data";
import { Settings, Palette, Tag, Award, Shield, Save, Building2, Upload, Globe, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLocale, type LabelDisplayMode, type InterfaceLang } from "@/contexts/LocaleContext";
import { LocaleLabel } from "@/components/shared/LocaleLabel";

export default function TenantSettingsPage() {
  const [mode, setMode] = useState<'school' | 'coaching'>('school');
  const { lang, labelMode, setLang, setLabelMode, t } = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" titleBn="সেটিংস" description="Organization profile, branding, labels, grading, and permissions" descriptionBn="প্রতিষ্ঠানের প্রোফাইল, ব্র্যান্ডিং, লেবেল, গ্রেডিং এবং অনুমতি">
        <Button size="sm" onClick={() => toast.success(t("Settings saved!", "সেটিংস সংরক্ষিত!"))}><Save className="h-4 w-4 mr-1" />{t("Save All", "সব সংরক্ষণ")}</Button>
      </PageHeader>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile"><LocaleLabel en="Organization" bn="প্রতিষ্ঠান" /></TabsTrigger>
          <TabsTrigger value="branding"><LocaleLabel en="Branding" bn="ব্র্যান্ডিং" /></TabsTrigger>
          <TabsTrigger value="language"><LocaleLabel en="Language" bn="ভাষা" /></TabsTrigger>
          <TabsTrigger value="labels"><LocaleLabel en="Labels" bn="লেবেল" /></TabsTrigger>
          <TabsTrigger value="grading"><LocaleLabel en="Grading" bn="গ্রেডিং" /></TabsTrigger>
          <TabsTrigger value="roles"><LocaleLabel en="Roles" bn="ভূমিকা" /></TabsTrigger>
        </TabsList>

        {/* Organization Profile */}
        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base font-semibold">{t("Organization Profile", "প্রতিষ্ঠানের তথ্য")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>{t("Institution Name (English)", "প্রতিষ্ঠানের নাম (ইংরেজি)")}</Label>
                    <Input defaultValue="Dhaka Model School" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("Institution Name (Bangla)", "প্রতিষ্ঠানের নাম (বাংলা)")}</Label>
                    <Input defaultValue="ঢাকা মডেল স্কুল" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("Institution Mode", "প্রতিষ্ঠানের ধরন")}</Label>
                    <Select value={mode} onValueChange={(v) => setMode(v as 'school' | 'coaching')}>
                      <SelectTrigger className="bg-secondary border-0"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">🏫 {t("School Mode", "স্কুল মোড")}</SelectItem>
                        <SelectItem value="coaching">📚 {t("Coaching Mode", "কোচিং মোড")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("EIIN Number", "ইআইআইএন নম্বর")}</Label>
                    <Input defaultValue="123456" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("Phone", "ফোন")}</Label>
                    <Input defaultValue="02-9876543" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("Email", "ইমেইল")}</Label>
                    <Input defaultValue="info@dms.edu.bd" className="bg-secondary border-0" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label>{t("Address", "ঠিকানা")}</Label>
                    <Input defaultValue="123 Education Road, Dhanmondi, Dhaka-1205" className="bg-secondary border-0" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Branding */}
        <TabsContent value="branding">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base font-semibold">{t("Branding & Appearance", "ব্র্যান্ডিং ও চেহারা")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground/40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t("Institution Logo", "প্রতিষ্ঠানের লোগো")}</p>
                    <p className="text-xs text-muted-foreground mb-2">{t("Used on report cards, invoices, and ID cards", "রিপোর্ট কার্ড, চালান এবং আইডি কার্ডে ব্যবহৃত")}</p>
                    <Button size="sm" variant="outline"><Upload className="h-3.5 w-3.5 mr-1" />{t("Upload Logo", "লোগো আপলোড")}</Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>{t("Primary Color", "প্রাথমিক রঙ")}</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-md bg-primary border" />
                      <Input defaultValue="#0d7466" className="bg-secondary border-0 flex-1" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("Header Text", "হেডার টেক্সট")}</Label>
                    <Input defaultValue="Dhaka Model School" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("Tagline / Motto", "ট্যাগলাইন / মূলমন্ত্র")}</Label>
                    <Input defaultValue="Education for Enlightenment" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("Tagline (Bangla)", "ট্যাগলাইন (বাংলা)")}</Label>
                    <Input defaultValue="শিক্ষাই আলো" className="bg-secondary border-0" />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">{t("Preview — Report Card Header", "প্রিভিউ — রিপোর্ট কার্ড হেডার")}</p>
                  <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                    <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">D</div>
                    <div>
                      <p className="font-bold text-sm">Dhaka Model School</p>
                      <p className="text-[11px] text-muted-foreground">ঢাকা মডেল স্কুল</p>
                      <p className="text-[10px] text-muted-foreground italic">Education for Enlightenment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Language & Localization */}
        <TabsContent value="language">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* App Language */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">App Language</CardTitle>
                    <CardDescription className="text-sm mt-0.5">Choose the main language of the dashboard.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={lang}
                  onValueChange={(v) => setLang(v as InterfaceLang)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      lang === "en" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value="en" />
                    <p className="text-sm font-medium">English</p>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      lang === "bn" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value="bn" />
                    <p className="text-sm font-medium">বাংলা</p>
                  </label>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Text Style */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Languages className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">Text Style</CardTitle>
                    <CardDescription className="text-sm mt-0.5">Choose how labels appear across menus, forms, and tables.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <RadioGroup
                  value={labelMode}
                  onValueChange={(v) => setLabelMode(v as LabelDisplayMode)}
                  className="space-y-3"
                >
                  {([
                    { value: "en", label: "English", desc: "All labels in English" },
                    { value: "bn", label: "বাংলা", desc: "সকল লেবেল বাংলায়" },
                    { value: "both", label: "English + বাংলা", desc: "Show both languages side by side" },
                  ] as const).map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        labelMode === opt.value ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} />
                      <div>
                        <p className="text-sm font-medium">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>

                {/* Live Preview */}
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-3">Live Preview</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { en: "Dashboard", bn: "ড্যাশবোর্ড" },
                      { en: "Students", bn: "শিক্ষার্থী" },
                      { en: "Admission", bn: "ভর্তি" },
                      { en: "Finance", bn: "আর্থিক" },
                      { en: "Attendance", bn: "উপস্থিতি" },
                    ].map((item) => (
                      <span
                        key={item.en}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-background border text-sm font-medium"
                      >
                        {labelMode === "en" && item.en}
                        {labelMode === "bn" && item.bn}
                        {labelMode === "both" && (
                          <>
                            {item.en}
                            <span className="text-muted-foreground font-normal ml-1.5 text-[0.85em] opacity-60">/ {item.bn}</span>
                          </>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Labels */}
        <TabsContent value="labels">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base font-semibold">{t("Custom Labels", "কাস্টম লেবেল")}</CardTitle>
                    <p className="text-xs text-muted-foreground">{t("Customize field labels across the platform. Changes affect all pages.", "প্ল্যাটফর্ম জুড়ে লেবেল কাস্টমাইজ করুন। পরিবর্তনগুলি সকল পৃষ্ঠায় প্রতিফলিত হবে।")}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    { en: 'Class', bn: 'শ্রেণি', coachingEn: 'Program', coachingBn: 'প্রোগ্রাম' },
                    { en: 'Section', bn: 'শাখা', coachingEn: 'Group', coachingBn: 'গ্রুপ' },
                    { en: 'Roll', bn: 'রোল', coachingEn: 'ID', coachingBn: 'আইডি' },
                    { en: 'Teacher', bn: 'শিক্ষক', coachingEn: 'Instructor', coachingBn: 'প্রশিক্ষক' },
                    { en: 'Guardian', bn: 'অভিভাবক', coachingEn: 'Guardian', coachingBn: 'অভিভাবক' },
                    { en: 'Exam', bn: 'পরীক্ষা', coachingEn: 'Test', coachingBn: 'পরীক্ষা' },
                  ].map(label => (
                    <div key={label.en} className="flex items-center justify-between py-2.5 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{t(label.en, label.bn)}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {t(`Coaching: ${label.coachingEn}`, `কোচিং: ${label.coachingBn}`)}
                        </p>
                      </div>
                      <Input defaultValue={mode === 'school' ? label.en : label.coachingEn} className="w-[120px] h-8 text-sm bg-secondary border-0" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Grading */}
        <TabsContent value="grading">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base font-semibold">{t("Grading System", "গ্রেডিং পদ্ধতি")}</CardTitle>
                    <p className="text-xs text-muted-foreground">{t("Configure grade scales used in report cards and tabulation", "রিপোর্ট কার্ড এবং ট্যাবুলেশনে ব্যবহৃত গ্রেড স্কেল কনফিগার করুন")}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">{t("Grade", "গ্রেড")}</TableHead>
                      <TableHead className="text-xs text-center">{t("GPA", "জিপিএ")}</TableHead>
                      <TableHead className="text-xs text-center">{t("Marks From", "নম্বর শুরু")}</TableHead>
                      <TableHead className="text-xs text-center">{t("Marks To", "নম্বর শেষ")}</TableHead>
                      <TableHead className="text-xs">{t("Range", "পরিসর")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradeScales.map(g => (
                      <TableRow key={g.grade}>
                        <TableCell>
                          <Badge variant={g.gpa >= 4 ? 'default' : g.gpa >= 3 ? 'secondary' : 'outline'} className="font-bold">
                            {g.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold">{g.gpa.toFixed(2)}</TableCell>
                        <TableCell className="text-center">{g.marksFrom}</TableCell>
                        <TableCell className="text-center">{g.marksTo}</TableCell>
                        <TableCell>
                          <Progress value={g.marksTo} className="h-2 w-24" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-base font-semibold">{t("Roles & Permissions", "ভূমিকা ও অনুমতি")}</CardTitle>
                      <p className="text-xs text-muted-foreground">{t("Define access levels for different user types", "বিভিন্ন ব্যবহারকারীর অ্যাক্সেস লেভেল নির্ধারণ করুন")}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">{t("Add Role", "ভূমিকা যোগ করুন")}</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tenantRoles.map(role => (
                    <div key={role.id} className="p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold">{t(role.name, role.nameBn)}</h3>
                          {role.isSystem && <Badge variant="secondary" className="text-[10px]">{t("System", "সিস্টেম")}</Badge>}
                        </div>
                        <span className="text-xs text-muted-foreground">{role.userCount} {t("users", "ব্যবহারকারী")}</span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {role.permissions.slice(0, 4).map(p => (
                          <Badge key={p} variant="outline" className="text-[10px] font-normal">{p.replace(/_/g, ' ')}</Badge>
                        ))}
                        {role.permissions.length > 4 && <Badge variant="outline" className="text-[10px]">+{role.permissions.length - 4}</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
