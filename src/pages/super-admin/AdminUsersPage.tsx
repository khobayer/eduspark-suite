import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminUsers } from "@/data/super-admin-data";
import { Plus, MoreHorizontal, Shield, Edit, Trash2, Key } from "lucide-react";
import { motion } from "framer-motion";

const roleConfig: Record<string, { label: string; color: string }> = {
  super_admin: { label: 'Super Admin', color: 'bg-destructive/10 text-destructive border-destructive/20' },
  admin: { label: 'Admin', color: 'bg-info/10 text-info border-info/20' },
  support: { label: 'Support', color: 'bg-warning/10 text-warning border-warning/20' },
  viewer: { label: 'Viewer', color: 'bg-muted text-muted-foreground border-border' },
};

export default function AdminUsersPage() {
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

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">All Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
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
                {adminUsers.map((user) => {
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
                            <DropdownMenuItem className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" />Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
