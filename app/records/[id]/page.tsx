"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const FormSchema = z.object({
  // date: z.iso.date({
  //   message: "Must be in the format YYYY-MM-DD",
  // }),
  balance: z
    .string()
    .min(1, { message: "This field cannot be empty" })
    .regex(/^(0|[1-9]\d*)\.\d{2}$/, {
      message: "Must be a number with exactly 2 decimal places (e.g. 100.00)",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Money amount must be greater than 0",
    }),
});

export default function RecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [record, setRecord] = React.useState(null);
  const [isEditPending, startEditTransition] = React.useTransition();
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const router = useRouter();

  const { id } = React.use(params);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  React.useEffect(() => {
    id && fetchRecord();
  }, [id]);

  const fetchRecord = async () => {
    const response = await axios.get(`${apiBaseUrl}/records/${id}`);
    return setRecord(response.data);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // Fetch single record by ID
  // axios
  //   .get(`${apiBaseUrl}/records/${id}`)
  //   .then((response) => {
  //     console.log("Record by ID:", response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching record:", error);
  //   });

  // // Update record by ID
  // const updatedRecord = { date: "Updated Date", balance: "Updated Balance" };
  // axios
  //   .put(`${apiBaseUrl}/records/${id}`, updatedRecord)
  //   .then((response) => {
  //     console.log("Updated Record:", response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error updating record:", error);
  //   });

  // // Delete record by ID
  // axios
  //   .delete(`${apiBaseUrl}/records/${id}`)
  //   .then(() => {
  //     console.log("Record deleted successfully.");
  //   })
  //   .catch((error) => {
  //     console.error("Error deleting record:", error);
  //   });
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // date: "",
      balance: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const updatedRecord = { ...data };
    startEditTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await axios.put(`${apiBaseUrl}/records/${id}`, updatedRecord);
      router.push("/records");
      toast.success("Your record successfully changed.");
    });
  }

  function deleteRecord(e: { preventDefault: () => void }) {
    e.preventDefault();
    startDeleteTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await axios.delete(`${apiBaseUrl}/records/${id}`);
      toast.success("Your record was successfully deleted.", {
        description: "Now you can create a new one.",
      });
      router.push("/records");
    });
  }

  // let jData = [
  //   { name: "BFC", est: 2009 },
  //   { name: "AAF", est: 1998 },
  //   { name: "BFD", est: 1975 },
  // ];
  // jData.sort((a, b) => (a.name > b.name ? 1 : -1));
  // console.log(jData);

  // let ddaattaa = axios
  //   .get(`${apiBaseUrl}/records/${id}`)
  //   .then((res) => console.log(res.data));
  // console.log(ddaattaa);

  return (
    <div className="container-wrapper">
      <div className="container flex flex-col items-center gap-4 justify-center py-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>
              Change your record ID{" "}
              <Badge
                variant={"secondary"}
                className="text-xl text-white font-bold bg-blue-500 dark:bg-blue-600"
              >
                {id}
              </Badge>
            </CardTitle>
            <CardDescription>
              Enter data below to change your record.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  // control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="date here"
                          {...field}
                          // value={record.date}
                          disabled
                          tabIndex={-1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Balance</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="balance here"
                          {...field}
                          // value={record.balance}
                          disabled={isEditPending || isDeletePending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isEditPending || isDeletePending}
                  aria-disabled={isEditPending || isDeletePending}
                >
                  {isEditPending ? "Changing..." : "Change"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-destructive">
              Delete your record
            </CardTitle>
            <CardDescription className="text-destructive/60">
              Attention! Deleting this record will remove all information from
              DB. This cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={deleteRecord}
              variant={"destructive"}
              className="w-full cursor-pointer"
              tabIndex={-1}
              disabled={isEditPending || isDeletePending}
              aria-disabled={isEditPending || isDeletePending}
            >
              {isDeletePending ? "Deleting..." : "Delete"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
