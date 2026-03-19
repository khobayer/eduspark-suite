import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { tenants } from "@/data/mock-data";
import { Plus, Eye, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TenantListPage() {
  const [search, setSearch] = useState("");

  const filtered = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.nameBn.includes(search)
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Tenants" titleBn="প্রতিষ্ঠানসমূহ" description="Manage all registered institutions">
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Tenant
        </Button>
      </PageHeader>

      <FilterBar
        searchPlaceholder="Search tenants..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { key: 'mode', label: 'Mode', options: [{ label: '🏫 School', value: 'school' }, { label: '📚 Coaching', value: 'coaching' }] },
          { key: 'status', label: 'Status', options: [{ label: 'Active', value: 'active' }, { label: 'Suspended', value: 'suspended' }, { label: 'Trial', value: 'trial' }] },
          { key: 'plan', label: 'Plan', options: [{ label: 'Basic', value: 'basic' }, { label: 'Pro', value: 'pro' }, { label: 'Enterprise', value: 'enterprise' }] },
        ]}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">Institution</TableHead>
                  <TableHead className="text-xs">Mode</TableHead>
                  <TableHead className="text-xs">Plan</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-right">Students</TableHead>
                  <TableHead className="text-xs text-right">Teachers</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs">Since</TableHead>
                  <TableHead className="text-xs w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer">
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{t.name}</p>
                        <p className="text-[11px] text-muted-foreground">{t.nameBn}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[11px] font-normal">
                        {t.mode === 'school' ? '🏫 School' : '📚 Coaching'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm capitalize">{t.plan}</TableCell>
                    <TableCell><StatusBadge status={t.status} /></TableCell>
                    <TableCell className="text-right text-sm font-medium">{t.students.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm">{t.teachers}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.location}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
