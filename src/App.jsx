import { PropertyCard } from "@/components/PropertyCard"
import { properties } from "@/data/properties"
import { Heart } from "lucide-react"
import { useMemo } from "react"

function App() {
  // Group properties by location and sort by price
  const groupedProperties = useMemo(() => {
    // Parse price string to number for sorting
    const parsePrice = (priceStr) => {
      return parseInt(priceStr.replace(/[$,]/g, ''))
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

    // Sort each location group by price (lowest first)
    Object.keys(grouped).forEach(location => {
      grouped[location].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    })

    // Convert to array and sort locations alphabetically
    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]))
  }, [])

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
