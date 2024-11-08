import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const RecentTransactions = () => {
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
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{transaction.vendor[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.vendor}
            </p>
            <p className="text-sm text-muted-foreground">
              {transaction.category}
            </p>
          </div>
          <div className="ml-auto font-medium">
            -${String(transaction.amount)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;
