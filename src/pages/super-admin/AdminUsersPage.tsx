import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminUsers } from "@/data/super-admin-data";
import { Plus, MoreHorizontal, Shield, Edit, Trash2, Key, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const roleConfig: Record<string, { label: string; color: string }> = {
  super_admin: { label: 'Super Admin', color: 'bg-destructive/10 text-destructive border-destructive/20' },
  admin: { label: 'Admin', color: 'bg-info/10 text-info border-info/20' },
  support: { label: 'Support', color: 'bg-warning/10 text-warning border-warning/20' },
  viewer: { label: 'Viewer', color: 'bg-muted text-muted-foreground border-border' },
};

const PAGE_SIZE = 10;

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [confirmAction, setConfirmAction] = useState<{ type: string; name: string } | null>(null);

  const filtered = adminUsers.filter((u) => {
    const matchSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !filterValues.role || filterValues.role === "all" || u.role === filterValues.role;
    const matchStatus = !filterValues.status || filterValues.status === "all" || u.status === filterValues.status;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleConfirm = () => {
    if (confirmAction?.type === 'deactivate') {
      toast.success(`${confirmAction.name} has been deactivated.`);
    }
    setConfirmAction(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Platform Users" description="Manage admin users and their access levels">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Invite User</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {Object.entries(roleConfig).map(([role, config]) => {
          const count = adminUsers.filter(u => u.role === role).length;
          return (
            <Card key={role} className="border">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                  <Shield className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}s</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <FilterBar
        searchPlaceholder="Search by name or email..."
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        filters={[
          { key: 'role', label: 'Role', options: Object.entries(roleConfig).map(([value, { label }]) => ({ label, value })) },
          { key: 'status', label: 'Status', options: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }] },
        ]}
        filterValues={filterValues}
        onFilterChange={(key, value) => { setFilterValues(prev => ({ ...prev, [key]: value })); setPage(1); }}
        onClear={() => { setSearch(""); setFilterValues({}); setPage(1); }}
        showExport={false}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">All Users</CardTitle>
              <span className="text-xs text-muted-foreground">{filtered.length} users</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <EmptyState
                icon={<UserX className="h-7 w-7 text-muted-foreground" />}
                title="No users found"
                description="Try adjusting your search or filters"
              />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">User</TableHead>
                      <TableHead className="text-xs">Email</TableHead>
                      <TableHead className="text-xs">Role</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Last Login</TableHead>
                      <TableHead className="text-xs">Created</TableHead>
                      <TableHead className="text-xs w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((user) => {
                      const rc = roleConfig[user.role];
                      return (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${rc.color}`}>
                              {rc.label}
                            </span>
                          </TableCell>
                          <TableCell><StatusBadge status={user.status} /></TableCell>
                          <TableCell className="text-xs text-muted-foreground">{user.lastLogin}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{user.createdAt}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                                <DropdownMenuItem><Key className="h-3.5 w-3.5 mr-2" />Reset Password</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => setConfirmAction({ type: 'deactivate', name: user.name })}
                                >
                                  <Trash2 className="h-3.5 w-3.5 mr-2" />Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                    </p>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="h-8" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                      <Button variant="outline" size="sm" className="h-8" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <ConfirmDialog
        open={!!confirmAction}
        onOpenChange={() => setConfirmAction(null)}
        title="Deactivate User"
        description={`Are you sure you want to deactivate "${confirmAction?.name}"? They will lose access to the platform.`}
        confirmLabel="Deactivate"
        variant="destructive"
        onConfirm={handleConfirm}
      />
    </div>
  );
}
