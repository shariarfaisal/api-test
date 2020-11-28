const hitchikerData = require('../hitchikerResponse.json')
const travelPortData = require('../travelPortResponse.json')
const hitchikerConverter = require('../utils/hitchikerConverter')
const travelPortConverter = require('../utils/travelPortConverter')

const getFare = (req,res) => {
  const store = []
  hitchikerData.GetFaresResult.Fares.FareResponseFare.forEach(data => {
    store.push(hitchikerConverter(data))
  })

  travelPortData.data.flightsList.forEach(data => {
    store.push(travelPortConverter(data))
  })

  res.status(200).json(store)
}

module.exports = getFare
