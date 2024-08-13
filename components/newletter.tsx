"use client";

import axios from "axios";
import { FormEvent, useState } from "react";

import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");
  const [responseMsg, setResponseMsg] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>();

  const { toast } = useToast();

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await axios.post("/api/subscribe", { email });
      setStatus("success");
      toast({
        title: "Naujienlaiškis užprenumeruotas sėkmingai!",
      });
      setStatusCode(response.status);
      setEmail("");
      setResponseMsg(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus("error");
        toast({
          variant: "destructive",
          title: "Įvyko klaida. Bandykite dar kartą.",
        });
        setStatusCode(error.response?.status);
        setResponseMsg(error.response?.data.error);
      }
    }
  }

  return (
    <>
      <form className="w-full" onSubmit={handleSubscribe}>
        <div className="flex items-center space-x-2">
          <Input
            className={`${statusCode === 400 && "border-red-500"} `}
            type="email"
            placeholder="Gaukite naujausius darbo pasiūlymus el.paštu."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
          />
          <Button
            className="bg-neutral-950 hover:bg-neutral-950/90 dark:bg-white"
            type="submit"
            disabled={status === "loading"}
          >
            Prenumeruoti
          </Button>
        </div>
        <div className="server-message pt-4 text-green-600">
          {status === "success" ? (
            <p className="text-green-600">{responseMsg}</p>
          ) : null}
          {status === "error" ? (
            <p className="text-red-600">{responseMsg}</p>
          ) : null}
        </div>
      </form>
    </>
  );
};
