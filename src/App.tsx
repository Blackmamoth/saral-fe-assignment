import { CalendarDays, Check, ChevronDown, X } from "lucide-react"
import { type ReactNode, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"

type SvgCropProps = {
  label?: string
  viewBox: string
  className?: string
  preserveAspectRatio?: string
}

type RewardEventType =
  | "Cross $X in sales"
  | "Posts X times every Y period"
  | "Is Onboarded"
type RewardType = "Flat $100 Bonus" | "10% commission" | "Free product"
type EventDuration = "14 days" | "1 month" | "2 months" | "3 months" | "1 year"

type RewardEvent = {
  amount?: string
  duration?: EventDuration
  postCount?: string
  type: RewardEventType
}

const sidebarItems = [
  { label: "Home", crop: "26 84 16 18" },
  { label: "Insights", crop: "26 124 16 18" },
  { label: "Gamification", crop: "26 164 16 16", active: true },
  { label: "Applications", crop: "26 204 16 17" },
  { label: "Payments", crop: "26 244 16 17" },
]

const cards = [
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

const eventOptions: RewardEventType[] = [
  "Cross $X in sales",
  "Posts X times every Y period",
  "Is Onboarded",
]

const rewardOptions: RewardType[] = [
  "Flat $100 Bonus",
  "10% commission",
  "Free product",
]

const durationOptions: EventDuration[] = [
  "14 days",
  "1 month",
  "2 months",
  "3 months",
  "1 year",
]

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
})

const shortMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
})

function addMonths(date: Date, offset: number) {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1)
}

function isSameDay(left: Date | null, right: Date) {
  return (
    Boolean(left) &&
    left?.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

function formatDateValue(date: Date | null) {
  if (!date) return null
  return `${date.getDate()} ${shortMonthFormatter.format(date)} ${date.getFullYear()}`
}

function getCalendarDates(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const gridStart = new Date(firstDay)
  gridStart.setDate(firstDay.getDate() - firstDay.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })
}

function SvgCrop({
  label,
  viewBox,
  className,
  preserveAspectRatio = "xMinYMin meet",
}: SvgCropProps) {
  return (
    <svg
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={className}
      focusable="false"
      preserveAspectRatio={preserveAspectRatio}
      viewBox={viewBox}
    >
      <image href="/desktop-310.svg" height="832" width="1440" x="0" y="0" />
    </svg>
  )
}

function Sidebar() {
  return (
    <aside className="hidden min-h-svh w-[188px] shrink-0 flex-col justify-between bg-[#FDEFFD] px-4 py-6 lg:flex">
      <div>
        <SvgCrop
          className="h-[34px] w-[140px]"
          label="SaTHI"
          viewBox="16 16 140 34"
        />

        <nav className="mt-[34px] flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <a
              aria-current={item.active ? "page" : undefined}
              className={[
                "flex h-9 w-[156px] items-center gap-3 rounded-[10px] px-2 text-sm leading-[1.4]",
                item.active ? "bg-[#FFFDFF] text-[#C530C5]" : "text-[#616161]",
              ].join(" ")}
              href="#"
              key={item.label}
            >
              <SvgCrop className="size-5 shrink-0" viewBox={item.crop} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <a
        className="flex h-9 w-[156px] items-center gap-3 px-2 text-sm leading-[1.4] text-[#616161]"
        href="#"
      >
        <SvgCrop className="size-5 shrink-0" viewBox="26 784 16 18" />
        <span>Settings</span>
      </a>
    </aside>
  )
}

function TopNav() {
  return (
    <header className="hidden h-16 lg:flex lg:justify-center">
      <div className="flex h-full w-full max-w-[1228px] items-center justify-between">
        <h1 className="font-sans text-lg leading-[1.4] font-semibold text-[#303030]">
          Gamification
        </h1>
        <div className="flex items-center gap-4">
          <SvgCrop
            className="h-8 w-[34px]"
            label="Notifications"
            viewBox="1218 16 30 32"
          />
          <SvgCrop
            className="size-8 rounded-full"
            label="User avatar"
            viewBox="1262 16 32 32"
          />
        </div>
      </div>
    </header>
  )
}

function MobileHeader() {
  return (
    <header className="flex h-14 items-center justify-between bg-[#FDEFFD] px-4 lg:hidden">
      <SvgCrop
        className="h-[34px] w-[140px]"
        label="SaTHI"
        viewBox="16 16 140 34"
      />
      <SvgCrop
        className="h-8 w-[34px]"
        label="Notifications"
        viewBox="1218 16 30 32"
      />
    </header>
  )
}

function HeroGridPanel() {
  return (
    <img
      alt=""
      aria-hidden="true"
      className="block aspect-[960/322] h-auto w-full select-none"
      draggable="false"
      src="/hero-background.svg"
    />
  )
}

function Intro({ onEnable }: { onEnable: () => void }) {
  return (
    <section className="flex w-full max-w-[354px] flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-sans text-[28px] leading-[1.4] font-semibold text-[#561056]">
          Gamify your Campaign
        </h2>
        <p className="text-base leading-[1.4] text-[#616161]">
          Enable gamification to start crafting
          <br /> your custom reward system.
        </p>
      </div>
      <Button
        className="h-10 w-[310px] rounded-[10px] bg-[#C530C5] text-base leading-[1.4] font-normal text-white hover:bg-[#B628B6]"
        onClick={onEnable}
        type="button"
      >
        Enable Gamification
      </Button>
    </section>
  )
}

function CardWave({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      preserveAspectRatio="xMinYMin meet"
      viewBox="-20 -55 545 211"
    >
      <g opacity="0.4">
        <g opacity="0.5">
          <path
            clipRule="evenodd"
            d="M433.964 572.886C376.715 614.065 307.801 649.294 235.002 627.715C165.326 607.063 126.569 531.782 83.3774 468.969C42.5669 409.618 1.68128 350.43 -3.23758 281.244C-9.15914 197.955 -13.6384 93.1243 54.0572 56.5682C121.228 20.2956 200.644 112.709 280.223 128.174C363.379 144.334 457.413 83.6741 520.631 147.238C584.802 211.76 567.963 317.086 550.994 400.427C536.011 474.013 491.885 531.225 433.964 572.886Z"
            fillRule="evenodd"
            opacity="0.5"
            stroke="#C530C5"
            strokeWidth="0.5"
          />
          <path
            clipRule="evenodd"
            d="M425.011 560.769C367.762 601.948 298.848 637.177 226.049 615.598C156.373 594.945 117.616 519.665 74.4243 456.852C33.6137 397.501 -7.27188 338.313 -12.1907 269.127C-18.1123 185.838 -22.5916 81.0072 45.1041 44.4511C112.275 8.17846 191.691 100.592 271.27 116.057C354.426 132.217 448.46 71.5569 511.677 135.12C575.848 199.643 559.01 304.969 542.041 388.31C527.058 461.896 482.932 519.108 425.011 560.769Z"
            fillRule="evenodd"
            opacity="0.5"
            stroke="#C530C5"
            strokeWidth="0.5"
          />
          <path
            clipRule="evenodd"
            d="M416.066 548.582C358.816 589.761 289.903 624.989 217.104 603.411C147.427 582.758 108.671 507.477 65.4789 444.664C24.6684 385.314 -16.2172 326.126 -21.136 256.94C-27.0576 173.651 -31.5369 68.8197 36.1588 32.2636C103.33 -4.00904 182.745 88.4047 262.325 103.869C345.481 120.029 439.515 59.3694 502.732 122.933C566.903 187.455 550.065 292.781 533.095 376.122C518.113 449.709 473.987 506.92 416.066 548.582Z"
            fillRule="evenodd"
            opacity="0.5"
            stroke="#C530C5"
            strokeWidth="0.5"
          />
          <path
            clipRule="evenodd"
            d="M407.121 536.456C349.871 577.635 280.958 612.864 208.159 591.286C138.482 570.633 99.7252 495.352 56.5336 432.539C15.7231 373.188 -25.1625 314 -30.0814 244.815C-36.0029 161.525 -40.4822 56.6944 27.2135 20.1383C94.3842 -16.1343 173.8 76.2795 253.379 91.7441C336.535 107.904 430.569 47.2442 493.787 110.808C557.958 175.33 541.119 280.656 524.15 363.997C509.167 437.584 465.041 494.795 407.121 536.456Z"
            fillRule="evenodd"
            opacity="0.5"
            stroke="#C530C5"
            strokeWidth="0.5"
          />
          <path
            clipRule="evenodd"
            d="M398.175 524.316C340.926 565.495 272.012 600.724 199.213 579.145C129.537 558.492 90.7799 483.212 47.5883 420.399C6.77775 361.048 -34.1078 301.86 -39.0267 232.674C-44.9482 149.385 -49.4275 44.5541 18.2682 7.99796C85.4389 -28.2747 164.855 64.1391 244.434 79.6037C327.59 95.7635 421.624 35.1038 484.842 98.6674C549.012 163.189 532.174 268.516 515.205 351.857C500.222 425.443 456.096 482.655 398.175 524.316Z"
            fillRule="evenodd"
            opacity="0.5"
            stroke="#C530C5"
            strokeWidth="0.5"
          />
          <path
            clipRule="evenodd"
            d="M389.269 512.168C332.019 553.347 263.106 588.575 190.307 566.997C120.63 546.344 81.8737 471.063 38.6821 408.25C-2.1285 348.899 -43.0141 289.712 -47.9329 220.526C-53.8545 137.237 -58.3337 32.4056 9.36195 -4.15048C76.5327 -40.4231 155.948 51.9906 235.528 67.4553C318.684 83.615 412.718 22.9554 475.935 86.5189C540.106 151.041 523.268 256.367 506.299 339.708C491.316 413.295 447.19 470.506 389.269 512.168Z"
            fillRule="evenodd"
            opacity="0.5"
            stroke="#C530C5"
            strokeWidth="0.5"
          />
          <path
            clipRule="evenodd"
            d="M380.332 500.019C323.082 541.198 254.168 576.427 181.369 554.848C111.693 534.195 72.9362 458.915 29.7446 396.102C-11.066 336.751 -51.9516 277.563 -56.8704 208.377C-62.792 125.088 -67.2712 20.2572 0.424447 -16.2989C67.5952 -52.5715 147.011 39.8422 226.59 55.3069C309.746 71.4666 403.78 10.8069 466.998 74.3705C531.169 138.893 514.33 244.219 497.361 327.56C482.378 401.146 438.252 458.358 380.332 500.019Z"
            fillRule="evenodd"
            opacity="0.5"
            stroke="#C530C5"
            strokeWidth="0.5"
          />
          <path
            clipRule="evenodd"
            d="M371.378 487.847C314.129 529.026 245.215 564.255 172.416 542.676C102.74 522.024 63.983 446.743 20.7914 383.93C-20.0191 324.579 -60.9047 265.391 -65.8235 196.205C-71.7451 112.916 -76.2244 8.08531 -8.52868 -28.4708C58.6421 -64.7434 138.058 27.6703 217.637 43.135C300.793 59.2947 394.827 -1.36495 458.045 62.1986C522.216 126.721 505.377 232.047 488.408 315.388C473.425 388.974 429.299 446.186 371.378 487.847Z"
            fillRule="evenodd"
            opacity="0.5"
            stroke="#C530C5"
            strokeWidth="0.5"
          />
        </g>
      </g>
    </svg>
  )
}

function FeatureCards() {
  return (
    <div className="grid w-full grid-cols-1 justify-center gap-6 md:grid-cols-[repeat(3,292px)] lg:grid-cols-[repeat(3,var(--card-w))] lg:gap-[var(--card-gap)]">
      {cards.map((card) => (
        <article
          className="relative h-[200px] w-full max-w-[292px] overflow-hidden rounded-lg border border-[#FEE7FE] bg-white shadow-[0_7px_10px_rgba(0,0,0,0.05)] md:w-[292px] lg:h-[var(--card-h)] lg:w-[var(--card-w)] lg:max-w-[var(--card-w)]"
          key={card.title}
        >
          <CardWave className="pointer-events-none absolute -top-[58px] -left-[30px] h-[211px] w-[545px] lg:top-[var(--wave-top)] lg:left-[var(--wave-left)] lg:h-[var(--wave-h)] lg:w-[var(--wave-w)]" />
          <SvgCrop
            className="absolute top-[22px] left-1/2 size-[70px] -translate-x-1/2 lg:top-[var(--icon-top)] lg:size-[var(--icon-size)]"
            viewBox={card.iconCrop}
          />
          <div className="absolute inset-x-4 top-[111px] flex flex-col items-center gap-2 text-center lg:top-[var(--copy-top)] lg:gap-[var(--copy-gap)]">
            <h3 className="font-sans text-base leading-[1.4] font-medium text-[#303030] lg:text-[length:var(--title-size)]">
              {card.title}
            </h3>
            <p className="max-w-[270px] text-sm leading-[1.4] text-[#616161] lg:max-w-[var(--body-w)] lg:text-[length:var(--body-size)]">
              {card.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}

function HeroStage({ onEnable }: { onEnable: () => void }) {
  return (
    <section className="[container-type:inline-size] relative h-[904px] w-full max-w-[1228px] shrink-0 [--body-size:1.4583cqw] [--body-w:28.125cqw] [--card-gap:2.5cqw] [--card-h:20.8333cqw] [--card-w:30.4167cqw] [--cards-top:26.872cqw] [--copy-gap:0.8333cqw] [--copy-top:11.5625cqw] [--hero-h:42.3453cqw] [--icon-size:7.2917cqw] [--icon-top:2.2917cqw] [--title-size:1.6667cqw] [--wave-h:21.9792cqw] [--wave-left:-3.125cqw] [--wave-top:-6.0417cqw] [--wave-w:56.7708cqw] md:h-[464px] lg:h-[var(--hero-h)]">
      <div className="absolute top-0 left-0 w-full">
        <HeroGridPanel />
      </div>
      <div className="absolute top-[59px] left-1/2 z-10 -translate-x-1/2">
        <Intro onEnable={onEnable} />
      </div>
      <div className="absolute top-[257px] left-1/2 z-10 w-full -translate-x-1/2 lg:top-[var(--cards-top)]">
        <FeatureCards />
      </div>
    </section>
  )
}

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

function RewardModal({
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

function SuccessToast({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timeout = window.setTimeout(onDone, 2600)
    return () => window.clearTimeout(timeout)
  }, [onDone])

  return (
    <div className="fixed top-20 right-[clamp(24px,8vw,132px)] z-50 flex h-12 items-center gap-3 rounded-xl border border-[#E3E3E3] bg-white px-4 shadow-[0_4px_2px_rgba(48,48,48,0.04),0_16px_32px_-4px_rgba(48,48,48,0.10)]">
      <span className="grid size-6 place-items-center rounded-full bg-[#C530C5] text-white">
        <Check className="size-4" strokeWidth={2} />
      </span>
      <span className="text-base leading-[1.4] text-[#303030]">
        Reward Created!
      </span>
    </div>
  )
}

export function App() {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  return (
    <div className="min-h-svh bg-white text-[#303030]">
      <MobileHeader />
      <div className="min-h-svh lg:flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopNav />
          <main className="px-4 pt-8 pb-12 sm:px-6 lg:px-0 lg:pt-[38px]">
            <div className="flex w-full flex-col items-center">
              <HeroStage onEnable={() => setIsRewardModalOpen(true)} />
            </div>
          </main>
        </div>
      </div>
      {isRewardModalOpen && (
        <RewardModal
          onClose={() => setIsRewardModalOpen(false)}
          onCreated={() => {
            setIsRewardModalOpen(false)
            setShowSuccessToast(true)
          }}
        />
      )}
      {showSuccessToast && (
        <SuccessToast onDone={() => setShowSuccessToast(false)} />
      )}
    </div>
  )
}

export default App
