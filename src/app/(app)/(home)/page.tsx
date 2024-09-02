import React from 'react'
import { SignInButton } from '~/app/_components/sign-in-button';
import Container from '~/shared/ui/components/container';

export default async function HomePage() {

  return (
    <Container>
      <h3 className='text-red-500 font-bold'>Payload CMS User Login</h3>
      <SignInButton />
    </Container>
  )
}
