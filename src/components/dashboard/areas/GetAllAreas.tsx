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

interface area {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
  priority: string;
}

interface AllAreasProps {
  areas: area[];
}

const GetAllAreas = ({ areas }: AllAreasProps) => {
  const router = useRouter();
  //   const handlegetAreas = (areaId: string) => {
  //     const areas = new URLSearchParams({ areaId: areaId });
  //     router.push(
  //       `/dashboard/infrastructure/zone/substation/areas/area?${areas.toString()}`,
  //     );
  //   };
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Areas</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {areas.length > 0 ? (
            areas.map((area) => (
              <TableRow key={area.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="size-4 text-primary" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium">{area.name}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="font-mono text-xs text-muted-foreground">
                    {area.code}
                  </span>
                </TableCell>

                <TableCell>
                  <p className="max-w-[250px] truncate text-sm text-muted-foreground">
                    {area.description || "No description"}
                  </p>
                </TableCell>

                <TableCell>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-current" />
                    {area.status}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {area.priority === "LOW" ? (
                      <span className="text-green-500">LOW</span>
                    ) : area.priority === "MEDIUM" ? (
                      <span className="text-yellow-500">MEDIUM</span>
                    ) : area.priority === "HIGH" ? (
                      <span className="text-red-500">HIGH</span>
                    ) : (
                      "No priority"
                    )}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      //   onClick={() => handlegetAreas(area.id)}
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
                        console.log("Update area:", area.id);
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
                        console.log("Delete area:", area.id);
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
                No areas found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetAllAreas;
