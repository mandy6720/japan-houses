import { PropertyCard } from "@/components/PropertyCard"
import { properties } from "@/data/properties"
import { Heart } from "lucide-react"

function App() {
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

      {/* Properties Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
