"use client";

import LoadingTable from "@/components/dashboard/zone/LoadingTable";

import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Plus, Search, Zap } from "lucide-react";
import GetAllAreas from "@/components/dashboard/areas/GetAllAreas";
import { Button } from "@/components/ui/button";
import { BiLeftArrow } from "react-icons/bi";
import { getFeederWiseAreas } from "@/hooks/area";
import { AddNewArea } from "@/components/dashboard/areas/AddNewArea";
import { FeederNotFound } from "@/components/dashboard/feeders/FeedersNotFound";
import Can from "@/components/auth/RoleCan";
import { useState } from "react";
import useDebounce from "@/components/dashboard/infrastructure-components/debounce";
import { Input } from "@/components/ui/input";

const area = () => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebounce(searchInput);
  const searchParams = useSearchParams();
  const feederId = searchParams.get("feederId") || "";
  if (!feederId) {
    return <FeederNotFound />;
  }
  const payload = {
    id: feederId,
    params: {
      searchTerm: search,
      page: page,
      limit: 10,
    },
  };
  const { data: areas, isLoading } = getFeederWiseAreas(payload);

  const totalPages = areas?.meta?.totalPages || 1;
  const area = areas?.data ?? [];

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
              Areas
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor their Areas.
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

        <Can permission="area:create">
          <AddNewArea feederId={feederId} />
        </Can>
      </div>
      {isLoading ? <LoadingTable /> : <GetAllAreas areas={area} />}

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

export default area;
