import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScanQrCode } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import AvatarDropdown from "./AvatarDropdown";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { isAuthenticated, userType } = useAuth();

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 lg:px-20 border-b">
      <Sheet>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <ScanQrCode className="h-8 w-8 weig" />
            <span className="font-bold text-3xl">QuishGuard</span>
          </div>
          {isAuthenticated && (
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
          )}
        </div>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            <Link
              to={
                userType == "customer"
                  ? "customer-dashboard"
                  : "vendor-dashboard"
              }
              className="flex w-full items-center py-2 text-lg font-semibold"
            >
              Dashboard
            </Link>
            <Link
              to={
                userType == "customer"
                  ? "customer-transactions"
                  : "vendor-transactions"
              }
              className="flex w-full items-center py-2 text-lg font-semibold"
            >
              Transaction
            </Link>
            <Link
              to={
                userType == "customer" ? "customer-payment" : "vendor-payment"
              }
              className="flex w-full items-center py-2 text-lg font-semibold"
            >
              Scan & Pay
            </Link>
            <ModeToggle />
            <AvatarDropdown />
          </div>
        </SheetContent>
      </Sheet>
      {isAuthenticated && (
        <nav className="ml-auto hidden lg:flex items-center gap-6">
          <Link
            to={
              userType == "customer" ? "customer-dashboard" : "vendor-dashboard"
            }
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          >
            Dashboard
          </Link>
          <Link
            to={
              userType == "customer"
                ? "customer-transactions"
                : "vendor-transactions"
            }
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          >
            Transaction
          </Link>
          <Link
            to={userType == "customer" ? "customer-payment" : "vendor-payment"}
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          >
            Scan & Pay
          </Link>
          <ModeToggle />
          <AvatarDropdown />
        </nav>
      )}
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
