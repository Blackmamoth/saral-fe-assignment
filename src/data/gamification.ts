import type {
  EventDuration,
  RewardEventType,
  RewardType,
} from "@/types/rewards"

export const sidebarItems = [
  { label: "Home", crop: "26 84 16 18" },
  { label: "Insights", crop: "26 124 16 18" },
  { label: "Gamification", crop: "26 164 16 16", active: true },
  { label: "Applications", crop: "26 204 16 17" },
  { label: "Payments", crop: "26 244 16 17" },
]

export const featureCards = [
  {
    title: "Reward Your Ambassadors",
    body: "Boost campaign performance by setting up rewards for ambassadors",
    iconCrop: "463 383 70 70",
  },
  {
    title: "Set Milestones",
    body: "Set up custom goals for sales, posts, or time-based achievements",
    iconCrop: "779 383 70 70",
  },
  {
    title: "Customise Incentives",
    body: "Create custom incentives like flat fees, free products, or special commissions.",
    iconCrop: "1095 383 70 70",
  },
]

export const eventOptions: RewardEventType[] = [
  "Cross $X in sales",
  "Posts X times every Y period",
  "Is Onboarded",
]

export const rewardOptions: RewardType[] = [
  "Flat $100 Bonus",
  "10% commission",
  "Free product",
]

export const durationOptions: EventDuration[] = [
  "14 days",
  "1 month",
  "2 months",
  "3 months",
  "1 year",
]
