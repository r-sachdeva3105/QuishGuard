import {
  CircleCheckBig,
  ScanQrCode,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Card } from "@/components/ui/card";
import { useAuth } from "../../contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const CustomerPayment = () => {
  const { isAuthenticated, userType, aliasData } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const [qrData, setQrData] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userType === "customer" && aliasData !== null) {
      console.log(aliasData);
    }
  }, [isAuthenticated, userType, aliasData]);

  const handleScan = async (data) => {
    if (data) {
      console.log(data);
      setQrData(data); // Update the state with the QR code data
      handleScanStop(data); // Pass the QR code data to stop the scan
    }
  };

  const handleScanStart = async () => {
    const codeReader = await new BrowserMultiFormatReader();
    codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
      if (result) {
        handleScan(result.text);
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err);
      }
    });
  };

  const handleScanStop = async (scannedData) => {
    setIsEnabled(false);
    const videoElement = document.getElementById("video");
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }

    handleDecodeQRCode(scannedData);
  };

  const handleDecodeQRCode = async (scannedData) => {
    const date = new Date();
    try {
      const response = await fetch("http://localhost:3000/api/decodeQR", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: "PAYMENT-INSTRUCTION",
          qrCodeContent: scannedData,
          paymentDate: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to decode QR code");
      }

      const data = await response.json();
      console.log(data);
      setQrData(data.data);
    } catch (error) {
      console.error(error);
      setIsDialogOpen(true);
    }
  };

  return (
    <>
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
            </div>
            <div className="border-t pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 lg:flex-1">
              <h2 className="text-xl text-center font-semibold mb-4">
                Payment Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-md font-semibold">Vendor</label>
                  {qrData?.payeeName && (
                    <p className="mt-1 flex gap-1">
                      {qrData?.payeeName}
                      <ShieldCheck />
                    </p>
                  )}
                  {qrData?.additionalInformation && (
                    <p className="mt-1">{qrData?.additionalInformation}</p>
                  )}
                </div>
                <div>
                  <label className="block text-md font-semibold">Amount</label>
                  {qrData.amount && <p className="mt-1">${qrData.amount}</p>}
                </div>
                <div className="flex gap-3">
                  {/* <button
                    className="cursor-pointer w-full bg-primary dark:bg-primary-foreground text-secondary dark:text-secondary-foreground py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleScanStop}
                  >
                    Authenticate
                  </button> */}
                  <button
                    className="cursor-pointer w-full bg-primary dark:bg-primary-foreground text-secondary dark:text-secondary-foreground py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setIsPayDialogOpen(true)}
                    disabled={!qrData?.amount}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-lg w-96">
          <DialogHeader>
            <DialogTitle className="flex flex-col gap-1 items-center justify-center text-red-500 font-semibold text-xl">
              <TriangleAlert size={50} />
              Risk Alert
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-lg">
            Fake QR code detected. Please scan a valid QR code to proceed.
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Dialog open={isPayDialogOpen} onOpenChange={setIsPayDialogOpen}>
        <DialogContent className="rounded-lg w-96">
          <DialogHeader>
            <DialogTitle className="flex flex-col gap-1 items-center justify-center text-green-500 font-semibold text-xl">
              <CircleCheckBig size={50} />
              Payment Successful
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-lg">
            Your payment has been processed successfully.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerPayment;
