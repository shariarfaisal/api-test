
const hitchikerConverter = function(data){

  const {
    Flight:{
      AvailableFlight,
      Legs,
      Passengers, // FIXME: Passengers all details heree ....
    },
    ID,
    PriceDetails:{
      TotalPassengerPrice,
      TotalFlightPrice,
      TotalTax
    }
  } = data


  const {
    CarrierCode: Carrier, // Carrier
    Connections:{ FareResponseConnection },
    FareTypeCode: PassengerType, // Passenger type
    LegFareInfo:{
      LegCabinClass: CabinClass,
    },
    MajorCarrier,
    Passenger,
  } = Legs.FareResponseLeg[0]


  const {
    LegTravelTime: TravelTime, // TravelTime
    Segments:{ FareResponseSegment },

  } = FareResponseConnection[0]

  /* SEGMENTS */
  const segments = FareResponseSegment.map(function(item) {
    // Segment Distructure
    const {
      Arrival,
      ArrivalDateTime: ArrivalTime,
      BookingClass: BookingCode,
      CabinClassName: CabinClass,
      CarrierCode: Carrier,
      FlightNumber,
      Departure,
      DepartureDateTime: DepartureTime,
      EquipmentCode: Equipment,
      FreeBaggageAllowance: BaggageAllowance,
      FreeSeats,
      NumberOfStops: ChangeOfPlane,
      SegmentMileage: Distance,
    } = item // Segment

    return {
      Departure,
      DepartureTime,
      Arrival,
      ArrivalTime,
      Distance: Distance.toString(),
      Carrier,
      Equipment,
      FlightNumber,
      BaggageAllowance,
      FreeSeats: FreeSeats.toString(),
      ChangeOfPlane: ChangeOfPlane ? true : false,
      CabinClass,
      BookingCode
    }

  })

  const priceShorter = ({CurrencyCode, Value}) => {
    return `${CurrencyCode}${Value}`
  }

  return {
    ID,
    ApiType: 'Hitchiker',
    Segments: segments,
    TravelTime,
    Carrier,
    PassengerType,
    PriceDetails:{
      BasePrice: priceShorter(TotalPassengerPrice),
      TotalPrice: priceShorter(TotalFlightPrice),
      Taxes: priceShorter(TotalTax)
    },
    CabinClass
  }

}


module.exports = hitchikerConverter
