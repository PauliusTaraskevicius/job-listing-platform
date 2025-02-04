"use client";

import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumModal from "./usePremiumModal";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { createCheckoutSession } from "@/actions/subscriptions";

const premiumFeatures = ["AI tools", "Up to 3 listings"];
const premiumPlusFeatures = ["Infinite resumes", "Design customizations"];

const PremiumModal = () => {
  const { open, setOpen } = usePremiumModal();

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handlePremiumClick(priceId: string) {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Resume Builder AI Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a premium subscription to unlock more features.</p>
        </div>
        <div className="flex">
          <div className="flex w-1/2 flex-col space-y-5">
            <h3 className="text-center text-lg font-bold">Premium</h3>
            <ul className="list-inside space-y-2">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              disabled={loading}
              onClick={() =>
                handlePremiumClick(
                  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!
                )
              }
            >
              Get Premium
            </Button>
          </div>
          <div className="border-l mx-6" />
          <div className="flex w-1/2 flex-col space-y-5">
            <h3 className="text-center text-lg font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Premium Plus
            </h3>
            <ul className="list-inside space-y-2">
              {premiumPlusFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              disabled={loading}
              onClick={() =>
                handlePremiumClick(
                  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!
                )
              }
            >
              Get Premium Plus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
