"use client";

import * as React from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
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
import { DepositCreate } from "./deposit-create";

interface IProps {
  deposits: {
    id: string;
    date: string;
    deposit: string;
    withBonus: string;
  }[];
}

export default function DepositTable({ deposits }: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <DepositCreate />
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          {/* <TableCaption>A list of your deposits.</TableCaption> */}
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Deposit</TableHead>
              <TableHead>With Bonus</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deposits
              .sort((a, b) => (a.date < b.date ? 1 : -1)) // sort deposits from NEW to LATE
              .map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell className="font-medium">{deposit.id}</TableCell>
                  <TableCell>{deposit.date}</TableCell>
                  <TableCell>
                    {deposit ? (
                      `${deposit.deposit} USD`
                    ) : (
                      <span className="text-muted-foreground">no data</span>
                    )}
                  </TableCell>
                  <TableCell>{deposit.withBonus} USD</TableCell>
                  <TableCell className="flex justify-end gap-1">
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="size-8"
                    >
                      <Link href={`/deposits/${deposit.id}`}>
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
                            This will permanently remove this deposit from
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Button asChild variant={"destructive"}>
                            <Link href={`/deposits/id/${deposit.id}`}>
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
      </div>
    </div>
  );
}
