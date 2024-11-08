import { ScanQrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Card } from "@/components/ui/card";

const CustomerPayment = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [qrData, setQrData] = useState("");

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      handleScanStop();
    }
  };

  const handleScanStart = () => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
      if (result) {
        handleScan(result.text);
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err);
      }
    });
  };
  const handleScanStop = () => {
    setIsEnabled(false);
    const videoElement = document.getElementById("video");
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoElement.srcObject = null;
    }
  };

  return (
    <main className="w-full shrink-0 items-center py-4 md:py-6 px-4 md:px-6 lg:px-20">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Scan & Pay</h1>
      <Card>
        <div className="p-6 rounded-lg shadow lg:flex lg:gap-8">
          <div className="mb-6 lg:mb-0 lg:flex-1">
            <h2 className="text-xl text-center font-semibold mb-4">
              Scan QR Code
            </h2>
            <div className="aspect-square overflow-hidden max-w-md mx-auto lg:w-full bg-secondary rounded-lg flex items-center justify-center">
              {!isEnabled && (
                <button
                  type="button"
                  className="mt-2 h-fit rounded-md bg-transparent px-3 py-5 text-sm font-semibold hover:text-secondary-foreground"
                  onClick={() => {
                    setIsEnabled(true);
                    handleScanStart();
                  }}
                >
                  <ScanQrCode size={50} />
                </button>
              )}
              {isEnabled && <video id="video" className="w-full" />}
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
                <div className="flex gap-1 items-center">
                  <span className="mt-1">Not detected</span>
                  {/* <ShieldCheck /> */}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Amount</label>
                <span className="mt-1">$0.00</span>
              </div>
              <div className="flex gap-3">
                <button
                  className="cursor-pointer w-full bg-primary dark:bg-primary-foreground text-secondary dark:text-secondary-foreground py-2 px-4 rounded-md transition-colors"
                  onClick={handleScanStop}
                >
                  Authenticate Vendor
                </button>
                <button
                  className="cursor-pointer w-full bg-primary dark:bg-primary-foreground text-secondary dark:text-secondary-foreground py-2 px-4 rounded-md transition-colors"
                  onClick={handleScanStop}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default CustomerPayment;
