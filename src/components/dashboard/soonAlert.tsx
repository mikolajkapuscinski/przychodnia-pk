import React, { HTMLAttributes } from 'react'

export const SoonAlert: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return (
    <div {...rest} className={`bg-aquamarine rounded-xl px-2 py-1 text-default-white font-semibold uppercase ${className}`}>soon</div>
  )
}
