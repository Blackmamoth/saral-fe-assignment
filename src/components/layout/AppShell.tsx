import type { ReactNode } from "react"

import { sidebarItems } from "@/data/gamification"
import { SvgCrop } from "@/components/gamification/SvgCrop"

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

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh bg-white text-[#303030]">
      <MobileHeader />
      <div className="min-h-svh lg:flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopNav />
          <main className="px-4 pt-8 pb-12 sm:px-6 lg:px-0 lg:pt-[38px]">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
