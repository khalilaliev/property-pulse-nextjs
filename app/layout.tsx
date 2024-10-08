import "@/assets/style/globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";

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
    <AuthProvider>
      <GlobalProvider>
        <html>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
