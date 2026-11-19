import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingCall } from "./components/FloatingCall";
import { Home } from "./pages/Home";

export function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Home />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}
