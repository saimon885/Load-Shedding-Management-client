"use client";
import { useState } from "react";
import OutageStates from "@/components/dashboard/outage/OutageStates";
import Outage from "@/components/dashboard/outage/Outage";
import { UsegetAllOutageHook } from "@/hooks/outage.hook";
import Can from "@/components/auth/RoleCan";
import useDebounce from "@/components/dashboard/infrastructure-components/debounce";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OutagePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  const debouncedReason = useDebounce(searchInput);

  const { data, isLoading } = UsegetAllOutageHook({
    type: selectedType,
    status: selectedStatus,
    reason: debouncedReason,
    page: page,
    limit: limit,
  });

  const outages = data?.data || [];

  const apiPage = data?.meta?.page || page;
  const totalPages = data?.meta?.totalPages || 1;
  const totalItems = data?.meta?.total || 0;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-card-foreground">
            Grid Outage Logs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor active, scheduled load-shedding sequences and system
            restoration windows.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-xl border">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by reason..."
            className="pl-9 w-full"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPage(1);
            }}
            className="flex h-9 w-full sm:w-[140px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">All Types</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="UNEXPECTED">Unexpected</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
            className="flex h-9 w-full sm:w-[140px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">All Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="ONGOING">Ongoing</option>
            <option value="RESTORED">Restored</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          {(selectedType || selectedStatus || searchInput) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchInput("");
                setSelectedType("");
                setSelectedStatus("");
                setPage(1);
              }}
              className="text-xs h-9"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
      <Can permission="outage_states:view">
        <OutageStates />
      </Can>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="w-full space-y-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
          {outages.length > 0 ? (
            outages.map((outageItem: any) => (
              <Outage key={outageItem.id} outage={outageItem} />
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground bg-card">
              No grid anomaly log records detected.
            </div>
          )}
        </div>
      )}

      {!isLoading && outages.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Showing page <span className="font-medium">{apiPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
            <span className="ml-1 text-xs">({totalItems} total logs)</span>
          </p>

          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={apiPage === 1}
            >
              <ChevronLeft className="size-4 mr-0.5" /> Prev
            </Button>

            {pageNumbers.map((pageNo) => (
              <Button
                key={pageNo}
                size="sm"
                variant={apiPage === pageNo ? "default" : "outline"}
                onClick={() => setPage(pageNo)}
                className="w-9 h-9 p-0"
              >
                {pageNo}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={apiPage >= totalPages}
            >
              Next <ChevronRight className="size-4 ml-0.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutagePage;
