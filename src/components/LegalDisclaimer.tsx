import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

const LegalDisclaimer = () => {
  return (
    <Alert className="bg-muted/50 border-muted my-4">
      <AlertCircle className="h-4 w-4 text-muted-foreground" />
      <AlertDescription className="text-xs text-muted-foreground"></AlertDescription>
    </Alert>
  );
};

export default LegalDisclaimer;
