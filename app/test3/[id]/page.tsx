"use client";

import * as React from "react";
import axios from "axios";
import NotFound from "@/app/[...not found]/page";

export default function ItemDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // itemId is passed as a prop
  const [item, setItem] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any>(null);

  const { id } = React.use(params);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  React.useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiBaseUrl}/records/${id}`); // Dynamic URL with ID
        setItem(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      // Only fetch if itemId is available
      fetchItem();
    }
  }, [id]); // Re-run effect when itemId changes

  //   if (loading) return <p>Loading item details...</p>;
  //   if (error) return <p>Error: {error.message}</p>;
  //   if (!item) return <p>No item found.</p>;

  return (
    <div className="container-wrapper">
      <div className="container flex flex-col items-center gap-4 justify-center py-6">
        {loading && <p className="text-muted-foreground">Loading data...</p>}
        {item ? (
          <div>
            <h2 className="font-bold text-xl">Record Details</h2>
            <p>
              ID: <span className="text-blue-600 font-bold">{item.id}</span>
            </p>
            <p>
              Date: <span className="text-blue-600 font-bold">{item.date}</span>
            </p>
            <p>
              Balance:{" "}
              <span className="text-blue-600 font-bold">{item.balance}</span>
            </p>
          </div>
        ) : error ? (
          // <p className="text-red-500">{error.message}</p>
          <NotFound />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
