import "@/assets/style/globals.css";
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
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
