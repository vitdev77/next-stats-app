"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
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
  deposit: z
    .string()
    .min(1, { message: "This field cannot be empty" })
    .regex(/^(0|[1-9]\d*)\.\d{2}$/, {
      message: "Must be a number with exactly 2 decimal places (e.g. 100.00)",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Money amount must be greater than 0",
    }),
  withBonus: z
    .string()
    .min(1, { message: "This field cannot be empty" })
    .regex(/^(0|[1-9]\d*)\.\d{2}$/, {
      message: "Must be a number with exactly 2 decimal places (e.g. 100.00)",
    }),
});

export function DepositCreate() {
  const [isPending, startTransition] = React.useTransition();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  function toISOStringLocalTimezone(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

    const tzOffsetMinutes = -date.getTimezoneOffset();
    const tzOffsetHours = Math.floor(Math.abs(tzOffsetMinutes) / 60)
      .toString()
      .padStart(2, "0");
    const tzOffsetRemainingMinutes = (Math.abs(tzOffsetMinutes) % 60)
      .toString()
      .padStart(2, "0");
    const tzOffsetSign = tzOffsetMinutes >= 0 ? "+" : "-";

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${tzOffsetSign}${tzOffsetHours}:${tzOffsetRemainingMinutes}`;
  }

  const now = new Date();
  const localISOString = toISOStringLocalTimezone(now);
  const localISOStringFormated = localISOString.split("T")[0];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: localISOStringFormated,
      deposit: "",
      withBonus: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check if enterred date is exists in DB
      const response = await axios.get(`${apiBaseUrl}/deposits`, {
        params: { date: data.date },
      });
      const receivedData = response.data;
      if (receivedData === undefined || receivedData.length === 0) {
        await axios.post(`${apiBaseUrl}/deposits`, data);
        form.reset();
        setIsOpen(false);
        toast.success("New deposit has been successfully added.");
        // router.push("/deposit");
      } else {
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
          Add new deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new deposit</DialogTitle>
          <DialogDescription>
            Enter data below to add a new deposit to DB.
          </DialogDescription>
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
                      placeholder="Date of deposit"
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
              name="deposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Amount of your deposit"
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
              name="withBonus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>With Bonus</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your Deposit + Bonus"
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
