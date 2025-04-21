import { toast } from "@/components/ui/use-toast";

interface AbacatePayProduct {
  externalId: string;
  name: string;
  quantity: number;
  description: string;
  price: number;
}

interface AbacatePayRequest {
  frequency: "ONE_TIME";
  methods: string[];
  products: AbacatePayProduct[];
  returnUrl: string;
  completionUrl: string;
}

export async function createAbacatePayment(
  packageId: string,
  packageName: string,
  price: number,
) {
  try {
    const url = "https://api.abacatepay.com/v1/billing/create";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer abc_dev_mPZsGghmnThCSgmXF2N0LbP0",
      },
      body: JSON.stringify({
        frequency: "ONE_TIME",
        methods: ["PIX"],
        products: [
          {
            price: 100,
            quantity: 1,
            description: "Pacote Básico",
            name: "Pacote Básico",
            externalId: "basic",
          },
        ],
        returnUrl: window.location.origin + window.location.pathname,
        completionUrl: `${window.location.origin}${window.location.pathname}?payment_status=approved&package=${packageId}`,
      }),
    };

    const response = await fetch(url, options);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao processar pagamento");
    }

    // Redirecionar para a URL de pagamento
    if (data.paymentUrl) {
      window.open(data.paymentUrl, "_blank");
      return true;
    } else {
      throw new Error("URL de pagamento não encontrada");
    }
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    toast({
      title: "Erro no pagamento",
      description:
        error instanceof Error ? error.message : "Erro ao processar pagamento",
      variant: "destructive",
    });
    return false;
  }
}
