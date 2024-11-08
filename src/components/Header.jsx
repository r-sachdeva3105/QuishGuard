import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScanQrCode } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 lg:px-20 border-b">
      <Sheet>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <ScanQrCode className="h-8 w-8 weig" />
            <span className="font-bold text-3xl">QuishGuard</span>
          </div>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            <Link
              to="dashboard"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Dashboard
            </Link>
            <Link
              to="transactions"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Transaction
            </Link>
            <Link
              to="pay"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Scan & Pay
            </Link>
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          to="dashboard"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Dashboard
        </Link>
        <Link
          to="transactions"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Transaction
        </Link>
        <Link
          to="pay"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Scan & Pay
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
