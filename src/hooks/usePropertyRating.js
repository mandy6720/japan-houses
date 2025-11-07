import { useState, useEffect } from 'react'

const STORAGE_KEY = 'property-ratings'

export function usePropertyRating(propertyId) {
  const [rating, setRating] = useState(0)

  // Load rating from localStorage on mount
  useEffect(() => {
    const storedRatings = localStorage.getItem(STORAGE_KEY)
    if (storedRatings) {
      const ratings = JSON.parse(storedRatings)
      setRating(ratings[propertyId] || 0)
    }
  }, [propertyId])

  // Update rating and save to localStorage
  const updateRating = (newRating) => {
    setRating(newRating)

    const storedRatings = localStorage.getItem(STORAGE_KEY)
    const ratings = storedRatings ? JSON.parse(storedRatings) : {}

    if (newRating === 0) {
      delete ratings[propertyId]
    } else {
      ratings[propertyId] = newRating
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
  }

  return [rating, updateRating]
}

// Helper function to get all ratings
export function getAllRatings() {
  const storedRatings = localStorage.getItem(STORAGE_KEY)
  return storedRatings ? JSON.parse(storedRatings) : {}
}
