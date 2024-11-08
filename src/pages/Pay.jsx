import { ScanQrCode } from "lucide-react";
import { useState } from "react";
import QrReader from "modern-react-qr-reader";

const Pay = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [qrData, setQrData] = useState("");

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      setIsEnabled(false);
    }
  };

  return (
    <main className="w-full shrink-0 items-center py-4 md:py-6 px-4 md:px-6 lg:px-20">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Scan & Pay</h1>

      <div className="max-w-7xl mx-auto">
        <div className="p-6 rounded-lg shadow-md lg:flex lg:gap-8">
          <div className="mb-6 lg:mb-0 lg:flex-1">
            <h2 className="text-xl text-center font-semibold mb-4">
              Scan QR Code
            </h2>
            <div className="aspect-square max-w-md mx-auto lg:w-full bg-secondary rounded-lg flex items-center justify-center">
              {!isEnabled && (
                <button
                  type="button"
                  className="mt-2 h-fit rounded-md bg-transparent px-3 py-5 text-sm font-semibold hover:text-secondary-foreground"
                  onClick={() => setIsEnabled(true)}
                >
                  <ScanQrCode size={50} />
                </button>
              )}
              {isEnabled && (
                <QrReader
                  delay={300}
                  facingMode={"environment"}
                  onError={(err) => console.error(err)}
                  onScan={(data) => handleScan(data)}
                  style={{ width: "100%" }}
                />
              )}
            </div>
            <p>{qrData}</p>
          </div>
          <div className="border-t pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 lg:flex-1">
            <h2 className="text-xl text-center font-semibold mb-4">
              Payment Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Vendor</label>
                <p className="mt-1">Not detected</p>
              </div>
              <div>
                <label className="block text-sm font-medium">Amount</label>
                <p className="mt-1">$0.00</p>
              </div>
              <button
                className="cursor-pointer w-full bg-primary dark:bg-primary-foreground text-secondary dark:text-secondary-foreground py-2 px-4 rounded-md transition-colors"
                onClick={() => setIsEnabled(false)}
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pay;
