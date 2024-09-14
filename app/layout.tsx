import "@/assets/style/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";

interface IMainLayoutProps {
  children: ReactNode;
}
interface IMetadata {
  title: string;
  keywords: string;
  description: string;
}

export const metadata: IMetadata = {
  title: "Property Pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
