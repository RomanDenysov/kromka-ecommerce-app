import Link from 'next/link'
import React from 'react'
import Container from '~/shared/ui/components/container'
import { Icons } from '~/shared/ui/icons'
import Navbar from './navbar'
import CartButton from '~/features/cart-sheet/ui/cart-button'
import UserButton from './user-button'
import { auth } from '~/shared/lib/auth'

export default async function Header() {
  const session = await auth()
  const user = session?.user

  return (
    <header className='sticky top-0 inset-x-0 z-50 bg-background'>
      <Container className='flex items-center justify-between border-b border-border h-16'>

        <Link href="/">
          <Icons.logo className='size-10 fill-accent-foreground' />
        </Link>

        <div>
          <Navbar />
        </div>

        <div className='flex items-center gap-1'>
          <span className='h-8 w-[2px] bg-border' />
          <UserButton />
          <span className='h-8 w-[2px] bg-border' />
          <CartButton />
        </div>

      </Container>
    </header>
  )
}
