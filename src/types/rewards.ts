export type RewardEventType =
  | "Cross $X in sales"
  | "Posts X times every Y period"
  | "Is Onboarded"

export type RewardType = "Flat $X bonus" | "Upgrade Commission Tier"

export type Reward = {
  amount?: string
  tierName?: string
  type: RewardType
}

export type EventDuration =
  | "14 days"
  | "1 month"
  | "2 months"
  | "3 months"
  | "1 year"

export type RewardEvent = {
  amount?: string
  duration?: EventDuration
  postCount?: string
  type: RewardEventType
}
