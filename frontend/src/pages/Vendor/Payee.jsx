import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "../../contexts/AuthContext";

const VendorPayment = () => {
  const { isAuthenticated, userType, aliasData } = useAuth();
  const [qrData, setQrData] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  const generateQRCode = async () => {
    const payload = {
      items: [
        {
          itemId: "6b9cabee-36e3-42a5-9982-d6023b6efcd3",
          payeeName: "Parking Plus Services",
          payeeCity: "Toronto",
          merchantCategoryCode: "4900",
          account: {
            ownerId: aliasData?.data.accountOwner.id,
            alias: aliasData?.data.accountAlias.alias,
            aliasType: "EMAIL",
          },
          imageGeneration: {
            errorCorrectionLevel: "L",
            imageSize: 400,
            generateImageRendering: true,
          },
          additionalInformation: {
            additionalInformation:
              "4000 Victoria Park Ave, Toronto, ON M4E 1Z8",
            clientId: 12345678,
          },
          payment: {
            amount: 50,
          },
        },
      ],
    };

    try {
      const response = await fetch("http://localhost:3000/api/qrcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR code data");
      }

      const data = await response.json();
      console.log(data.data.items[0]);
      setQrData(data.data.items[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGenerateQrCode = async () => {
    if (!qrData) return;

    setBase64Image(
      `data:${qrData?.imageGeneration.mimeType};base64,${qrData?.imageGeneration.imageContent}`
    );
  };

  useEffect(() => {
    if (isAuthenticated && userType === "vendor" && aliasData !== null) {
      console.log(aliasData);
      generateQRCode();
    }
  }, [isAuthenticated, userType, aliasData]);

  useEffect(() => {
    if (qrData) {
      handleGenerateQrCode();
    }
  }, [qrData]);

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
              <img src={base64Image} alt="Static QR Code" />
            </div>
          </div>
          <div className="border-t pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 lg:flex-1">
            <h2 className="text-xl text-center font-semibold mb-4">
              Vendor Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <div className="flex gap-1 items-center">
                  <span className="mt-1">
                    {aliasData?.data.accountOwner.tradeName}
                  </span>
                  <ShieldCheck />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Entity</label>
                <span className="mt-1">
                  {aliasData?.data.accountOwner.entityType}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default VendorPayment;
