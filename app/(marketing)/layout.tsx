import { Footer } from "./footer";
import { Header } from "./header";
import { ScrollToTop } from "./scroll-to-top";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MarketingLayout;
