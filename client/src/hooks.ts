import { useCallback, useEffect, useRef, useState } from 'react'

export function useFetch<T = any>(
  url: string
): [T | null, () => Promise<void>] {
  const [data, setData] = useState(null)
  const ignore = useRef(false)

  const doFetch = useCallback(async () => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()

    if (!ignore.current) {
      setData(data)
    }
  }, [url])

  useEffect(() => {
    ignore.current = false

    doFetch()

    return () => {
      ignore.current = true
    }
  }, [doFetch])

  return [data, doFetch]
}
