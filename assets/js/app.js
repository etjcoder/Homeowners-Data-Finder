$(document).ready(function () {
    console.log("Document loaded")

    var APIKEY = ""
    var QueryURL = ""


    $("#address-lookup-btn").on("click", function (event) {
        event.preventDefault()

        console.log("look up this property!")
        console.log($("#property-street").val())
        console.log($("#property-city").val())
        console.log($("#property-state").val())
        console.log($("#property-zip").val())

        var street = $("#property-street").val().trim()
        var city = $("#property-city").val().trim()
        var state = $("#property-state").val().trim()
        var zip = $("#property-zip").val().trim()

        searchAPI(street, city, state, zip)

    })


    var searchAPI = function (street, city, state, zip) {

        console.log("Searching for:" + street.split(" "))
        var noPeriodStreet = street.replace(".", "")
        // console.log(noPeriodStreet)
        var splitStreet = noPeriodStreet.replace(/ /g, "+")
        var splitCity = city.replace(/ /g, "+")

        console.log(splitStreet)
        console.log(splitCity)

        var queryURL = `https://api.estated.com/property/v3?token=${APIKEY}&address=${splitStreet}&city=${splitCity}&state=${state}&zip=${zip}`
        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            var data = response.properties[0]


            // Show verified Address
            var address = data.addresses[0]
            //
            var displayAddress = `Official Address: ${address.street_number} ${address.street_name} ${address.street_suffix} ${address.city} ${address.state} ${address.zip_code}`
            console.log("Display Address:" + displayAddress)

            // Show Land Use
            var landUse = data.land_use
            //
            var displaylandUse = `This property is used for ${landUse.category} purposes and is a ${landUse.subcategory} building`

            // Show Property Information 
            var structure = data.structures[0]
            // 
            var yearBuilt = structure.year_built
            var baths = structure.baths_count
            var stories = structure.stories_count
            var sqFootage = structure.finished_size
            var buildingType = structure.architecture_type
            var extWalls = structure.exterior_wall_type
            var garageType = structure.garage_type
            var fuelType = structure.fuel_type

            // Show Owner Information
            var ownerName = data.owners[0].name


            // Unoccupied
            var vacancyCheck = data.status.absentee_owner

            // Flood Data
            var flood = data.geographies.flood
            //
            if (flood.fima_flood_zone) {
                var floodZone = flood.fima_flood_zone
            } else {
                var floodZone = "Not a flood Zone!"
            }

            //Create HTML with jQuery
            // setTimeout(function () {
                var cardText = $("<div>")
                
                var addressDiv = $("<p>")
                    $(addressDiv).text(displayAddress);
                
                var landUseDiv = $("<p>")
                    $(landUseDiv).text(displaylandUse)
                
                var homeDetailsDiv = $("<ul>")
                    var yearBuiltDiv = $("<li>")
                        $(yearBuiltDiv).text("Year Built: " + yearBuilt)
                    var bathsDiv = $("<li>")
                        $(bathsDiv).text("Num Baths: " + baths)
                    var storiesDiv = $("<li>")
                        $(storiesDiv).text("Num Stories: " + stories)
                    var sqFootageDiv = $("<li>")
                        $(sqFootageDiv).text("Sq. Footage: " + sqFootage)
                    var buildingTypeDiv = $("<li>")
                        $(buildingTypeDiv).text("Building Type: " + buildingType)
                    var extWallsDiv = $("<li>")
                        $(extWallsDiv).text("Outside Walls: " + extWalls)
                    var garageTypeDiv = $("<li>")
                        $(garageTypeDiv).text("Garage Type: " + garageType)
                    var fuelTypeDiv = $("<li>")
                        $(fuelTypeDiv).text("Fuel Type: " + fuelType)
                        $(homeDetailsDiv).append(yearBuiltDiv)
                        $(homeDetailsDiv).append(bathsDiv)
                        $(homeDetailsDiv).append(storiesDiv)
                        $(homeDetailsDiv).append(sqFootageDiv)
                        $(homeDetailsDiv).append(buildingTypeDiv)
                        $(homeDetailsDiv).append(extWallsDiv)
                        $(homeDetailsDiv).append(garageTypeDiv)
                        $(homeDetailsDiv).append(fuelTypeDiv)
                var ownerNameDiv = $("<p>")
                    $(ownerNameDiv).text("Title Owner: " + ownerName)
                var floodZoneDiv = $("<p>")
                    $(floodZoneDiv).text("Flood Zone Type: " + floodZone)
                var occupiedDiv = $("<p>")
                    $(occupiedDiv).text("Is property vacant? :" + vacancyCheck)


                //Append all divs
                $(cardText).append(addressDiv)
                $(cardText).append(landUseDiv)
                $(cardText).append(homeDetailsDiv)
                $(cardText).append(ownerNameDiv)
                $(cardText).append(floodZoneDiv)


                $("#property-info-data").append(cardText)

            // }, 2000)




        })
    }



})

