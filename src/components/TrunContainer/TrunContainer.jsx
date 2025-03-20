'use client'

import { useEffect, useRef, useState } from 'react'

import cn from 'classnames'
import { Tooltip } from '../Tooltip/Tooltip'

export const TruncateContainer = ({
  children,
  className,
  maxWidth,
  critWidth,
  disabled,
  childrenClassName = '',
  maxLines,
  isClickable = true,
  text,
}) => {
  const ref = useRef(children)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const { current: el } = ref
      const styles = getComputedStyle(el)
      const widthEl = parseFloat(styles.width)
      const ctx = document.createElement('canvas').getContext('2d')
      if (ctx) {
        ctx.font = `${styles.fontSize} ${styles.fontFamily}`
        const text = ctx.measureText(el.innerText)
        if (ref.current.clientWidth < critWidth) setIsTruncated(true)
      }
    }
  }, [])

  return !disabled ? (
    <div ref={ref} className={className}>
      <Tooltip
        isActive={isTruncated}
        label={text || children}
        isClickable={isClickable}
        className="shadow-[0px_0px_16px_0px_#95A1FF33]"
      >
        <div
          className={cn(childrenClassName, {
            'truncate-multiline': maxLines,
            '!truncate': !maxLines,
          })}
          data-testid="truncate-container"
          style={{ maxWidth: `${maxWidth}px`, WebkitLineClamp: maxLines || 1 }}
        >
          {children}
        </div>
      </Tooltip>
    </div>
  ) : (
    <div className={cn(className, childrenClassName)}>{children}</div>
  )
}
