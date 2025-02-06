import { SubscriptionLevel } from "./subscriptions";

export function canCreateJobListing(
  subscriptionLevel: SubscriptionLevel,
  currentJobListingsCount: number
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    free: 1,
    pro: 3,
    pro_plus: Infinity,
  };

  const maxResumes = maxResumeMap[subscriptionLevel];

  return currentJobListingsCount < maxResumes;
}
