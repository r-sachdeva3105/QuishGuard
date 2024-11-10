import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Eye, EyeOff } from "lucide-react";

const CustomerTransactions = () => {
  const cardNumber = "9238 4385 2429 0138";
  const cardholderName = "RAJAT SACHDEVA";
  const expirationDate = "07/26";
  const cardType = "visa";
  const getCardTypeIcon = (type) => {
    switch (type) {
      case "visa":
        return "V";
      case "mastercard":
        return "M";
      case "amex":
        return "A";
      case "discover":
        return "D";
      default:
        return <CreditCard className="h-6 w-6" />;
    }
  };
  const cardTypeColor = {
    visa: "bg-blue-600",
    mastercard: "bg-red-600",
    amex: "bg-green-600",
    discover: "bg-orange-600",
  };
  const balance = 476.01;
  const [transactions] = useState([
    {
      id: 1,
      date: "2024-03-20",
      vendor: "Walmart",
      category: "Shopping",
      amount: 299.99,
      status: "completed",
    },
    {
      id: 2,
      date: "2024-03-19",
      vendor: "Eatery",
      category: "Food & Dining",
      amount: 85.5,
      status: "completed",
    },
    {
      id: 3,
      date: "2024-03-18",
      vendor: "Uber Ride",
      category: "Transportation",
      amount: 25.0,
      status: "pending",
    },
    // Add more transactions as needed
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [isCardNumberVisible, setIsCardNumberVisible] = useState(false);

  const toggleCardNumberVisibility = () => {
    setIsCardNumberVisible((prev) => !prev);
  };

  // Get unique categories for the filter
  const categories = useMemo(() => {
    return [...new Set(transactions.map((t) => t.category))].sort();
  }, [transactions]);

  // Handle sort
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const matchesSearch = Object.values(transaction)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory && selectedCategory !== "All"
            ? transaction.category === selectedCategory
            : true;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.direction === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
  }, [transactions, searchQuery, selectedCategory, sortConfig]);

  return (
    <main className="w-full shrink-0 items-center py-4 md:py-6 px-4 md:px-6 lg:px-20">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Transactions</h1>
      <div className="flex gap-2">
        <Card className="w-full max-w-sm bg-gradient-to-br from-sky-800 to-blue-900 text-white overflow-hidden rounded-xl shadow-lg">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider mb-1">
                Wallet Balance
              </span>
              <span className="text-2xl font-bold tracking-widest">
                ${balance.toFixed(2)}{" "}
                {/* Display balance with two decimal places */}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button className="bg-gray-800 text-white py-2 px-4 rounded">
                Add Funds
              </Button>
              <Button className="bg-gray-800 text-white py-2 px-4 rounded">
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full max-w-sm bg-gradient-to-br from-gray-800 to-blue-900 text-white overflow-hidden rounded-xl shadow-lg">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider mb-1">
                  Credit Card
                </span>
                <span
                  className={`text-lg font-bold ${cardTypeColor[cardType]} rounded px-2 py-1`}
                >
                  {getCardTypeIcon(cardType)}
                </span>
              </div>
              <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-200 rounded-md" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider">
                  Card Number
                </span>
                <div className="flex items-center">
                  <span className="text-xl tracking-widest">
                    {isCardNumberVisible ? cardNumber : ".... .... .... ...."}
                  </span>
                  <button
                    onClick={toggleCardNumberVisibility}
                    className="ml-2 text-gray-400 hover:text-white"
                    aria-label="Toggle card number visibility"
                  >
                    {isCardNumberVisible ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider mb-1">
                    Card Holder
                  </span>
                  <span className="text-sm uppercase">{cardholderName}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs uppercase tracking-wider mb-1">
                    Expires
                  </span>
                  <span className="text-sm">{expirationDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 my-4">
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border overflow-hidden shadow">
        <Table>
          <TableHeader className="bg-primary-foreground">
            <TableRow>
              <TableHead
                onClick={() => handleSort("date")}
                className="cursor-pointer transition-colors"
              >
                Date{" "}
                {sortConfig.key === "date" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => handleSort("description")}
                className="cursor-pointer transition-colors"
              >
                Vendor{" "}
                {sortConfig.key === "description" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => handleSort("category")}
                className="cursor-pointer transition-colors"
              >
                Category{" "}
                {sortConfig.key === "category" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => handleSort("amount")}
                className="cursor-pointer transition-colors"
              >
                Amount{" "}
                {sortConfig.key === "amount" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => handleSort("status")}
                className="cursor-pointer transition-colors"
              >
                Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.vendor}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gray-200">
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell className="capitalize">
                  {transaction.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default CustomerTransactions;
