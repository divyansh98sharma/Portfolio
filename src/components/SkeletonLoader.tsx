import { useEffect, useState } from 'react'

export function SkeletonLoader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="animate-pulse space-y-6 p-4">
      {/* Title placeholder */}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>

      {/* Content lines */}
      <div className="space-y-3 mt-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/5"></div>
      </div>

      {/* Action button placeholder */}
      <div className="mt-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  )
}