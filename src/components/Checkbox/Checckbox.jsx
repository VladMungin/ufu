import cn from 'classnames'

export const Checkbox = ({ ref, name, label, className = '', error, indeterminate, labelClassName = '', ...rest }) => {
  return (
    <>
      <div
        className={cn('inline-flex items-center', {
          [className]: className,
        })}
      >
        <input
          {...rest}
          ref={ref}
          id={name}
          name={name}
          checked={rest.checked && !indeterminate}
          type="checkbox"
          className={cn('custom-checkbox opacity-0', {
            'checkbox-indeterminate': indeterminate,
          })}
        />
        <label
          data-testid="checkbox-label"
          htmlFor={name}
          className={cn('relative text-black', {
            'before:border-background-primary': !error,
            'before:border-red': error,
            'text-border': rest.disabled,
            'after:!-left-[1.300rem]': !label && indeterminate,
            [labelClassName]: labelClassName,
          })}
        >
          <h4>{label}</h4>
        </label>
      </div>
      {error && (
        <p data-testid="checkbox-error-message" className="mt-extra-small text-red">
          {error.message}
        </p>
      )}
    </>
  )
}
