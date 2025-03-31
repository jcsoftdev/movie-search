import { useEffect, useRef } from 'react'

interface UseInfiniteScrollProps {
  canLoadMore: boolean
  isLoading: boolean
  onLoadMore: () => void
}

export const useInfiniteScroll = ({
  canLoadMore,
  isLoading,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canLoadMore || isLoading) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore()
        }
      },
      { threshold: 1.0 }
    )

    const current = observerRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
      observer.disconnect()
    }
  }, [canLoadMore, isLoading, onLoadMore])

  return { observerRef }
}
