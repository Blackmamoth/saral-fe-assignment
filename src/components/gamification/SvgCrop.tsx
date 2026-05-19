type SvgCropProps = {
  label?: string
  viewBox: string
  className?: string
  preserveAspectRatio?: string
}

export function SvgCrop({
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
