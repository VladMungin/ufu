const enumValue = (name) => Object.freeze({ toString: () => name })

export const PLACEMENTS = Object.freeze({
  TOP: enumValue('top'),
  LEFT: enumValue('left'),
  RIGHT: enumValue('right'),
  BOTTOM: enumValue('bottom'),
  CENTER: enumValue('center'),
})

export const openSide = {
  [PLACEMENTS.TOP]: {
    originY: PLACEMENTS.BOTTOM,
    originX: PLACEMENTS.CENTER,
  },
  [PLACEMENTS.LEFT]: {
    originY: PLACEMENTS.CENTER,
    originX: PLACEMENTS.RIGHT,
  },
  [PLACEMENTS.RIGHT]: {
    originY: PLACEMENTS.CENTER,
    originX: PLACEMENTS.LEFT,
  },
  [PLACEMENTS.BOTTOM]: {
    originY: PLACEMENTS.TOP,
    originX: PLACEMENTS.CENTER,
  },
}

export const placementArrow = {
  top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full rotate-180',
  bottom: 'left-1/2 top-0 -translate-x-1/2 -translate-y-full',
  right: '-left-[10px] bottom-1/2 translate-y-1/2 -rotate-90',
  left: '-right-[10px] bottom-1/2 translate-y-1/2 rotate-90',
}
