import { redirect } from 'next/navigation'
import { auth, signOut } from '~/shared/lib/auth'

export default async function SignOutPage() {

  const session = await auth()

  if (session?.user) async () => signOut()
  redirect('/')
}
