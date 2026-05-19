import { CalendarDays, Check, ChevronDown, X } from "lucide-react"
import { type ReactNode, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
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
  RewardEvent,
  RewardEventType,
  RewardType,
} from "@/types/rewards"

function formatRewardEvent(event: RewardEvent | null) {
  if (!event) return "Select a reward event"
  if (event.type === "Cross $X in sales" && event.amount) {
    return `Cross $${event.amount} in sales`
  }
  if (
    event.type === "Posts X times every Y period" &&
    event.postCount &&
    event.duration
  ) {
    return `Posts ${event.postCount} times every ${event.duration}`
  }
  return event.type
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
      <label className="font-sans text-sm leading-[1.4] font-medium text-[#303030]">
        {label} <span className="text-[#E02626]">*</span>
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
  showCrossEditor,
  showDurationDropdown,
  showPostsEditor,
  onToggleDurationDropdown,
}: {
  amount: string
  duration: EventDuration | null
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
  showCrossEditor: boolean
  showDurationDropdown: boolean
  showPostsEditor: boolean
  onToggleDurationDropdown: () => void
}) {
  const isEditing = showCrossEditor || showPostsEditor
  const canSave = showCrossEditor
    ? Boolean(amount)
    : Boolean(postCount && duration)

  return (
    <div
      className="absolute top-[68px] left-0 z-20 w-[352px] rounded-lg border border-[#E3E3E3] bg-white p-1 shadow-[0_4px_2px_rgba(48,48,48,0.04),0_16px_32px_-4px_rgba(48,48,48,0.10)]"
      data-popover="true"
    >
      <div className="flex flex-col gap-2">
        {eventOptions.map((option) => {
          const isCrossSales = option === "Cross $X in sales"
          const isPosts = option === "Posts X times every Y period"
          const isSelected =
            event?.type === option ||
            (isCrossSales && showCrossEditor) ||
            (isPosts && showPostsEditor)

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
              {isCrossSales && showCrossEditor && (
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
              {isPosts && showPostsEditor && (
                <div className="flex h-12 items-center gap-4">
                  <input
                    autoFocus
                    className="h-12 min-w-0 flex-1 rounded-[10px] border-2 border-[#C530C5] px-3 text-base leading-[1.4] text-[#303030] outline-none placeholder:text-[#B5B5B5]"
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
                        "flex h-12 w-full items-center justify-between rounded-[10px] border bg-white px-3 text-left text-base leading-[1.4] outline-none",
                        showDurationDropdown
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
                    {showDurationDropdown && (
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
  onPick,
  selectedReward,
}: {
  onPick: (option: RewardType) => void
  selectedReward: RewardType | null
}) {
  return (
    <div
      className="absolute top-[152px] left-0 z-20 w-[352px] rounded-lg border border-[#E3E3E3] bg-white p-1 shadow-[0_4px_2px_rgba(48,48,48,0.04),0_16px_32px_-4px_rgba(48,48,48,0.10)]"
      data-popover="true"
    >
      <div className="flex flex-col gap-1">
        {rewardOptions.map((option) => (
          <button
            className={[
              "flex h-10 items-center justify-between rounded-lg px-2 text-left text-base leading-[1.4]",
              selectedReward === option
                ? "bg-[#FFF5FF] text-[#C530C5]"
                : "text-[#303030] hover:bg-[#FFF5FF]",
            ].join(" ")}
            key={option}
            onClick={() => onPick(option)}
            type="button"
          >
            <span>{option}</span>
            {selectedReward === option && (
              <Check className="size-5" strokeWidth={2} />
            )}
          </button>
        ))}
      </div>
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
        <span className="font-sans text-sm leading-[1.4] font-medium text-[#303030]">
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
        <span className="font-sans text-sm font-medium text-[#303030]">
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
  const [activePopover, setActivePopover] = useState<
    "event" | "reward" | "date" | null
  >(null)
  const [eventAmount, setEventAmount] = useState("")
  const [postCount, setPostCount] = useState("")
  const [postDuration, setPostDuration] = useState<EventDuration | null>(null)
  const [rewardEvent, setRewardEvent] = useState<RewardEvent | null>(null)
  const [reward, setReward] = useState<RewardType | null>(null)
  const [showCrossEditor, setShowCrossEditor] = useState(false)
  const [showPostsEditor, setShowPostsEditor] = useState(false)
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)
  const [timeBound, setTimeBound] = useState(false)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const canCreate = useMemo(
    () => Boolean(rewardEvent && reward && (!timeBound || endDate)),
    [endDate, reward, rewardEvent, timeBound]
  )

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  function resetDropdowns() {
    setActivePopover(null)
    setShowCrossEditor(false)
    setShowPostsEditor(false)
    setShowDurationDropdown(false)
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
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2
                className="font-sans text-xl leading-[1.4] font-medium text-[#303030]"
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
                onClick={() => {
                  setActivePopover((current) =>
                    current === "event" ? null : "event"
                  )
                  setShowCrossEditor(false)
                  setShowPostsEditor(false)
                  setShowDurationDropdown(false)
                }}
                value={formatRewardEvent(rewardEvent)}
              />
              <RewardField
                active={activePopover === "reward"}
                label="Reward with"
                onClick={() => {
                  setActivePopover((current) =>
                    current === "reward" ? null : "reward"
                  )
                  setShowCrossEditor(false)
                  setShowPostsEditor(false)
                  setShowDurationDropdown(false)
                }}
                value={reward ?? "Select a reward"}
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
                  amount={eventAmount}
                  duration={postDuration}
                  event={rewardEvent}
                  onAmountChange={setEventAmount}
                  onCancel={resetDropdowns}
                  onDurationChange={(option) => {
                    setPostDuration(option)
                    setShowDurationDropdown(false)
                  }}
                  onPickSimple={(option) => {
                    setRewardEvent({ type: option })
                    setEventAmount("")
                    setPostCount("")
                    setPostDuration(null)
                    resetDropdowns()
                  }}
                  onSave={() => {
                    if (showCrossEditor) {
                      if (!eventAmount) return
                      setRewardEvent({
                        amount: eventAmount,
                        type: "Cross $X in sales",
                      })
                    }
                    if (showPostsEditor) {
                      if (!postCount || !postDuration) return
                      setRewardEvent({
                        duration: postDuration,
                        postCount,
                        type: "Posts X times every Y period",
                      })
                    }
                    resetDropdowns()
                  }}
                  onSelectCrossSales={() => {
                    setShowCrossEditor(true)
                    setShowPostsEditor(false)
                    setShowDurationDropdown(false)
                    setEventAmount(rewardEvent?.amount ?? eventAmount)
                  }}
                  onSelectPosts={() => {
                    setShowPostsEditor(true)
                    setShowCrossEditor(false)
                    setShowDurationDropdown(false)
                    setPostCount(rewardEvent?.postCount ?? postCount)
                    setPostDuration(rewardEvent?.duration ?? postDuration)
                  }}
                  onPostCountChange={setPostCount}
                  onToggleDurationDropdown={() =>
                    setShowDurationDropdown((current) => !current)
                  }
                  postCount={postCount}
                  showCrossEditor={showCrossEditor}
                  showDurationDropdown={showDurationDropdown}
                  showPostsEditor={showPostsEditor}
                />
              )}
              {activePopover === "reward" && (
                <RewardDropdown
                  onPick={(option) => {
                    setReward(option)
                    resetDropdowns()
                  }}
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
            <Button
              className={[
                "h-10 flex-1 rounded-[10px] text-base font-normal text-white disabled:bg-[#F68DF6] disabled:opacity-100",
                canCreate ? "bg-[#C530C5] hover:bg-[#B628B6]" : "bg-[#F68DF6]",
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
      </div>
    </div>
  )
}
