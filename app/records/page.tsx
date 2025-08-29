"use client";

import * as React from "react";
import axios from "axios";

import DataChart from "@/components/data-chart";
import DataTable from "@/components/data-table";
import { IconLoader3 } from "@tabler/icons-react";

export default function Page() {
  const [records, setRecords] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [isEmpty, setIsEmpty] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:5000/records")
        .then((res) =>
          res.data.length === 0 ? setIsEmpty(true) : setRecords(res.data)
        )
        .catch((err) => (console.log(err), setError(true)))
        .finally(() => setLoading(false));
    }, 500);
  }, []);

  return (
    <div className="container-wrapper 3xl:fixed:px-0 px-6">
      <div className="3xl:fixed:container w-full">
        {loading && (
          <div className="text-center text-muted-foreground/50 flex justify-center gap-2 py-6">
            <IconLoader3 className="animate-spin" /> Loading data...
          </div>
        )}
        {error && (
          <div className="text-center py-6">
            <h2 className="text-destructive text-2xl font-semibold">
              Unable to load the data.
            </h2>
            <span className="text-muted-foreground">
              This can happen if you are not connected to the internet, or if an
              underlying system or component is not available.
            </span>
          </div>
        )}
        {!loading && !error && (
          <>
            {isEmpty ? (
              <div className="text-center py-6">
                <h2 className="text-orange-400 text-2xl font-semibold">
                  No data found.
                </h2>
                <span className="text-muted-foreground">
                  DB is empty. There is no data to show you right now.
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 md:gap-6 py-6">
                <DataChart records={records} />
                <DataTable records={records} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
