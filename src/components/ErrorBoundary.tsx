import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRefresh = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-amber-600" />
              </div>
            </div>

            <h1 className="text-4xl font-bold">Algo deu errado</h1>

            <p className="text-xl text-muted-foreground">
              Ocorreu um erro inesperado ao carregar esta página.
            </p>

            {this.state.error && (
              <div className="p-4 bg-muted rounded-md text-left overflow-auto max-h-40">
                <p className="font-mono text-sm">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={this.handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Tentar novamente
              </Button>

              <Button variant="outline" asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Página Inicial
                </Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
