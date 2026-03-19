interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'dot';
}

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  paid: "bg-success/10 text-success border-success/20",
  present: "bg-success/10 text-success border-success/20",
  passed: "bg-success/10 text-success border-success/20",
  enrolled: "bg-success/10 text-success border-success/20",
  suspended: "bg-destructive/10 text-destructive border-destructive/20",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
  absent: "bg-destructive/10 text-destructive border-destructive/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  expelled: "bg-destructive/10 text-destructive border-destructive/20",
  trial: "bg-warning/10 text-warning border-warning/20",
  partial: "bg-warning/10 text-warning border-warning/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  late: "bg-warning/10 text-warning border-warning/20",
  inactive: "bg-muted text-muted-foreground border-border",
  graduated: "bg-info/10 text-info border-info/20",
  transferred: "bg-info/10 text-info border-info/20",
  open: "bg-info/10 text-info border-info/20",
  verified: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  closed: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const style = statusStyles[status.toLowerCase()] || "bg-muted text-muted-foreground border-border";

  if (variant === 'dot') {
    const dotColor = style.includes('success') ? 'bg-success' :
      style.includes('destructive') ? 'bg-destructive' :
      style.includes('warning') ? 'bg-warning' :
      style.includes('info') ? 'bg-info' : 'bg-muted-foreground';
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-foreground">
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
        {status}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${style}`}>
      {status}
    </span>
  );
}
