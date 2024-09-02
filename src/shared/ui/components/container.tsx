import { cn } from "~/shared/lib/utils"

type Props = {
  className?: string
  children: React.ReactNode
}

export default function Container({ children, className }: Props) {

  return (
    <div className={cn('container mx-auto', className)}>{children}</div>
  )
}
