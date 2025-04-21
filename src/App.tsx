import { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/home";
import {
  AnimatePresence,
  motion,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import PageTransition from "./components/PageTransition";

// Lazy load lottery pages
const MegaSenaPage = lazy(() => import("./components/lottery/MegaSenaPage"));
const LotofacilPage = lazy(() => import("./components/lottery/LotofacilPage"));
const QuinaPage = lazy(() => import("./components/lottery/QuinaPage"));
const TimemaniaPage = lazy(() => import("./components/lottery/TimemaniaPage"));
const DuplaSenaPage = lazy(() => import("./components/lottery/DuplaSenaPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
import WebhooksPage from "./pages/webhooks";
import PaymentSuccessPage from "./pages/success";
import PaymentPendingPage from "./pages/pending";
import PaymentFailurePage from "./pages/failure";

function App() {
  const location = useLocation();

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <LazyMotion features={domAnimation}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/favicon.svg"
                alt="Logo"
                className="w-24 h-24"
                width="96"
                height="96"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <LoadingSpinner size="lg" />
            </motion.div>
            <motion.p
              className="text-lg text-primary font-medium mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Carregando combinações inteligentes...
            </motion.p>
          </LazyMotion>
        </div>
      }
    >
      <>
        <ScrollToTopOnNavigate />
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/megasena"
                element={
                  <PageTransition>
                    <MegaSenaPage />
                  </PageTransition>
                }
              />
              <Route
                path="/lotofacil"
                element={
                  <PageTransition>
                    <LotofacilPage />
                  </PageTransition>
                }
              />
              <Route
                path="/quina"
                element={
                  <PageTransition>
                    <QuinaPage />
                  </PageTransition>
                }
              />
              <Route
                path="/timemania"
                element={
                  <PageTransition>
                    <TimemaniaPage />
                  </PageTransition>
                }
              />
              <Route
                path="/duplasena"
                element={
                  <PageTransition>
                    <DuplaSenaPage />
                  </PageTransition>
                }
              />
              <Route
                path="/webhooks"
                element={
                  <PageTransition>
                    <WebhooksPage />
                  </PageTransition>
                }
              />
              <Route
                path="/success"
                element={
                  <PageTransition>
                    <PaymentSuccessPage />
                  </PageTransition>
                }
              />
              <Route
                path="/pending"
                element={
                  <PageTransition>
                    <PaymentPendingPage />
                  </PageTransition>
                }
              />
              <Route
                path="/failure"
                element={
                  <PageTransition>
                    <PaymentFailurePage />
                  </PageTransition>
                }
              />

              {/* Add tempobook route for Tempo platform */}
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" element={<></>} />
              )}

              {/* 404 page */}
              <Route
                path="/404"
                element={
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                }
              />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </AnimatePresence>
        </LazyMotion>
      </>
    </Suspense>
  );
}

export default App;
