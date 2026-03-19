import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

const studentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  nameBn: z.string().optional(),
  class: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  roll: z.coerce.number().min(1, "Roll is required"),
  gender: z.enum(["male", "female"]),
  dob: z.string().min(1, "Date of birth is required"),
  phone: z.string().optional(),
  bloodGroup: z.string().optional(),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z.string().min(11, "Valid phone required"),
  guardianRelation: z.string().optional(),
  address: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

export default function StudentCreatePage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = (data: StudentFormData) => {
    console.log("Student data:", data);
    toast.success("Student created successfully!", { description: `${data.name} has been enrolled.` });
    navigate("/tenant/students");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="New Student" titleBn="নতুন শিক্ষার্থী" description="Enroll a new student into the institution">
        <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/students")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </PageHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Personal Information / ব্যক্তিগত তথ্য
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="e.g. Ahmed Khan" {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nameBn">Name in Bangla / বাংলায় নাম</Label>
                  <Input id="nameBn" placeholder="যেমন: আহমেদ খান" {...register("nameBn")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input id="dob" type="date" {...register("dob")} />
                  {errors.dob && <p className="text-xs text-destructive">{errors.dob.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Gender *</Label>
                  <Select onValueChange={(v) => setValue("gender", v as "male" | "female")}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male / ছেলে</SelectItem>
                      <SelectItem value="female">Female / মেয়ে</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-xs text-destructive">{errors.gender.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="01XXXXXXXXX" {...register("phone")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select onValueChange={(v) => setValue("bloodGroup", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Academic Details / একাডেমিক তথ্য
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>Class *</Label>
                  <Select onValueChange={(v) => setValue("class", v)}>
                    <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                    <SelectContent>
                      {[6, 7, 8, 9, 10].map(c => (
                        <SelectItem key={c} value={`Class ${c}`}>Class {c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.class && <p className="text-xs text-destructive">{errors.class.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Section *</Label>
                  <Select onValueChange={(v) => setValue("section", v)}>
                    <SelectTrigger><SelectValue placeholder="Section" /></SelectTrigger>
                    <SelectContent>
                      {['A', 'B', 'C'].map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.section && <p className="text-xs text-destructive">{errors.section.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="roll">Roll Number *</Label>
                  <Input id="roll" type="number" placeholder="1" {...register("roll")} />
                  {errors.roll && <p className="text-xs text-destructive">{errors.roll.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Guardian Information / অভিভাবকের তথ্য
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="guardianName">Guardian Name *</Label>
                  <Input id="guardianName" placeholder="e.g. Karim Khan" {...register("guardianName")} />
                  {errors.guardianName && <p className="text-xs text-destructive">{errors.guardianName.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                  <Input id="guardianPhone" placeholder="01XXXXXXXXX" {...register("guardianPhone")} />
                  {errors.guardianPhone && <p className="text-xs text-destructive">{errors.guardianPhone.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Relation</Label>
                  <Select onValueChange={(v) => setValue("guardianRelation", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">Father / বাবা</SelectItem>
                      <SelectItem value="mother">Mother / মা</SelectItem>
                      <SelectItem value="guardian">Other Guardian / অভিভাবক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Full address" {...register("address")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate("/tenant/students")}>Cancel</Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-1" />
            Save Student
          </Button>
        </div>
      </form>
    </div>
  );
}
