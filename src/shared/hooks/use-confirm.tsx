'use client'
import type React from 'react'
import {useState} from 'react'
import {Button} from '~/shared/ui/components/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '~/shared/ui/components/dialog'

export const useConfirm = (
	title: string,
	message: string,
): [() => React.JSX.Element, () => Promise<unknown>] => {
	const [promise, setPromise] = useState<{
		resolve: (value: boolean) => void
	} | null>(null)

	const confirm = () =>
		new Promise((resolve, reject) => {
			setPromise({resolve})
		})

	const handleClose = () => {
		setPromise(null)
	}

	const handleConfirm = () => {
		promise?.resolve(true)
		handleClose()
	}

	const handleCancel = () => {
		promise?.resolve(false)
		handleClose()
	}

	const ConfirmationDialog = () => (
		<Dialog open={promise !== null} onOpenChange={handleClose}>
			<DialogContent className='px-6'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{message}</DialogDescription>
				</DialogHeader>
				<DialogFooter className='gap-y-2 pt-2'>
					<Button onClick={handleCancel} variant={'outline'} className='w-full'>
						Cancel
					</Button>
					<Button onClick={handleConfirm} className='w-full'>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return [ConfirmationDialog, confirm]
}
