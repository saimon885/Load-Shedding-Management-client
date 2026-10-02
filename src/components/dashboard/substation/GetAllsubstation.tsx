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

interface substation {
  id: string;
  name: string;
  code: string;
  location: string;
  status: string;
  feeder: {
    id: string;
  }[];
}

interface AllSubstationsProps {
  substations: substation[];
}

const GetAllsubstation = ({ substations }: AllSubstationsProps) => {
  const router = useRouter();
  const handlegetFeeders = (substationId: string) => {
    const feeders = new URLSearchParams({ substationId: substationId });
    router.push(
      `/dashboard/infrastructure/zone/substation/feeders?${feeders.toString()}`,
    );
  };
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>substation</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Substations</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {substations.length > 0 ? (
            substations.map((substation) => (
              <TableRow key={substation.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="size-4 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium">{substation.name}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="font-mono text-xs text-muted-foreground">
                    {substation.code}
                  </span>
                </TableCell>

                <TableCell>
                  <p className="max-w-[250px] truncate text-sm text-muted-foreground">
                    {substation.location || "No location"}
                  </p>
                </TableCell>

                <TableCell>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-current" />
                    {substation.status}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {substation.feeder?.length ?? 0}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      onClick={() => handlegetFeeders(substation.id)}
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
                        console.log("Update substation:", substation.id);
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
                        console.log("Delete substation:", substation.id);
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
                No substations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetAllsubstation;
