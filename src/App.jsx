import { PropertyCard } from "@/components/PropertyCard"
import { properties } from "@/data/properties"
import { Heart } from "lucide-react"
import { useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function App() {
  const [sortBy, setSortBy] = useState("price")

  // Group properties by location and sort by selected criteria
  const groupedProperties = useMemo(() => {
    // Parse price string to number for sorting
    const parsePrice = (priceStr) => {
      return parseInt(priceStr.replace(/[$,]/g, ''))
    }

    // Parse distance/time strings to numbers for comparison
    const parseDistance = (distStr) => {
      // Extract the first number from strings like "11 min to supermarket"
      const match = distStr.match(/(\d+)/)
      return match ? parseInt(match[1]) : Infinity
    }

    const parseRestaurantCount = (countStr) => {
      // Extract number from strings like "~10 within 10-15 min"
      const match = countStr.match(/~?(\d+)/)
      return match ? parseInt(match[1]) : 0
    }

    const parseStationDistance = (stationStr) => {
      // Extract minutes from strings like "840 ft to Kitayoshida Station (4min)" or "0.2 mi to Kamo Station (7min)"
      const match = stationStr.match(/\((\d+)min\)/)
      return match ? parseInt(match[1]) : Infinity
    }

    // Group by location
    const grouped = properties.reduce((acc, property) => {
      const location = property.location
      if (!acc[location]) {
        acc[location] = []
      }
      acc[location].push(property)
      return acc
    }, {})

    // Sort each location group by selected criteria
    Object.keys(grouped).forEach(location => {
      grouped[location].sort((a, b) => {
        switch (sortBy) {
          case "price":
            return parsePrice(a.price) - parsePrice(b.price)
          case "groceryDistance":
            return parseDistance(a.groceryDistance) - parseDistance(b.groceryDistance)
          case "restaurantCount":
            return parseRestaurantCount(b.restaurantCount) - parseRestaurantCount(a.restaurantCount) // Higher is better
          case "stationDistance":
            return parseStationDistance(a.stationDistance) - parseStationDistance(b.stationDistance)
          default:
            return 0
        }
      })
    })

    // Convert to array and sort locations alphabetically
    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]))
  }, [sortBy])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              <h1 className="text-2xl font-bold">Niigata Favorites</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {properties.length} properties
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <label htmlFor="sort-by" className="text-sm font-medium">
              Sort by:
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]" id="sort-by">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price (Low to High)</SelectItem>
                <SelectItem value="groceryDistance">Grocery Distance</SelectItem>
                <SelectItem value="restaurantCount">Restaurant Count</SelectItem>
                <SelectItem value="stationDistance">Station Distance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Properties by Location */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {groupedProperties.map(([location, locationProperties]) => (
          <section key={location}>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
              {location}
              <span className="text-sm font-normal text-muted-foreground ml-3">
                {locationProperties.length} {locationProperties.length === 1 ? 'property' : 'properties'}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

export default App
