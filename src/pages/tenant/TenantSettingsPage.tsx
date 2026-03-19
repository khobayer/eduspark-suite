import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { gradeScales, tenantRoles } from "@/data/tenant-data";
import { Settings, Palette, Tag, Award, Shield, Save, Building2, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function TenantSettingsPage() {
  const [mode, setMode] = useState<'school' | 'coaching'>('school');

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" titleBn="সেটিংস" description="Organization profile, branding, labels, grading, and permissions">
        <Button size="sm" onClick={() => toast.success("Settings saved!")}><Save className="h-4 w-4 mr-1" />Save All</Button>
      </PageHeader>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile">Organization / প্রতিষ্ঠান</TabsTrigger>
          <TabsTrigger value="branding">Branding / ব্র্যান্ডিং</TabsTrigger>
          <TabsTrigger value="labels">Labels / লেবেল</TabsTrigger>
          <TabsTrigger value="grading">Grading / গ্রেডিং</TabsTrigger>
          <TabsTrigger value="roles">Roles / ভূমিকা</TabsTrigger>
        </TabsList>

        {/* Organization Profile */}
        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base font-semibold">Organization Profile</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Institution Name (English)</Label>
                    <Input defaultValue="Dhaka Model School" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Institution Name (Bangla)</Label>
                    <Input defaultValue="ঢাকা মডেল স্কুল" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Institution Mode</Label>
                    <Select value={mode} onValueChange={(v) => setMode(v as 'school' | 'coaching')}>
                      <SelectTrigger className="bg-secondary border-0"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">🏫 School Mode</SelectItem>
                        <SelectItem value="coaching">📚 Coaching Mode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>EIIN Number</Label>
                    <Input defaultValue="123456" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Phone</Label>
                    <Input defaultValue="02-9876543" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input defaultValue="info@dms.edu.bd" className="bg-secondary border-0" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label>Address</Label>
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
                  <CardTitle className="text-base font-semibold">Branding & Appearance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground/40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Institution Logo</p>
                    <p className="text-xs text-muted-foreground mb-2">Used on report cards, invoices, and ID cards</p>
                    <Button size="sm" variant="outline"><Upload className="h-3.5 w-3.5 mr-1" />Upload Logo</Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-md bg-primary border" />
                      <Input defaultValue="#0d7466" className="bg-secondary border-0 flex-1" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Header Text</Label>
                    <Input defaultValue="Dhaka Model School" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Tagline / Motto</Label>
                    <Input defaultValue="Education for Enlightenment" className="bg-secondary border-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Tagline (Bangla)</Label>
                    <Input defaultValue="শিক্ষাই আলো" className="bg-secondary border-0" />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Preview — Report Card Header</p>
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

        {/* Labels */}
        <TabsContent value="labels">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base font-semibold">Custom Labels</CardTitle>
                    <p className="text-xs text-muted-foreground">Customize field labels across the platform. Changes affect all pages.</p>
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
                        <p className="text-sm font-medium text-foreground">{label.en} / {label.bn}</p>
                        <p className="text-[11px] text-muted-foreground">
                          Coaching mode: {label.coachingEn} / {label.coachingBn}
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
                    <CardTitle className="text-base font-semibold">Grading System / গ্রেডিং পদ্ধতি</CardTitle>
                    <p className="text-xs text-muted-foreground">Configure grade scales used in report cards and tabulation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Grade</TableHead>
                      <TableHead className="text-xs text-center">GPA</TableHead>
                      <TableHead className="text-xs text-center">Marks From</TableHead>
                      <TableHead className="text-xs text-center">Marks To</TableHead>
                      <TableHead className="text-xs">Range</TableHead>
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
                      <CardTitle className="text-base font-semibold">Roles & Permissions / ভূমিকা ও অনুমতি</CardTitle>
                      <p className="text-xs text-muted-foreground">Define access levels for different user types</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Add Role</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tenantRoles.map(role => (
                    <div key={role.id} className="p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold">{role.name}</h3>
                          <span className="text-xs text-muted-foreground">/ {role.nameBn}</span>
                          {role.isSystem && <Badge variant="secondary" className="text-[10px]">System</Badge>}
                        </div>
                        <span className="text-xs text-muted-foreground">{role.userCount} users</span>
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
