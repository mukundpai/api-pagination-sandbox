import { RefreshCcw } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Content, Page } from "./endpoint";
import { AppSkeleton } from "./skeleton";

export default function DemoPage() {
  const [data, setData] = useState<Content[]>([]);
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [is_next, setIsNext] = useState(false);
  const [dataFailed, setDataFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getData(page: number, per_page: number): Promise<Page> {
    try {
      setDataFailed(false);
      const max_retries = 5;
      for (let i = 0; i < max_retries; i++) {
        const response = await fetch(`http://localhost:5000/articles?page=${page}&per_page=${per_page}`);

        if (response.ok) {
          const data = await response.json();
          toast(`Successfully fetched data after ${i + 1} attempts`);
          return Page.parse(data);
        }

        // wait 2sec
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setDataFailed(true);
      throw new Error(`Failed to fetch data after ${max_retries} attempts`);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  let load = async () => {
    setIsLoading(true);
    let response: Page = await getData(page, per_page);
    setData(response.data);
    setPage(response.page);
    setPerPage(response.per_page);
    setIsNext(response.is_next);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, [page, per_page]);

  const pageAttributes = () => {
    return (
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">Page {page}</span>
        <Select
          value={String(per_page)}
          onValueChange={(value) => {
            setPage(1);
            setPerPage(parseInt(value));
          }}
          defaultValue={String(per_page)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => load()}>
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={page <= 1 ? "pointer-events-none cursor-default opacity-50" : ""}
                onClick={() => setPage(page - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(page + 1)}
                className={is_next ? "" : "pointer-events-none cursor-default opacity-50"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-10 space-y-10">
      {pageAttributes()}
      <div className="relative">
        {dataFailed && (
          <Card className="absolute left-1/2 -translate-x-1/2 top-36 z-50 flex flex-col items-center justify-center gap-2 p-6">
            <span className="font-light text-muted-foreground">Something is wrong. Try Reloading</span>
            <Button onClick={() => load()}>
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
          </Card>
        )}
        {isLoading && !dataFailed && (
          <LoaderCircle className="absolute left-1/2 top-36 z-50 text-muted-foreground animate-spin w-14 h-14" />
        )}
        {isLoading ? <AppSkeleton /> : <DataTable columns={columns} data={data} />}
      </div>
      {pageAttributes()}
    </div>
  );
}
