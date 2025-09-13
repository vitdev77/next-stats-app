import DepositsPage from "./deposits/page";
import RecordsPage from "./records/page";

export default function Home() {
  return (
    <div className="container-wrapper 3xl:fixed:px-0 px-6">
      <div className="3xl:fixed:container w-full">
        <div className="flex flex-row gap-4">
          <div>
            <RecordsPage />
          </div>
          <div>
            <DepositsPage />
          </div>
        </div>
      </div>
    </div>
  );
}
