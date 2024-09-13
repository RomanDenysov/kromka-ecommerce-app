import React from 'react'
import {cn} from '~/shared/lib/utils'
import {Progress} from '~/shared/ui/components/progress'

type PasswordStrengthMeterProps = {
	password: string
}
const strengthLabels = {
	weak: 'Slabé heslo',
	medium: 'Stredne silné heslo',
	strong: 'Silné heslo',
}

const PasswordStrengthMeter = ({password}: PasswordStrengthMeterProps) => {
	const {strength, indicatorColor, label} = React.useMemo(() => {
		const getPasswordStrength = (pass: string): number => {
			let strength = 0
			if (pass.length > 7) strength += 25
			if (pass.match(/[a-z]+/)) strength += 25
			if (pass.match(/[A-Z]+/)) strength += 25
			if (pass.match(/[0-9]+/)) strength += 25
			if (pass.match(/[^a-zA-Z0-9]+/)) strength += 25 // Special characters
			return Math.min(strength, 100) // Ensure max is 100
		}

		const strength = getPasswordStrength(password)

		let indicatorColor: string
		let label: keyof typeof strengthLabels

		switch (true) {
			case strength < 50:
				indicatorColor = 'bg-red-500'
				label = 'weak'
				break
			case strength < 75:
				indicatorColor = 'bg-yellow-500'
				label = 'medium'
				break
			default:
				indicatorColor = 'bg-green-500'
				label = 'strong'
		}

		return {strength, indicatorColor, label}
	}, [password])

	return (
		<div className='space-y-2'>
			<Progress
				value={strength}
				className={cn('w-full')}
				indicatorColor={indicatorColor}
				aria-valuenow={strength}
				aria-valuetext={strengthLabels[label]}
			/>
			<p className='text-muted-foreground text-sm'>{strengthLabels[label]}</p>
		</div>
	)
}

export default PasswordStrengthMeter
