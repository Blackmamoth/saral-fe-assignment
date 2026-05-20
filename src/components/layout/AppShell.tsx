import type { ReactNode } from "react"

import { sidebarItems } from "@/data/gamification"
import { SvgCrop } from "@/components/gamification/SvgCrop"

const sidebarLinkBase =
  "group flex h-9 w-[156px] items-center gap-3 rounded-[10px] px-2 text-sm leading-[1.4] transition-colors duration-150 hover:bg-white/70 hover:text-[#9F269F] focus-visible:bg-white/70 focus-visible:text-[#9F269F] focus-visible:ring-2 focus-visible:ring-[#C530C5]/30 focus-visible:outline-none"

function SettingsIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
      fill="none"
      focusable="false"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#settings-icon-clip)">
        <path
          d="M6.66602 5.83333C6.66602 6.71739 7.0172 7.56524 7.64233 8.19036C8.26745 8.81548 9.11529 9.16667 9.99935 9.16667C10.8834 9.16667 11.7313 8.81548 12.3564 8.19036C12.9815 7.56524 13.3327 6.71739 13.3327 5.83333C13.3327 4.94928 12.9815 4.10143 12.3564 3.47631C11.7313 2.85119 10.8834 2.5 9.99935 2.5C9.11529 2.5 8.26745 2.85119 7.64233 3.47631C7.0172 4.10143 6.66602 4.94928 6.66602 5.83333Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M5 17.5V15.8333C5 14.9493 5.35119 14.1014 5.97631 13.4763C6.60143 12.8512 7.44928 12.5 8.33333 12.5H11.6667C12.5507 12.5 13.3986 12.8512 14.0237 13.4763C14.6488 14.1014 15 14.9493 15 15.8333V17.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="settings-icon-clip">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
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
                sidebarLinkBase,
                item.active
                  ? "bg-[#FFFDFF] text-[#C530C5] hover:bg-white"
                  : "text-[#616161]",
              ].join(" ")}
              href="#"
              key={item.label}
            >
              <SvgCrop
                className="size-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
                viewBox={item.crop}
              />
              <span className="transition-transform duration-150 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      <a className={`${sidebarLinkBase} text-[#616161]`} href="#">
        <SettingsIcon />
        <span className="transition-transform duration-150 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
          Settings
        </span>
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
    <div className="h-svh overflow-hidden bg-white text-[#303030]">
      <MobileHeader />
      <div className="h-[calc(100svh-3.5rem)] overflow-hidden lg:flex lg:h-svh">
        <Sidebar />
        <div className="min-w-0 flex-1 overflow-hidden">
          <TopNav />
          <main className="h-full overflow-hidden px-4 pt-8 pb-12 sm:px-6 lg:h-[calc(100svh-4rem)] lg:px-0 lg:pt-[38px]">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
