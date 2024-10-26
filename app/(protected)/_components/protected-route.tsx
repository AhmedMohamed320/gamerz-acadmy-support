"use client";

import { useEffect, useState } from "react";
import { LoginForm } from "./login-form";
import useUser from "../_hooks/use-user";
import { Spinner } from "@nextui-org/spinner";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useUser();
  const [user_, setUser_] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUser_(user);
    }
    setLoading(false);
  }, [user]);

  if (loading)
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (!user_) return <LoginForm onLogin={setUser_} />;

  return <>{children}</>;
};

export default ProtectedRoute;
