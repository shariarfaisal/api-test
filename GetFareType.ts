export interface Segment {
    Departure: string
    DepartureTime: string
    Arrival: string
    ArrivalTime: string
    Distance: string
    Carrier: string
    Equipment: string
    FlightNumber: string
    FlightTime?: string
    BaggageAllowance?: string
    FreeSeats?: string
    ChangeOfPlane?: boolean
    CabinClass: string
}

export interface BookingInfo{
  FreeSeats: number
  CabinClass: string
}

export interface PriceInfo {
  BasePrice: Number
  Taxes: Number
  TotalPrice: Number
}

class GetFareType{
  TravelTime?: string
  Carrier: string
  PassengerType?: string
  Segments: Segment[]
  BookingInfo?: BookingInfo[]
  PriceInfo: PriceInfo
}

export default GetFareType
