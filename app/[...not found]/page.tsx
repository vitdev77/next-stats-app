import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconArrowNarrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl">
          <span className="font-bold">404</span> Page Not Found
        </h2>
        <p className="text-muted-foreground">
          Could not find requested resource
        </p>
      </div>
      <Button variant={"ghost"} asChild>
        <Link href="/records">
          <IconArrowLeft /> Back to Records Page
        </Link>
      </Button>
    </div>
  );
}
