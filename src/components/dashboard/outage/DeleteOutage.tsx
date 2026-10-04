import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

const DeleteOutage = ({ outageId }: { outageId: string }) => {
  return (
    <Button
      onClick={() => console.log("Delete trigger invoked for ID:", outageId)}
      variant="ghost"
      size="sm"
      className="flex items-center gap-1.5 text-xs font-semibold h-9 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
    >
      <Trash2 className="size-4" />
      Remove
    </Button>
  );
};

export default DeleteOutage;
