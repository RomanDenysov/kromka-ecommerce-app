"use client"

import { BookLockIcon, HelpCircleIcon, LogInIcon, LogOutIcon, SettingsIcon, UserIcon, } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useUserQuery } from '~/entities/user/hooks/use-user-query'
import type { User } from '~/payload/payload-types'
import { cn } from '~/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '~/shared/ui/components/avatar'
import { Button, buttonVariants } from '~/shared/ui/components/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '~/shared/ui/components/dropdown-menu'

export const BUTTON_OPTIONS = [
  {
    label: 'Profile',
    href: '/account',
    icon: UserIcon,
  },
  {
    label: 'Settings',
    href: '/account/settings',
    icon: SettingsIcon,
  },
  {
    label: 'Support',
    href: '/account/support',
    icon: HelpCircleIcon,
  },
]

const ADMIN_BTN = {
  label: 'Admin Panel',
  href: '/admin',
  icon: BookLockIcon,
}

const LOGOUT_BTN = {
  label: 'Logout',
  href: '/sign-out',
  icon: LogOutIcon,
}

const UserButton = () => {

  const { data: user, isLoading } = useUserQuery()


  if (isLoading) {
    return (
      <Button variant={'ghost'} size={'icon'} className='size-10 rounded-full grid place-items-center relative'>
        <LogInIcon size={24} />
      </Button>
    )
  }

  // TODO: check if user is admin
  const isAdmin = user?.role === 'admin'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TriggerButton user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuGroup>
          {
            BUTTON_OPTIONS.map((option) => (
              <DropdownMenuItem key={option.label} asChild>
                <Link href={option.href}>
                  <option.icon size={20} className='mr-2' />
                  <span>{option.label}</span>
                </Link>
              </DropdownMenuItem>
            ))
          }
          <DropdownMenuSeparator />
          {isAdmin && <DropdownMenuItem asChild>
            <Link href={ADMIN_BTN.href}>
              <ADMIN_BTN.icon size={20} className='mr-2' />
              <span>{ADMIN_BTN.label}</span>
            </Link>
          </DropdownMenuItem>}

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={LOGOUT_BTN.href}>
              <LOGOUT_BTN.icon size={20} className='mr-2' />
              <span>{LOGOUT_BTN.label}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton

const TriggerButton = ({ user }: { user?: User | null }) => {



  if (!user) {
    return (
      <Link href={'/auth'} className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-10 rounded-full grid place-items-center relative')}>
        <LogInIcon size={24} />
      </Link>
    )
  }

  if (user) {
    return (
      <Avatar>
        <AvatarImage src={user.image || undefined} />
        <AvatarFallback>
          {user.name ?? '?'}
        </AvatarFallback>
      </Avatar>
    )
  }
}