
import {UserCustomerOptions} from './_components/user-customer-options'
import {UserInfoForm} from './_components/user-info-form'

export default async function UserPage({params}: {params: {userId: string}}) {
	return (
		<section className='size-full space-y-10 py-5'>
			<UserInfoForm />
			<UserCustomerOptions />
		</section>
	)
}
