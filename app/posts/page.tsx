"use client";

import { useEffect, useState } from "react";
import { IconEdit, IconLoader3, IconTrash, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import axios from "axios";
import { DataCreate } from "@/components/data-create";
import DataChart from "@/components/data-chart";

interface Idata {
  id: string;
  dateAt: string;
  title: string;
  descr: string;
}

export default function Page() {
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    setTimeout(() => {
      axios
        .get("http://localhost:5000/records")
        .then((res) =>
          res.data.length === 0 ? setIsEmpty(true) : setRecords(res.data)
        )
        .catch((err) => (console.log(err), setIsError(true)))
        .finally(() => setIsLoading(false));
    }, 500);
  }, []);

  return (
    <div className="container-wrapper 3xl:fixed:px-0 px-6er-wrapper">
      <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4 p-6">
        {isLoading && (
          <div className="text-center text-muted-foreground/50 flex justify-center gap-2 py-4">
            <IconLoader3 className="animate-spin" /> Loading data...
          </div>
        )}
        {isError && (
          <div className="text-center text-destructive/90 py-4">
            Unable to load the data.
            <br />
            <span className="text-muted-foreground">
              This can happen if you are not connected to the internet, or if an
              underlying system or component is not available.
            </span>
          </div>
        )}
        {!isLoading && !isError ? (
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description Here</CardDescription>
              <CardAction>
                <div className="flex items-center justify-center gap-2">
                  {/* <Button asChild>
                    <Link href="/posts/create">Create new record</Link>
                  </Button> */}
                  <DataCreate />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <DataChart records={records} />
              <Table>
                {/* <TableCaption>A list of your records.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isEmpty && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                      >
                        No records found.
                      </TableCell>
                    </TableRow>
                  )}
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        {record.balance}{" "}
                        <span className="text-muted-foreground">USD</span>
                      </TableCell>
                      <TableCell className="flex justify-end gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8"
                        >
                          <IconEdit />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="size-8"
                            >
                              <IconTrash />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently remove this record from servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction asChild>
                                <Link href="/posts/create">Continue</Link>
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
          </Card>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
