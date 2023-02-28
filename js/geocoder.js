// read the csv file
d3.csv('routes_address.csv')
.then(data => {
    console.log(data);
    
    // let coordsData = geocodeData(data);
    // console.log(coordsData);


    // data = data.map((entry, i) => {
    //     entry.coords = coords[i];
    //     return entry;
    // });

    // console.log(data);

    // download link
})
.catch(console.error)


// geocode data
async function geocodeData(data, num=0) {
    // console.log(data);
    let i = num; let coords = [];

    if(i == data.length) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "dataString.json");
            dlAnchorElem.click();

        return;
    } else {
        let response = await getCoordinates(data[i]).then(data => data);
        let center = (response.features && response.features[0]) ? response.features[0].center : [];
        // console.log(response);
        data[i].Lat = center[1] || 0;
        data[i].Lng = center[0] || 0; 
        

        setTimeout((e) => {
            
            i++;
            return geocodeData(data, i);
        }, 200);
    }
}

function getCoordinates(entry) {
    console.log(entry);

    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${entry.Address}.json?country=US&access_token=${mapboxgl.accessToken}`;

    return fetch(url)
        .then(res => res.json())
        .then(data => data)
        .catch(err => {
            console.log("Error");

            return {"type":"FeatureCollection", "features":[] }; 
        });

}