import axios from "axios";
import { IconCalculator, IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { DataCreate } from "./data-create";

interface IProps {
  records: {
    id: string;
    date: string;
    balance: string;
    profit?: string;
  }[];
}

export default function DataTable({ records }: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <DataCreate />
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          {/* <TableCaption>A list of your records.</TableCaption> */}
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Deposits</TableHead>
              <TableHead>Withdrawals</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records
              .sort((a, b) => (a.date < b.date ? 1 : -1)) // sort data from NEW to LATE
              .map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    {record.balance ? (
                      `${record.balance} USD`
                    ) : (
                      <span className="text-muted-foreground">no data</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {record.profit ? (
                      `${record.profit} USD`
                    ) : (
                      <div className="flex flex-row items-center gap-2">
                        <div className="text-muted-foreground">no data</div>
                        <Button
                          variant={"outline"}
                          size="icon"
                          className="size-8 cursor-pointer"
                        >
                          <IconCalculator />
                          <span className="sr-only">Calculate</span>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>Deposit</TableCell>
                  <TableCell>Withdrawal</TableCell>
                  <TableCell className="flex justify-end gap-1">
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="size-8"
                    >
                      <Link href={`/records/${record.id}`}>
                        <IconEdit />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8 cursor-pointer"
                        >
                          <IconTrash className="text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                            <br />
                            This will permanently remove this record from
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Button asChild variant={"destructive"}>
                            <Link href={`/records/id/${record.id}`}>
                              Delete
                            </Link>
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination className="py-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
