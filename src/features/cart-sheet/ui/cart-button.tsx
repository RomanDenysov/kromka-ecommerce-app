'use client'

import { ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import { Badge } from '~/shared/ui/components/badge'
import { Button } from '~/shared/ui/components/button'

const CartButton = () => {
  return (
    <Button variant={'ghost'} size={'icon'} className='size-10 rounded-full grid place-items-center relative'>
      <ShoppingCartIcon size={24} />
      <Badge className='absolute px-1 py-0 top-0 right-0'>
        1
      </Badge>
    </Button>
  )
}

export default CartButton