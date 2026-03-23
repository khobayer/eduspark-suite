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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base font-semibold">{t("Interface Language", "ইন্টারফেস ভাষা")}</CardTitle>
                    <CardDescription className="text-xs">{t("Choose the primary language for the interface", "ইন্টারফেসের জন্য প্রাথমিক ভাষা নির্বাচন করুন")}</CardDescription>
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
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      lang === "en" ? "border-primary bg-accent/50" : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value="en" />
                    <div>
                      <p className="text-sm font-medium">English</p>
                      <p className="text-xs text-muted-foreground">Use English as the interface language</p>
                    </div>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      lang === "bn" ? "border-primary bg-accent/50" : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value="bn" />
                    <div>
                      <p className="text-sm font-medium">বাংলা</p>
                      <p className="text-xs text-muted-foreground">ইন্টারফেসের ভাষা হিসেবে বাংলা ব্যবহার করুন</p>
                    </div>
                  </label>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base font-semibold">{t("Label Display Mode", "লেবেল প্রদর্শন মোড")}</CardTitle>
                    <CardDescription className="text-xs">{t("Control how labels appear throughout the application", "অ্যাপ্লিকেশন জুড়ে লেবেলগুলি কীভাবে প্রদর্শিত হবে তা নিয়ন্ত্রণ করুন")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={labelMode}
                  onValueChange={(v) => setLabelMode(v as LabelDisplayMode)}
                  className="space-y-3"
                >
                  <label
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      labelMode === "en" ? "border-primary bg-accent/50" : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value="en" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">English Only</p>
                        {labelMode === "en" && <Badge variant="default" className="text-[10px]">Active</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">All labels shown in English</p>
                      <div className="mt-2 p-2 rounded bg-muted/50 text-xs">
                        <span className="font-medium">Preview:</span> Dashboard • Students • Attendance • Finance
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      labelMode === "bn" ? "border-primary bg-accent/50" : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value="bn" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Bangla Only / শুধু বাংলা</p>
                        {labelMode === "bn" && <Badge variant="default" className="text-[10px]">সক্রিয়</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">সকল লেবেল বাংলায় প্রদর্শিত</p>
                      <div className="mt-2 p-2 rounded bg-muted/50 text-xs">
                        <span className="font-medium">প্রিভিউ:</span> ড্যাশবোর্ড • শিক্ষার্থী • উপস্থিতি • আর্থিক
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      labelMode === "both" ? "border-primary bg-accent/50" : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <RadioGroupItem value="both" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Both Side by Side / উভয়</p>
                        {labelMode === "both" && <Badge variant="default" className="text-[10px]">Active</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">English and Bangla labels shown together</p>
                      <div className="mt-2 p-2 rounded bg-muted/50 text-xs">
                        <span className="font-medium">Preview:</span> Dashboard <span className="text-muted-foreground opacity-70">/ ড্যাশবোর্ড</span> • Students <span className="text-muted-foreground opacity-70">/ শিক্ষার্থী</span>
                      </div>
                    </div>
                  </label>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">{t("Scope & Coverage", "ব্যাপ্তি ও কভারেজ")}</CardTitle>
                <CardDescription className="text-xs">{t("The language settings apply across the following areas:", "ভাষার সেটিংস নিম্নলিখিত ক্ষেত্রে প্রযোজ্য:")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { en: "Sidebar Navigation", bn: "সাইডবার নেভিগেশন" },
                    { en: "Page Titles", bn: "পৃষ্ঠার শিরোনাম" },
                    { en: "Section Headings", bn: "সেকশন শিরোনাম" },
                    { en: "Form Labels", bn: "ফর্ম লেবেল" },
                    { en: "Table Headers", bn: "টেবিল হেডার" },
                    { en: "Button Labels", bn: "বাটন লেবেল" },
                    { en: "Status Badges", bn: "স্ট্যাটাস ব্যাজ" },
                    { en: "Filter Options", bn: "ফিল্টার অপশন" },
                    { en: "Breadcrumbs", bn: "ব্রেডক্রাম্ব" },
                  ].map((area) => (
                    <div key={area.en} className="flex items-center gap-2 p-2.5 rounded-md bg-muted/30 border">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-xs font-medium">{t(area.en, area.bn)}</span>
                    </div>
                  ))}
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
