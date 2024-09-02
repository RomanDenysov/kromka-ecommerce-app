'use client'

import { useQuery } from "@tanstack/react-query"
import { getUser } from "../actions"

export const useUserQuery = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const user = await getUser()
      return user
    },
  })

  return query
}