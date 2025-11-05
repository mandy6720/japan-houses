import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Car, Store, Utensils, Train } from "lucide-react"
import { useState } from "react"

export function PropertyCard({ property }) {
  const [isFavorited, setIsFavorited] = useState(true)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {/* Property image */}
        <img
          src={property.image}
          alt={`Property at ${property.location}`}
          className="w-full aspect-[16/9] object-cover"
        />

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart
            className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-neutral-600'}`}
          />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl font-bold text-primary">
            {property.price}
          </CardTitle>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin className="h-4 w-4" />
          {property.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-start gap-2">
            <Train className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-xs">{property.stationDistance}</span>
          </div>

          <div className="flex items-start gap-2">
            <Store className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-xs">{property.groceryDistance}</span>
          </div>

          <div className="flex items-start gap-2">
            <Utensils className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-xs">{property.restaurantCount}</span>
          </div>

          <div className="flex items-start gap-2">
            <Car className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-xs">{property.parking}</span>
          </div>
        </div>

        {property.comments && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground italic">
              {property.comments}
            </p>
          </div>
        )}

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Utilities:</span> {property.utilities}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(property.url, '_blank')}
        >
          View Listing
        </Button>
      </CardFooter>
    </Card>
  )
}
