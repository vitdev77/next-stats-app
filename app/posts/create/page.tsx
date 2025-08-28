"use client";

import * as React from "react";
// import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
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
import axios from "axios";

const FormSchema = z.object({
  date: z.iso.date({
    message: "Must be in the format YYYY-MM-DD.",
  }),
  balance: z
    .string()
    .regex(/^(0|[1-9]\d*)\.\d{2}$/, {
      message: "Must be a number with exactly 2 decimal places",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Money amount must be greater than 0",
    }),
});

export default function Create() {
  const [isPending, startTransition] = React.useTransition();
  // const router = useRouter();

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: formattedDate,
      balance: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      form.reset();
      await axios.post("http://localhost:5000/records", data);
      // router.push("/posts");
      toast("New record successfully created.", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    });
  }

  return (
    <div className="container-wrapper">
      <div className="container flex justify-center py-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create new record</CardTitle>
            <CardDescription>
              Enter data below to create a new record to DB.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                          placeholder="date here"
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
                          placeholder="balance here"
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
                  className="w-full"
                  disabled={isPending}
                  aria-disabled={isPending}
                >
                  {isPending ? "Processing..." : "Submit"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
