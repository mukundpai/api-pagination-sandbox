import { Skeleton } from "~/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export const AppSkeleton = () => {
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Skeleton className="w-[100px] h-[20px]" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-1/4 h-[20px]" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
