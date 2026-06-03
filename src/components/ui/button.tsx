import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:cursor-not-allowed disabled:opacity-60'

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  solid: 'bg-brand-coral text-white shadow-[0_18px_60px_rgba(216,90,48,0.22)] hover:bg-brand-coral/90',
  outline: 'border border-brand-purple/40 text-white hover:border-brand-purple/70 hover:bg-white/5',
  ghost: 'bg-white/5 text-white hover:bg-white/10',
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
}

export function Button({ className, variant = 'solid', size = 'md', ...props }: ButtonProps) {
  return (
    <button className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props} />
  )
}
