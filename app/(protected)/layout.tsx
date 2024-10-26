import ProtectedRoute from "./_components/protected-route";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
