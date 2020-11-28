
function travelPortConverter(data){
  const { pricing , airSegment, fareList } = data


  const {
    Key,
    FareBasis,
    PassengerTypeCode,
    Origin,
    Destination,
    EffectiveDate,
    DepartureDate,
    Amount,
    NegotiatedFare,
    NotValidBefore,
    NotValidAfter,
  } = fareList[0].$

  const { Unit, Value } = fareList[0]["air:BaggageAllowance"][0]["air:MaxWeight"][0].$
  // Unit = Kilograms
  // Value= 34
  // BaggageAllowance\


/* SEGMENTS DONE */
  const segments = airSegment.map(item => {
    // Segment
    const {
      Origin: Departure,
      DepartureTime,
      Destination: Arrival,
      ArrivalTime,
      Distance,
      Carrier,
      Equipment,
      FlightNumber,
      FlightTime,
      ChangeOfPlane
    } = item.$

    return {
      Departure,
      DepartureTime,
      Arrival,
      ArrivalTime,
      Distance,
      Carrier,
      Equipment,
      FlightNumber,
      FlightTime,
      ChangeOfPlane
    }
  })

  const bookingInfo = pricing['air:AirPricingInfo'][0]['air:BookingInfo'].map(item => {
    const { BookingCode, BookingCount: FreeSeats, CabinClass } = item['$']
    return { BookingCode, FreeSeats, CabinClass }
  })


  return {
    ID: Key,
    ApiType: 'TravelPort',
    Segments: segments,
    PriceDetails: pricing['$'],
    TravelTime: pricing['air:Journey'][0]['$']['TravelTime'],
    // Carrier:
    // PassengerType:
    BaggageAllowance: `${Value}${Unit}`,
    BookingInfo: bookingInfo
  }
}

module.exports = travelPortConverter
