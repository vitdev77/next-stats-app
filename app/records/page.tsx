"use client";

import * as React from "react";
import axios from "axios";

import DataChart from "@/components/data-chart";
import DataTable from "@/components/data-table";
import { IconLoader3 } from "@tabler/icons-react";
import { DataCreate } from "@/components/data-create";

export default function RecordsPage() {
  const [records, setRecords] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [isEmpty, setIsEmpty] = React.useState<boolean>(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  React.useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${apiBaseUrl}/records`)
        .then((res) =>
          res.data.length === 0 ? setIsEmpty(true) : setRecords(res.data)
        )
        .catch((err) => (console.log(err), setError(true)))
        .finally(() => setLoading(false));
    }, 500);
  }, []);

  return (
    <>
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
            <div className="text-center flex flex-col items-center gap-2 py-6">
              <h2 className="text-orange-400 text-2xl font-semibold">
                No data found.
              </h2>
              <div className="text-muted-foreground">
                DB is empty. There is no data to show you right now.
              </div>
              <DataCreate />
            </div>
          ) : (
            <div className="flex flex-col gap-4 md:gap-6 py-6">
              <DataChart records={records} />
              <DataTable records={records} />
            </div>
          )}
        </>
      )}
    </>
  );
}
