export type RewardEventType =
  | "Cross $X in sales"
  | "Posts X times every Y period"
  | "Is Onboarded"

export type RewardType = "Flat $100 Bonus" | "10% commission" | "Free product"

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
