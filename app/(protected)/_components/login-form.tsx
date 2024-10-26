"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import useUser from "../_hooks/use-user";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  onLogin: (user: { email: string }) => void;
};

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useUser();
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const res = login({ email, password });
      if (!res.success) {
        setError(res.error);
      }
      if (res.success) {
        onLogin({ email });
      }
    } catch (error) {
      console.log(error);
      setError(error as string);
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center max-w-sm mx-auto">
      <div className="bg-default-100 rounded-lg p-5 space-y-5">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <Input
          size="sm"
          label="Email"
          variant="bordered"
          className="bg-white"
          onValueChange={setEmail}
        />
        <Input
          size="sm"
          label="Password"
          variant="bordered"
          className="bg-white"
          onValueChange={setPassword}
        />
        <div className="flex justify-center">
          <Button color="primary" onPress={handleSubmit}>
            Submit
          </Button>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
      </div>
    </div>
  );
};
