import { useState } from "react"

import { HeroStage } from "@/components/gamification/HeroStage"
import { RewardModal } from "@/components/gamification/RewardModal"
import { SuccessToast } from "@/components/gamification/SuccessToast"
import { AppShell } from "@/components/layout/AppShell"

export function App() {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  return (
    <AppShell>
      <div className="flex w-full flex-col items-center">
        <HeroStage onEnable={() => setIsRewardModalOpen(true)} />
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
    </AppShell>
  )
}

export default App
