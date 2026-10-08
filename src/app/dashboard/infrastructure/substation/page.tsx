"use client";
import { GetSingleZone } from "@/api/substation";
import Can from "@/components/auth/RoleCan";
import useDebounce from "@/components/dashboard/infrastructure-components/debounce";
import { AddNewSubstation } from "@/components/dashboard/substation/CreateSubstation";
import GetAllsubstation from "@/components/dashboard/substation/GetAllsubstation";
import LoadingTable from "@/components/dashboard/zone/LoadingTable";
import ZoneNotFound from "@/components/dashboard/zone/ZoneNotFound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getZoneWiseSubstations } from "@/hooks/substation";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Search, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";

const substation = () => {
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebounce(searchInput);

  const zoneId = searchParams.get("zoneId") || "";

  const payload = {
    id: zoneId,
    params: {
      searchTerm: search,
      page: page,
      limit: 10,
    },
  };

  const { data: substationList, isLoading } = getZoneWiseSubstations(payload);

  if (!zoneId) {
    return <ZoneNotFound />;
  }

  const totalPages = substationList?.meta?.totalPages || 1;
  const substation = substationList?.data ?? [];

  return (
    <section className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      <Button onClick={() => window.history.back()}>
        <BiLeftArrow /> Back
      </Button>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="size-5" />

            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              substations
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor their substations.
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
        <Can permission="substation:create">
          <AddNewSubstation zoneId={zoneId} />
        </Can>
      </div>

      {isLoading ? (
        <LoadingTable />
      ) : (
        <GetAllsubstation substations={substation} />
      )}

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

export default substation;
