import { CalendarDays, Check, ChevronDown, Pencil, X } from "lucide-react"
import { type ReactNode, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  commissionTierOptions,
  durationOptions,
  eventOptions,
  rewardOptions,
} from "@/data/gamification"
import {
  addMonths,
  formatDateValue,
  getCalendarDates,
  isSameDay,
  monthFormatter,
} from "@/lib/calendar"
import type {
  EventDuration,
  Reward,
  RewardEvent,
  RewardEventType,
  RewardType,
} from "@/types/rewards"

const CROSS_SALES_EVENT = "Cross $X in sales"
const POSTS_PERIOD_EVENT = "Posts X times every Y period"
const ONBOARDED_EVENT = "Is Onboarded"
const FLAT_BONUS_REWARD = "Flat $X bonus"
const COMMISSION_TIER_REWARD = "Upgrade Commission Tier"

type EventDropdownMode =
  | "options"
  | "cross-sales"
  | "posts-period"
  | "posts-duration"
type RewardDropdownMode = "options" | "flat-bonus"
type ModalMode = "reward" | "tier-select"

function formatRewardEvent(event: RewardEvent | null) {
  if (!event) return "Select a reward event"
  if (event.type === CROSS_SALES_EVENT && event.amount) {
    return `Cross $${event.amount} in sales`
  }
  if (event.type === POSTS_PERIOD_EVENT && event.postCount && event.duration) {
    return `Posts ${event.postCount} times every ${event.duration}`
  }
  return event.type
}

function formatReward(reward: Reward | null) {
  if (!reward) return "Select a reward"
  if (reward.type === FLAT_BONUS_REWARD && reward.amount) {
    return `Flat $${reward.amount} Bonus`
  }
  if (reward.type === COMMISSION_TIER_REWARD && reward.tierName) {
    return `Upgrade to ${reward.tierName}`
  }
  return reward.type
}

function RewardField({
  active,
  disabled,
  label,
  onClick,
  value,
}: {
  active?: boolean
  disabled?: boolean
  label: string
  onClick?: () => void
  value: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-heading text-sm leading-[1.4] font-normal text-[#616161]">
        {label} <span className="text-[#E51C00]">*</span>
      </label>
      <button
        className={[
          "flex h-10 w-full items-center justify-between rounded-lg border bg-white px-2.5 text-left text-base leading-[1.4] transition outline-none",
          active
            ? "border-[#C530C5] ring-1 ring-[#C530C5]"
            : "border-[#E3E3E3]",
          disabled ? "text-[#B5B5B5]" : "text-[#303030]",
        ].join(" ")}
        data-field-trigger="true"
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className="size-5 text-[#616161]" strokeWidth={1.75} />
      </button>
    </div>
  )
}

function EventDropdown({
  amount,
  duration,
  mode,
  event,
  onAmountChange,
  onCancel,
  onDurationChange,
  onPickSimple,
  onSave,
  onSelectCrossSales,
  onSelectPosts,
  onPostCountChange,
  postCount,
  onToggleDurationDropdown,
}: {
  amount: string
  duration: EventDuration | null
  mode: EventDropdownMode
  event: RewardEvent | null
  onAmountChange: (value: string) => void
  onDurationChange: (value: EventDuration) => void
  onCancel: () => void
  onPickSimple: (option: RewardEventType) => void
  onSave: () => void
  onSelectCrossSales: () => void
  onSelectPosts: () => void
  onPostCountChange: (value: string) => void
  postCount: string
  onToggleDurationDropdown: () => void
}) {
  const isCrossEditor = mode === "cross-sales"
  const isPostsEditor = mode === "posts-period" || mode === "posts-duration"
  const isDurationDropdownOpen = mode === "posts-duration"
  const isEditing = isCrossEditor || isPostsEditor
  const canSave = isCrossEditor
    ? Boolean(amount)
    : isPostsEditor
      ? Boolean(postCount && duration)
      : false
  const activeEditorType = isCrossEditor
    ? CROSS_SALES_EVENT
    : isPostsEditor
      ? POSTS_PERIOD_EVENT
      : null

  return (
    <div
      className="absolute top-[68px] left-0 z-20 w-[352px] rounded-lg border border-[#E3E3E3] bg-white p-1 shadow-[0_4px_2px_rgba(48,48,48,0.04),0_16px_32px_-4px_rgba(48,48,48,0.10)]"
      data-popover="true"
    >
      <div className="flex flex-col gap-2">
        {eventOptions.map((option) => {
          const isCrossSales = option === CROSS_SALES_EVENT
          const isPosts = option === POSTS_PERIOD_EVENT
          const isSelected = (activeEditorType ?? event?.type) === option

          return (
            <div className="flex flex-col gap-1" key={option}>
              <button
                aria-selected={isSelected}
                className={[
                  "flex h-10 items-center justify-between rounded-lg px-2 text-left text-base leading-[1.4]",
                  isSelected
                    ? "bg-[#FFF5FF] text-[#C530C5]"
                    : "text-[#303030] hover:bg-[#FFF5FF]",
                ].join(" ")}
                onClick={() =>
                  isCrossSales
                    ? onSelectCrossSales()
                    : isPosts
                      ? onSelectPosts()
                      : onPickSimple(option)
                }
                type="button"
              >
                <span>{option}</span>
                {isSelected && <Check className="size-5" strokeWidth={2} />}
              </button>
              {isCrossSales && isCrossEditor && (
                <div className="relative h-10 rounded-lg border-2 border-[#C530C5]">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-base leading-[1.4] text-[#616161]">
                    $
                  </span>
                  <span className="absolute top-0 left-[43px] h-9 w-px bg-[#E3E3E3]" />
                  <input
                    autoFocus
                    className="h-full w-full rounded-lg bg-transparent pr-3 pl-[53px] text-base leading-[1.4] text-[#303030] outline-none placeholder:text-[#B5B5B5]"
                    inputMode="numeric"
                    onChange={(event) =>
                      onAmountChange(event.target.value.replace(/\D/g, ""))
                    }
                    placeholder="e.g. 100"
                    value={amount}
                  />
                </div>
              )}
              {isPosts && isPostsEditor && (
                <div className="flex h-10 items-center gap-4">
                  <input
                    autoFocus
                    className="h-10 min-w-0 flex-1 rounded-lg border-2 border-[#C530C5] px-3 text-base leading-[1.4] text-[#303030] outline-none placeholder:text-[#B5B5B5]"
                    inputMode="numeric"
                    onChange={(event) =>
                      onPostCountChange(event.target.value.replace(/\D/g, ""))
                    }
                    placeholder="eg: 4"
                    value={postCount}
                  />
                  <div className="relative min-w-0 flex-1">
                    <button
                      className={[
                        "flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-left text-base leading-[1.4] outline-none",
                        isDurationDropdownOpen
                          ? "border-2 border-[#C530C5]"
                          : "border-[#E3E3E3]",
                        duration ? "text-[#303030]" : "text-[#B5B5B5]",
                      ].join(" ")}
                      data-field-trigger="true"
                      onClick={onToggleDurationDropdown}
                      type="button"
                    >
                      <span className="truncate">
                        {duration ?? "Select duration"}
                      </span>
                      <ChevronDown className="size-4" strokeWidth={1.75} />
                    </button>
                    {isDurationDropdownOpen && (
                      <div
                        className="absolute top-[calc(100%+4px)] left-0 z-30 w-full rounded-[4px] border border-[#E3E3E3] bg-white p-1 shadow-[0_4px_2px_rgba(48,48,48,0.04),0_16px_32px_-4px_rgba(48,48,48,0.10)]"
                        data-popover="true"
                      >
                        {durationOptions.map((option) => (
                          <button
                            className={[
                              "flex h-10 w-full items-center rounded px-2 text-left text-sm leading-[1.4]",
                              duration === option
                                ? "bg-[#FFF5FF] text-[#C530C5]"
                                : "text-[#303030] hover:bg-[#FFF5FF]",
                            ].join(" ")}
                            key={option}
                            onClick={() => onDurationChange(option)}
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {isEditing && (
          <div className="flex items-center gap-4 pt-2">
            <Button
              className="h-10 flex-1 rounded-[10px] border border-[#E3E3E3] bg-white text-base font-normal text-[#303030] hover:bg-[#FFF5FF]"
              onClick={onCancel}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              className="h-10 flex-1 rounded-[10px] bg-[#F68DF6] text-base font-normal text-white hover:bg-[#C530C5] disabled:bg-[#F68DF6] disabled:opacity-100"
              disabled={!canSave}
              onClick={onSave}
              type="button"
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function RewardDropdown({
  amount,
  disableCommissionTier,
  mode,
  onAmountChange,
  onCancel,
  onPickSimple,
  onSave,
  onSelectCommissionTier,
  onSelectFlatBonus,
  selectedReward,
}: {
  amount: string
  disableCommissionTier?: boolean
  mode: RewardDropdownMode
  onAmountChange: (value: string) => void
  onCancel: () => void
  onPickSimple: (option: RewardType) => void
  onSave: () => void
  onSelectCommissionTier: () => void
  onSelectFlatBonus: () => void
  selectedReward: Reward | null
}) {
  const isFlatBonusEditor = mode === "flat-bonus"
  const canSave = Boolean(amount)

  return (
    <div
      className="absolute top-[152px] left-0 z-20 w-[352px] rounded-lg border border-[#E3E3E3] bg-white p-1 shadow-[0_4px_2px_rgba(48,48,48,0.04),0_16px_32px_-4px_rgba(48,48,48,0.10)]"
      data-popover="true"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          {rewardOptions.map((option) => {
            const isFlatBonus = option === FLAT_BONUS_REWARD
            const isCommissionTier = option === COMMISSION_TIER_REWARD
            const isDisabled = Boolean(
              disableCommissionTier && isCommissionTier
            )
            const isSelected =
              (isFlatBonusEditor ? FLAT_BONUS_REWARD : selectedReward?.type) ===
              option
            const label =
              isCommissionTier && selectedReward?.tierName
                ? formatReward(selectedReward)
                : option

            return (
              <div className="flex flex-col gap-1" key={option}>
                <button
                  aria-selected={isSelected}
                  disabled={isDisabled}
                  className={[
                    "group flex h-10 items-center justify-between rounded-lg px-2 text-left text-base leading-[1.4] disabled:cursor-not-allowed",
                    isDisabled
                      ? "text-[#B5B5B5]"
                      : isSelected
                        ? "bg-[#FFF5FF] text-[#C530C5]"
                        : "text-[#303030] hover:bg-[#FFF5FF]",
                  ].join(" ")}
                  onClick={() =>
                    isFlatBonus
                      ? onSelectFlatBonus()
                      : isCommissionTier
                        ? onSelectCommissionTier()
                        : onPickSimple(option)
                  }
                  type="button"
                >
                  <span>{label}</span>
                  {isSelected &&
                  isCommissionTier &&
                  selectedReward?.tierName ? (
                    <span className="relative size-5">
                      <Check
                        className="absolute inset-0 size-5 transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0"
                        strokeWidth={2}
                      />
                      <Pencil
                        className="absolute top-0.5 left-0.5 size-4 text-[#8A8A8A] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                        strokeWidth={2}
                      />
                    </span>
                  ) : isSelected ? (
                    <Check className="size-5" strokeWidth={2} />
                  ) : null}
                </button>

                {isFlatBonus && isFlatBonusEditor && (
                  <div className="relative h-10 rounded-lg border-2 border-[#C530C5]">
                    <span className="absolute top-1/2 left-4 -translate-y-1/2 text-base leading-[1.4] text-[#616161]">
                      $
                    </span>
                    <input
                      autoFocus
                      className="h-full w-full rounded-lg bg-transparent pr-3 pl-[31px] text-base leading-[1.4] text-[#303030] outline-none placeholder:text-[#B5B5B5]"
                      inputMode="numeric"
                      onChange={(event) =>
                        onAmountChange(event.target.value.replace(/\D/g, ""))
                      }
                      placeholder="e.g. 100"
                      value={amount}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {isFlatBonusEditor && (
          <div className="flex items-center gap-4">
            <Button
              className="h-10 flex-1 rounded-[10px] border border-[#E3E3E3] bg-white text-base font-normal text-[#303030] hover:bg-[#FFF5FF]"
              onClick={onCancel}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              className="h-10 flex-1 rounded-[10px] bg-[#F68DF6] text-base font-normal text-white hover:bg-[#C530C5] disabled:bg-[#F68DF6] disabled:opacity-100"
              disabled={!canSave}
              onClick={onSave}
              type="button"
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function TierSelectDropdown({
  onPick,
  selectedTier,
}: {
  onPick: (option: string) => void
  selectedTier: string | null
}) {
  return (
    <div
      className="absolute top-[68px] left-0 z-20 w-[352px] rounded-lg border border-[#E3E3E3] bg-white p-1 shadow-[0_4px_2px_rgba(48,48,48,0.04),0_16px_32px_-4px_rgba(48,48,48,0.10)]"
      data-popover="true"
    >
      <div className="flex flex-col gap-1">
        {commissionTierOptions.map((option) => {
          const isSelected = selectedTier === option

          return (
            <button
              className={[
                "flex h-10 items-center justify-between rounded-lg px-2 text-left text-base leading-[1.4]",
                isSelected
                  ? "bg-[#FFF5FF] text-[#C530C5]"
                  : "text-[#303030] hover:bg-[#FFF5FF]",
              ].join(" ")}
              key={option}
              onClick={() => onPick(option)}
              type="button"
            >
              <span>{option}</span>
              {isSelected && <Check className="size-5" strokeWidth={2} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TierSelectView({
  active,
  onBack,
  onClose,
  onSave,
  onTierClick,
  onTierPick,
  selectedTier,
}: {
  active: boolean
  onBack: () => void
  onClose: () => void
  onSave: () => void
  onTierClick: () => void
  onTierPick: (option: string) => void
  selectedTier: string | null
}) {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2
            className="font-heading text-xl leading-[1.4] font-medium text-[#303030]"
            id="reward-modal-title"
          >
            Select a commission tier
          </h2>
          <button
            aria-label="Close reward modal"
            className="grid size-6 place-items-center text-[#4A4A4A]"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>

        <div className="relative">
          <RewardField
            active={active}
            label="Upgrade to"
            onClick={onTierClick}
            value={selectedTier ?? "Select a tier"}
          />
          {active && (
            <TierSelectDropdown
              onPick={onTierPick}
              selectedTier={selectedTier}
            />
          )}
        </div>
      </div>

      {selectedTier && (
        <div className="flex w-full items-center gap-4">
          <Button
            className="h-10 flex-1 rounded-[10px] border border-[#E3E3E3] bg-white text-base font-normal text-[#303030] hover:bg-[#FFF5FF]"
            onClick={onBack}
            type="button"
            variant="outline"
          >
            Go Back
          </Button>
          <Button
            className="h-10 flex-1 rounded-[10px] bg-[#C530C5] text-base font-normal text-white hover:bg-[#B628B6]"
            onClick={onSave}
            type="button"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  )
}

function TimeBoundControl({
  activeDate,
  calendar,
  date,
  enabled,
  onDateClick,
  onToggle,
}: {
  activeDate: boolean
  calendar?: ReactNode
  date: Date | null
  enabled: boolean
  onDateClick: () => void
  onToggle: () => void
}) {
  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-heading text-sm leading-[1.4] font-medium text-[#303030]">
          Make the reward time bound
        </span>
        <button
          aria-pressed={enabled}
          className={[
            "relative h-5 w-8 rounded-full transition",
            enabled ? "bg-[#C530C5]" : "bg-[#E3E3E3]",
          ].join(" ")}
          onClick={onToggle}
          type="button"
        >
          <span
            className={[
              "absolute top-0.5 size-4 rounded-full bg-white transition",
              enabled ? "left-3.5" : "left-0.5",
            ].join(" ")}
          />
        </button>
      </div>
      <p className="text-xs leading-[1.5] text-[#616161]">
        Choose an end date to stop this reward automatically.
      </p>
      {enabled && (
        <button
          className={[
            "mt-2 flex h-10 w-full items-center justify-between rounded-lg border bg-white px-2.5 text-left text-base leading-[1.4] outline-none",
            activeDate
              ? "border-[#C530C5] ring-1 ring-[#C530C5]"
              : "border-[#E3E3E3]",
            date ? "text-[#303030]" : "text-[#B5B5B5]",
          ].join(" ")}
          data-field-trigger="true"
          onClick={onDateClick}
          type="button"
        >
          <span className="flex items-center gap-3">
            <CalendarDays
              className="size-5 text-[#616161]"
              strokeWidth={1.75}
            />
            {formatDateValue(date) ?? "Select End Date"}
          </span>
        </button>
      )}
      {enabled && calendar}
    </div>
  )
}

function CalendarArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "right" ? "size-4 rotate-180" : "size-4"}
      fill="none"
      focusable="false"
      viewBox="0 0 16 16"
    >
      <path
        d="M6.0926 12.0175C6.4306 12.3566 6.4306 12.9065 6.0926 13.2456C5.7547 13.5848 5.2068 13.5848 4.8689 13.2456L0.2535 8.614C-0.0845 8.2749 -0.0845 7.7251 0.2535 7.386L4.8689 2.7544C5.2068 2.4152 5.7547 2.4152 6.0926 2.7544C6.4306 3.0935 6.4306 3.6433 6.0926 3.9824L2.9546 7.1316H14.1346C14.6125 7.1316 15 7.5204 15 8C15 8.4796 14.6125 8.8684 14.1346 8.8684H2.9546L6.0926 12.0175Z"
        fill="#4A4A4A"
      />
    </svg>
  )
}

function DatePickerPopover({
  onPick,
  selectedDate,
}: {
  onPick: (date: Date) => void
  selectedDate: Date | null
}) {
  const [visibleMonth, setVisibleMonth] = useState(
    () => selectedDate ?? new Date(2025, 9, 1)
  )
  const calendarDates = getCalendarDates(visibleMonth)

  return (
    <div
      className="absolute top-[calc(100%+8px)] left-0 z-20 w-[276px] rounded-lg border border-[#E3E3E3] bg-white p-4 shadow-[0_4px_2px_rgba(48,48,48,0.04),0_16px_32px_-4px_rgba(48,48,48,0.10)]"
      data-popover="true"
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          aria-label="Previous month"
          className="grid size-8 place-items-center rounded-lg border border-[#E3E3E3] bg-white hover:bg-[#FFF5FF]"
          onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
          title="Previous month"
          type="button"
        >
          <CalendarArrowIcon direction="left" />
        </button>
        <span className="font-heading text-sm font-medium text-[#303030]">
          {monthFormatter.format(visibleMonth)}
        </span>
        <button
          aria-label="Next month"
          className="grid size-8 place-items-center rounded-lg border border-[#E3E3E3] bg-white hover:bg-[#FFF5FF]"
          onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
          title="Next month"
          type="button"
        >
          <CalendarArrowIcon direction="right" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs leading-[1.5] text-[#616161]">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-sm">
        {calendarDates.map((date) => {
          const isOutsideMonth = date.getMonth() !== visibleMonth.getMonth()
          const isSelected = isSameDay(selectedDate, date)

          return (
            <button
              className={[
                "h-8 rounded-md leading-8",
                isSelected
                  ? "bg-[#C530C5] text-white"
                  : "text-[#303030] hover:bg-[#FFF5FF] hover:text-[#C530C5]",
                isOutsideMonth && !isSelected ? "text-[#616161]" : "",
              ].join(" ")}
              key={date.toISOString()}
              onClick={() => onPick(date)}
              type="button"
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function RewardModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: () => void
}) {
  const [modalMode, setModalMode] = useState<ModalMode>("reward")
  const [activePopover, setActivePopover] = useState<
    "event" | "reward" | "date" | "tier" | null
  >(null)
  const [draftAmount, setDraftAmount] = useState("")
  const [draftPostCount, setDraftPostCount] = useState("")
  const [draftDuration, setDraftDuration] = useState<EventDuration | null>(null)
  const [draftRewardAmount, setDraftRewardAmount] = useState("")
  const [draftCommissionTier, setDraftCommissionTier] = useState<string | null>(
    null
  )
  const [eventDropdownMode, setEventDropdownMode] =
    useState<EventDropdownMode>("options")
  const [rewardDropdownMode, setRewardDropdownMode] =
    useState<RewardDropdownMode>("options")
  const [rewardEvent, setRewardEvent] = useState<RewardEvent | null>(null)
  const [reward, setReward] = useState<Reward | null>(null)
  const [timeBound, setTimeBound] = useState(false)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const canCreate = useMemo(
    () => Boolean(rewardEvent && reward && (!timeBound || endDate)),
    [endDate, reward, rewardEvent, timeBound]
  )
  const shouldDisableCommissionTier =
    rewardEvent?.type === POSTS_PERIOD_EVENT ||
    rewardEvent?.type === ONBOARDED_EVENT

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  function resetDropdowns() {
    setActivePopover(null)
    setEventDropdownMode("options")
    setRewardDropdownMode("options")
  }

  function returnToRewardModal() {
    setModalMode("reward")
    resetDropdowns()
  }

  function openEventDropdown() {
    setActivePopover((current) => (current === "event" ? null : "event"))
    setEventDropdownMode("options")
    setRewardDropdownMode("options")
  }

  function openRewardDropdown() {
    setActivePopover((current) => (current === "reward" ? null : "reward"))
    setEventDropdownMode("options")
    setRewardDropdownMode("options")
  }

  function openCommissionTierSelector() {
    setModalMode("tier-select")
    setActivePopover("tier")
    setRewardDropdownMode("options")
    setDraftCommissionTier(
      reward?.type === COMMISSION_TIER_REWARD ? (reward.tierName ?? null) : null
    )
  }

  function openCrossSalesEditor() {
    setEventDropdownMode("cross-sales")
    setDraftAmount(
      rewardEvent?.type === CROSS_SALES_EVENT ? (rewardEvent.amount ?? "") : ""
    )
  }

  function openPostsPeriodEditor() {
    setEventDropdownMode("posts-period")
    setDraftPostCount(
      rewardEvent?.type === POSTS_PERIOD_EVENT
        ? (rewardEvent.postCount ?? "")
        : ""
    )
    setDraftDuration(
      rewardEvent?.type === POSTS_PERIOD_EVENT
        ? (rewardEvent.duration ?? null)
        : null
    )
  }

  function saveEditedRewardEvent() {
    if (eventDropdownMode === "cross-sales") {
      if (!draftAmount) return
      setRewardEvent({
        amount: draftAmount,
        type: CROSS_SALES_EVENT,
      })
      resetDropdowns()
      return
    }

    if (
      eventDropdownMode === "posts-period" ||
      eventDropdownMode === "posts-duration"
    ) {
      if (!draftPostCount || !draftDuration) return
      setRewardEvent({
        duration: draftDuration,
        postCount: draftPostCount,
        type: POSTS_PERIOD_EVENT,
      })
      if (reward?.type === COMMISSION_TIER_REWARD) setReward(null)
      resetDropdowns()
    }
  }

  function openFlatBonusEditor() {
    setRewardDropdownMode("flat-bonus")
    setDraftRewardAmount(
      reward?.type === FLAT_BONUS_REWARD ? (reward.amount ?? "") : ""
    )
  }

  function saveEditedReward() {
    if (rewardDropdownMode !== "flat-bonus" || !draftRewardAmount) return

    setReward({
      amount: draftRewardAmount,
      type: FLAT_BONUS_REWARD,
    })
    resetDropdowns()
  }

  function saveCommissionTierReward() {
    if (!draftCommissionTier) return

    setReward({
      tierName: draftCommissionTier,
      type: COMMISSION_TIER_REWARD,
    })
    returnToRewardModal()
  }

  return (
    <div
      aria-labelledby="reward-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/15 backdrop-blur-[10px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      role="dialog"
    >
      <div className="absolute top-[clamp(96px,16.2vh,166px)] left-1/2 w-[min(400px,calc(100vw-48px))] -translate-x-1/2 rounded-xl bg-white p-6 shadow-[0_4px_2px_rgba(48,48,48,0.04),0_16px_32px_-4px_rgba(48,48,48,0.10)]">
        <div
          className="flex w-full flex-col gap-6"
          onMouseDownCapture={(event) => {
            if (!activePopover) return

            const target = event.target as HTMLElement
            if (
              target.closest("[data-popover]") ||
              target.closest("[data-field-trigger]")
            ) {
              return
            }

            resetDropdowns()
          }}
        >
          {modalMode === "tier-select" ? (
            <TierSelectView
              active={activePopover === "tier"}
              onBack={returnToRewardModal}
              onClose={onClose}
              onSave={saveCommissionTierReward}
              onTierClick={() =>
                setActivePopover((current) =>
                  current === "tier" ? null : "tier"
                )
              }
              onTierPick={(option) => {
                setDraftCommissionTier(option)
                setActivePopover(null)
              }}
              selectedTier={draftCommissionTier}
            />
          ) : (
            <>
              <div className="flex w-full flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2
                    className="font-heading text-xl leading-[1.4] font-medium text-[#303030]"
                    id="reward-modal-title"
                  >
                    Create your reward system
                  </h2>
                  <button
                    aria-label="Close reward modal"
                    className="grid size-6 place-items-center text-[#4A4A4A]"
                    onClick={onClose}
                    type="button"
                  >
                    <X className="size-4" strokeWidth={2} />
                  </button>
                </div>

                <div className="relative flex w-full flex-col gap-4">
                  <RewardField
                    active={activePopover === "event"}
                    label="Reward event"
                    onClick={openEventDropdown}
                    value={formatRewardEvent(rewardEvent)}
                  />
                  <RewardField
                    active={activePopover === "reward"}
                    label="Reward with"
                    onClick={openRewardDropdown}
                    value={formatReward(reward)}
                  />

                  <TimeBoundControl
                    activeDate={activePopover === "date"}
                    calendar={
                      activePopover === "date" ? (
                        <DatePickerPopover
                          onPick={(date) => {
                            setEndDate(date)
                            resetDropdowns()
                          }}
                          selectedDate={endDate}
                        />
                      ) : null
                    }
                    date={endDate}
                    enabled={timeBound}
                    onDateClick={() =>
                      setActivePopover((current) =>
                        current === "date" ? null : "date"
                      )
                    }
                    onToggle={() => {
                      setTimeBound((current) => {
                        if (current) {
                          setEndDate(null)
                          if (activePopover === "date") setActivePopover(null)
                        }
                        return !current
                      })
                    }}
                  />

                  {activePopover === "event" && (
                    <EventDropdown
                      amount={draftAmount}
                      duration={draftDuration}
                      mode={eventDropdownMode}
                      event={rewardEvent}
                      onAmountChange={setDraftAmount}
                      onCancel={resetDropdowns}
                      onDurationChange={(option) => {
                        setDraftDuration(option)
                        setEventDropdownMode("posts-period")
                      }}
                      onPickSimple={(option) => {
                        setRewardEvent({ type: option })
                        if (
                          option === ONBOARDED_EVENT &&
                          reward?.type === COMMISSION_TIER_REWARD
                        ) {
                          setReward(null)
                        }
                        resetDropdowns()
                      }}
                      onSave={saveEditedRewardEvent}
                      onSelectCrossSales={openCrossSalesEditor}
                      onSelectPosts={openPostsPeriodEditor}
                      onPostCountChange={setDraftPostCount}
                      onToggleDurationDropdown={() =>
                        setEventDropdownMode((current) =>
                          current === "posts-duration"
                            ? "posts-period"
                            : "posts-duration"
                        )
                      }
                      postCount={draftPostCount}
                    />
                  )}
                  {activePopover === "reward" && (
                    <RewardDropdown
                      amount={draftRewardAmount}
                      disableCommissionTier={shouldDisableCommissionTier}
                      mode={rewardDropdownMode}
                      onAmountChange={setDraftRewardAmount}
                      onCancel={resetDropdowns}
                      onPickSimple={(option) => {
                        setReward({ type: option })
                        resetDropdowns()
                      }}
                      onSave={saveEditedReward}
                      onSelectCommissionTier={openCommissionTierSelector}
                      onSelectFlatBonus={openFlatBonusEditor}
                      selectedReward={reward}
                    />
                  )}
                </div>
              </div>

              <div className="flex w-full items-center gap-4">
                <Button
                  className="h-10 flex-1 rounded-[10px] border border-[#E3E3E3] bg-white text-base font-normal text-[#303030] hover:bg-[#FFF5FF]"
                  onClick={onClose}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <div
                  aria-describedby={
                    !canCreate ? "create-reward-tooltip" : undefined
                  }
                  className="group relative flex-1"
                  tabIndex={!canCreate ? 0 : undefined}
                >
                  {!canCreate && (
                    <div
                      className="pointer-events-none absolute top-[calc(100%+8px)] left-1/2 z-30 flex min-h-[33px] w-[min(323px,calc(100vw-48px))] -translate-x-1/2 items-center justify-center rounded-lg bg-[#303030] px-3 py-1 text-center text-[13px] leading-[1.4] font-normal text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                      id="create-reward-tooltip"
                      role="tooltip"
                    >
                      Choose reward trigger and a reward to continue
                    </div>
                  )}
                  <Button
                    className={[
                      "h-10 w-full rounded-[10px] text-base font-normal text-white disabled:bg-[#F68DF6] disabled:opacity-100",
                      canCreate
                        ? "bg-[#C530C5] hover:bg-[#B628B6]"
                        : "bg-[#F68DF6]",
                    ].join(" ")}
                    disabled={!canCreate}
                    onClick={() => {
                      if (!canCreate) return
                      onCreated()
                    }}
                    type="button"
                  >
                    Create Reward
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
