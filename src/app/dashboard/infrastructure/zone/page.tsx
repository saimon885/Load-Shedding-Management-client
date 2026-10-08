"use client";
import Can from "@/components/auth/RoleCan";
import useDebounce from "@/components/dashboard/infrastructure-components/debounce";
import { AddNewZone } from "@/components/dashboard/zone/AddNewZone";
import AllZones from "@/components/dashboard/zone/AllZones";
import { Input } from "@/components/ui/input";
import { Search, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UseGetZoneHook } from "@/hooks/zone.hook";
import LoadingTable from "@/components/dashboard/zone/LoadingTable";

const ZonePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebounce(searchInput);
  const params = {
    searchTerm: search,
    page: page,
    limit: 10,
  };
  const { data: zoneList, isLoading } = UseGetZoneHook(params);
  const totalPages = zoneList?.meta?.totalPages;

  const zones = zoneList?.data ?? [];

  return (
    <section className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Distribution Zones
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor distribution zones and their substations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-[250px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              className="w-full pl-9"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1);
              }}
              placeholder="Search your zone..."
            />
          </div>
        </div>
        <Can permission="zone:create">
          <AddNewZone />
        </Can>
      </div>

      <AllZones isloading={isLoading} zones={zones} />

      <div className="flex items-center justify-between border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Showing page <span className="font-medium">{page}</span>
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="size-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages || isLoading}
          >
            Next
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ZonePage;
