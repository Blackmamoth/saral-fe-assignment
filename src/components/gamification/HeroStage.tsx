import { Button } from "@/components/ui/button"
import { featureCards } from "@/data/gamification"
import { SvgCrop } from "@/components/gamification/SvgCrop"

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
      {featureCards.map((card) => (
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

export function HeroStage({ onEnable }: { onEnable: () => void }) {
  return (
    <section className="[container-type:inline-size] relative h-full w-full max-w-[1228px] shrink-0 overflow-hidden [--body-size:1.4583cqw] [--body-w:28.125cqw] [--card-gap:2.5cqw] [--card-h:20.8333cqw] [--card-w:30.4167cqw] [--cards-top:26.872cqw] [--copy-gap:0.8333cqw] [--copy-top:11.5625cqw] [--hero-h:42.3453cqw] [--icon-size:7.2917cqw] [--icon-top:2.2917cqw] [--title-size:1.6667cqw] [--wave-h:21.9792cqw] [--wave-left:-3.125cqw] [--wave-top:-6.0417cqw] [--wave-w:56.7708cqw] md:h-[min(464px,100%)] lg:h-[min(var(--hero-h),100%)]">
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
