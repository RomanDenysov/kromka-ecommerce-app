import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNameInitials(fullName: string): string {
  const nameParts = fullName.split(' ')
  let initials = ''

  for (const part of nameParts) {
    if (part.length > 0) initials += part[0].toUpperCase()
  }

  return initials
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
    notation?: Intl.NumberFormatOptions['notation']
  } = {},
) {
  const {currency = 'EUR', notation = 'compact'} = options

  const numericPrice = typeof price === 'string' ? Number.parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}
