export const descriptionWithTooltip = (description, tooltips) => {
  if (tooltips && tooltips.length) {
    const result = []
    let remainingText = description

    tooltips.sort((a, b) => b.phrase.length - a.phrase.length)

    tooltips.forEach((tooltip) => {
      const parts = remainingText.split(tooltip.phrase)

      if (parts.length > 1) {
        if (parts[0].trim() !== '') {
          result.push({ text: parts[0].trim() })
        }

        result.push({
          text: tooltip.phrase,
          definition: tooltip.definition,
        })

        remainingText = parts.slice(1).join(tooltip.phrase).trim()
      }
    })

    if (remainingText.trim() !== '') {
      result.push({ text: remainingText.trim() })
    }
    console.log(result)
    return result
  } else return description
}
