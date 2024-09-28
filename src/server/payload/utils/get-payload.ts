'use server'

import confirmPromise from '@payload-config'
import {getPayloadHMR as getPayloadInstance} from '@payloadcms/next/utilities'

let payloadInstance: ReturnType<typeof getPayloadInstance> | null = null

export async function getPayload(): Promise<
	ReturnType<typeof getPayloadInstance>
> {
	if (!payloadInstance) {
		payloadInstance = getPayloadInstance({config: await confirmPromise})
	}
	return payloadInstance
}
