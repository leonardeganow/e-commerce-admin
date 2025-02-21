import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Skeleton } from "@/components/ui/skeleton"
  
  interface TableSkeletonProps {
    rows?: number
    columns?: number
  }
  
  export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
    return (
      <Table className="mt-20">
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={`header-${index}`}>
                <Skeleton className="h-4 w-[80%]" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                  <Skeleton className="h-4 w-[80%]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  