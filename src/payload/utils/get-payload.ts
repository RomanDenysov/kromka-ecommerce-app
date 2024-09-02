'use server'

import {getPayloadHMR as getPayloadInstance} from '@payloadcms/next/utilities'
import confirmPromise from '@payload-config'

// export async function getPayload(): ReturnType<typeof getPayloadInstance> {
//   return getPayloadInstance({config: await confirmPromise})
// }


let payloadInstance: ReturnType<typeof getPayloadInstance> | null = null

export async function getPayload(): Promise<ReturnType<typeof getPayloadInstance>> {
  if (!payloadInstance) {
    payloadInstance =  getPayloadInstance({config: await confirmPromise})
  }
  return payloadInstance
}