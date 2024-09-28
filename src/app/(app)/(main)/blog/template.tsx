import React from 'react'
import Container from '~/shared/ui/components/container'
import {Heading} from '~/shared/ui/components/heading'

export default function BlogTemplate({children}: {children: React.ReactNode}) {
	return (
		<React.Fragment>
			<Container>
				<section className='py-5'>
					<div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row'>
						<Heading title='Vitajte v našom bloge!' />
					</div>
				</section>
			</Container>
			{children}
		</React.Fragment>
	)
}
