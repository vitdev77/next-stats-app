import Link from "next/link";
import { IconSquareRoundedLetterSFilled } from "@tabler/icons-react";

export default function SiteLogo() {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <IconSquareRoundedLetterSFilled />
      <div className="font-bold text-2xl">
        <span className="font-light">STATI</span>STICKER.
      </div>
    </Link>
  );
}
