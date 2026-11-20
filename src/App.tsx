import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingCall } from "./components/FloatingCall";
import { FeedbackSection } from "./components/FeedbackSection";
import { Home } from "./pages/Home";

export function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Home />
        <FeedbackSection />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}
