const Place = require('../models/Place')

exports.getAllPlaces = async (req, res) => {
    try {
        let query = req.query;
        for (p in query) {
            console.log(p + ":" + query[p])
        }
        let places;

        let criteria = {}
        if (query.name)
            criteria.name = /query.name/
        if (query.city)
            criteria.city = query.city
        
        console.log(criteria)

        places = await Place.find(criteria)

        /*places = await Place.find()

        if (query.name)
            places = places.filter(
                place => place.name.includes(query.name)
            )
        
        if (query.city)
            places = places.filter(
                place => place.city == query.city
            )
        */
        
        res.json(places)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getPlaceDetailsById = async (req, res) => {
    res.json(req.body.place)
}

exports.getPlaceByID = async (req, res, next) => {
    let place;
    try {
        place = await Place.findById(req.params.id);
        if (place == null) {
            return res.status(404).json({ 
                message: "Place not found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    req.body.place = place;
    next();
}

exports.createPlace = async (req, res) => {
    const newPlace = new Place({
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        street: req.body.street,
        lat: req.body.lat,
        lon: req.body.lon,
        costToVisit: req.body.costToVisit,
        timeToVisit: req.body.timeToVisit
    })

    try {
        const addedPlace = await newPlace.save()
        res.status(201).json(addedPlace)
    } catch (err) {
        res.status(400).json({message:err.message})
    }

}

exports.updatePlace= async (req, res) => {
    let place = req.body.place

    if (req.body.name)
        place.name = req.body.name
    if (req.body.description)
        place.description = req.body.description
    if (req.body.city)
        place.city = req.body.city
    if (req.body.street)
        place.street = req.body.street
    if (req.body.lat)
        place.lat = req.body.lat
    if (req.body.lon)
        place.lon = req.body.lon
    if (req.body.costToVisit)
        place.costToVisit = req.body.costToVisit
    if (req.body.timeToVisit)
        place.timeToVisit = req.body.timeToVisit
    
    try {
        const updatedPlace = await place.save()
        res.json(updatedPlace)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}
