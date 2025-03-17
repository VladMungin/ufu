'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  autoUpdate,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import { TooltipArrowIcon } from '../../assets/icon/tooltip-arrow-icon'
import { openSide, placementArrow } from './_constants'
import { mergeRefs } from '../../helpers/merge-refs'

export const Tooltip = ({
  children,
  label,
  placement = 'top',
  isActive = true,
  isClickable = false,
  delayClickable = 2000,
  className = '',
  labelClassName = '',
  childrenClassName = '',
  arrowClassName,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen)
  const [stateX, setStateX] = useState()
  const [stateY, setStateY] = useState()

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange(open) {
      if (isClickable) {
        setTimeout(() => setOpen(defaultOpen), delayClickable)
      } else setOpen(open)
    },
    middleware: [offset(16), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  })
  useEffect(() => {
    setStateX(x)
    setStateY(y)
  }, [x, y])

  const stateTooltipVisibleClick = [useClick(context, { ignoreMouse: true })]

  const stateTooltipVisibleHover = [useHover(context, { restMs: 40, mouseOnly: true }), useFocus(context)]

  const stateTooltipVisible = isClickable ? stateTooltipVisibleClick : stateTooltipVisibleHover

  const { getReferenceProps, getFloatingProps } = useInteractions([
    ...stateTooltipVisible,
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ])

  const ref = useMemo(() => mergeRefs([reference, children.ref]), [reference, children])

  const handleClick = (event) => {
    event.stopPropagation()
    setOpen((prev) => !prev)
  }
  return (
    <>
      <div
        className={cn(childrenClassName, 'max-w-full')}
        {...getReferenceProps({ ref })}
        {...(isClickable && { onClick: handleClick })}
      >
        {children}
      </div>

      <AnimatePresence>
        {isActive && open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, ...openSide[placement] }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            {...getFloatingProps({
              ref: floating,
              className: cn(
                'flex items-center bg-white px-small p-2 min-h-[36px] rounded-lg shadow-tooltip z-[9999]',
                className,
              ),
              style: {
                position: strategy,
                top: stateY ?? 0,
                left: stateX ?? 0,
              },
            })}
          >
            <TooltipArrowIcon
              data-testid="tooltip-arrow"
              className={cn(
                'desktop:block pointer-events-none absolute h-1.5 w-3.5 fill-white',
                arrowClassName,
                placementArrow[placement],
              )}
            />
            {typeof label === 'string' && (
              <h6
                className={cn('source-main max-w-[300px] whitespace-pre-wrap text-center text-black', labelClassName)}
              >
                {label}
              </h6>
            )}
            {typeof label === 'object' && label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
