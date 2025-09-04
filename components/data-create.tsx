"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  date: z.iso.date({
    message: "Must be in the format YYYY-MM-DD",
  }),
  balance: z
    .string()
    .regex(/^(0|[1-9]\d*)\.\d{2}$/, {
      message: "Must be a number with exactly 2 decimal places (E.g. 100.00)",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Money amount must be greater than 0",
    }),
});

export function DataCreate() {
  const [isPending, startTransition] = React.useTransition();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  // const [isDataExists, setIsDataExists] = React.useState<boolean>(false);
  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: formattedCurrentDate,
      balance: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // setIsDataExists(false);
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check if enterred date is exists in DB
      const response = await axios.get(`${apiBaseUrl}/records`, {
        params: { date: data.date },
      });
      const receivedData = response.data;
      if (receivedData === undefined || receivedData.length === 0) {
        await axios.post(`${apiBaseUrl}/records`, data);
        // setIsDataExists(false);
        form.reset();
        setIsOpen(false);
        toast.success("New record has been successfully created.");
        // router.push("/records");
      } else {
        // setIsDataExists(true);
        toast.error("Record is already exists.", {
          description: "Please insert another date in form below.",
        });
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          <IconPlus />
          Add new record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new record</DialogTitle>
          <DialogDescription>
            Enter data below to create a new record to DB.
          </DialogDescription>
          {/* {isDataExists && (
            <p className="text-destructive text-sm">
              Record is already exists. Please insert another date below
            </p>
          )} */}
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Date of record"
                      {...field}
                      disabled={isPending}
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
                      placeholder="Current balance"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isPending}
              aria-disabled={isPending}
            >
              {isPending ? "Processing..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
