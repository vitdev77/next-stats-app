import axios from "axios";
import { columns, Records } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Records[]> {
  const fetchData = axios
    .get("http://localhost:5000/records")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return fetchData;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
