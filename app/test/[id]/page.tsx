"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";

export default function UpdateRecordData({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [recordData, setRecordData] = React.useState<any>([]);
  const { handleSubmit, reset, control } = useForm({});

  const { id } = React.use(params);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  React.useEffect(() => {
    id && fetchRecordData();
  }, [id]);

  React.useEffect(() => {
    recordData &&
      reset({
        date: recordData["date"],
        balance: recordData["balance"],
      });
  }, [recordData]);

  const fetchRecordData = async () => {
    const responseData = await axios
      .get(`${apiBaseUrl}/records/${id}`)
      .then((response) => response.data);
    return setRecordData(responseData);
  };

  function onSubmit() {
    // TODO
  }

  return (
    <div className="container-wrapper">
      <div className="container flex flex-col items-center gap-4 justify-center py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2">
            <label htmlFor="date">Date:</label>
            <Controller
              render={({ field }) => (
                <Input
                  type="text"
                  id="date"
                  placeholder="date here"
                  {...field}
                  disabled
                />
              )}
              control={control}
              defaultValue={recordData}
              name="date"
            />
          </div>
          <div className="py-2">
            <label htmlFor="balance">Balance:</label>
            <Controller
              render={({ field }) => (
                <Input
                  type="text"
                  id="balance"
                  placeholder="balance here"
                  {...field}
                />
              )}
              control={control}
              defaultValue={recordData}
              name="balance"
            />
          </div>
          <Button className="w-full cursor-pointer">Submit</Button>
        </form>
      </div>
    </div>
  );
}
