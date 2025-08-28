import { ThemeToggle } from "./theme-toggle";
import SiteLogo from "./site-logo";
import { Separator } from "@/components/ui/separator";
import { SiteConfig } from "./site-config";

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <div className="flex items-center justify-between py-2 w-full">
            <SiteLogo />
            <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
              <SiteConfig className="3xl:flex hidden" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4 3xl:flex hidden"
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
