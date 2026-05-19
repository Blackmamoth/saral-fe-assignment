import { Check } from "lucide-react"
import { useEffect } from "react"

export function SuccessToast({ onDone }: { onDone: () => void }) {
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
