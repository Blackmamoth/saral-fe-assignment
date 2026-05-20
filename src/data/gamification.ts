import type {
  EventDuration,
  RewardEventType,
  RewardType,
} from "@/types/rewards"

export const sidebarItems = [
  { label: "Home", iconSrc: "/icons/sidebar-home.svg" },
  { label: "Insights", iconSrc: "/icons/sidebar-insights.svg" },
  {
    label: "Gamification",
    iconSrc: "/icons/sidebar-gamification.svg",
    active: true,
  },
  { label: "Applications", iconSrc: "/icons/sidebar-applications.svg" },
  { label: "Payments", iconSrc: "/icons/sidebar-payments.svg" },
]

export const featureCards = [
  {
    title: "Reward Your Ambassadors",
    body: "Boost campaign performance by setting up rewards for ambassadors",
    iconSrc: "/icons/feature-reward-ambassadors.svg",
  },
  {
    title: "Set Milestones",
    body: "Set up custom goals for sales, posts, or time-based achievements",
    iconSrc: "/icons/feature-set-milestones.svg",
  },
  {
    title: "Customise Incentives",
    body: "Create custom incentives like flat fees, free products, or special commissions.",
    iconSrc: "/icons/feature-customise-incentives.svg",
  },
]

export const eventOptions: RewardEventType[] = [
  "Cross $X in sales",
  "Posts X times every Y period",
  "Is Onboarded",
]

export const rewardOptions: RewardType[] = [
  "Flat $X bonus",
  "Upgrade Commission Tier",
]

export const commissionTierOptions = [
  "Bronze Partner",
  "Silver Partner",
  "Gold Partner",
  "Platinum Partner",
  "Elite Partner",
]

export const durationOptions: EventDuration[] = [
  "14 days",
  "1 month",
  "2 months",
  "3 months",
  "1 year",
]
