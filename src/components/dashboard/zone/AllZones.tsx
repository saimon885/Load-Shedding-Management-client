"use client";

import Link from "next/link";
import { Building2, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Zone {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
  substation: {
    id: string;
  }[];
}

interface AllZonesProps {
  zones: Zone[];
}

const AllZones = ({ zones }: AllZonesProps) => {
  const router = useRouter();
  const handlegetSubstation = (zoneId: string) => {
    console.log("View Substations for zone:", zoneId);
    const params = new URLSearchParams({ zoneId: zoneId });
    router.push(
      `/dashboard/infrastructure/zone/substation?${params.toString()}`,
    );
  };
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Zone</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Substations</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {zones.length > 0 ? (
            zones.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="size-4 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium">{zone.name}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="font-mono text-xs text-muted-foreground">
                    {zone.code}
                  </span>
                </TableCell>

                <TableCell>
                  <p className="max-w-[250px] truncate text-sm text-muted-foreground">
                    {zone.description || "No description"}
                  </p>
                </TableCell>

                <TableCell>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-current" />
                    {zone.status}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {zone.substation?.length ?? 0}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      onClick={() => handlegetSubstation(zone.id)}
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      title="View"
                    >
                      <Eye className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      title="Edit"
                      onClick={() => {
                        console.log("Update zone:", zone.id);
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      title="Delete"
                      onClick={() => {
                        console.log("Delete zone:", zone.id);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      title="More"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-sm text-muted-foreground"
              >
                No zones found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllZones;
