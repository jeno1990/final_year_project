function findDistace(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956 for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

function findNearBy(clients, lat, lon) {
  //works fo traffics
  var nearTraffic = [];

  for (const [key, value] of clients.entries()) {

    let distance = findDistace(
      value.latitude,
      lat,
      value.longitude,
      lon
    );
    console.log(distance, "Km", " near_by");
    if (distance <= 3) {
      //socket id of users near to incident
      nearTraffic.push(value.socketId);
    }
    console.log("lat: "+value.latitude+" lon: "+value.longitude);
  }

  // for (i = 0; i < clients.length; i++) {
  //   //this function calculates relative distance between traffics array and
  //   //the device location(car location) and if less than 3km it adds to list
    
  // }
  return nearTraffic;
}

function num_of_NearByVehcles(vehcles, lat, lon) {
  var near_by_num=0;
  for (i = 0; i < vehcles.length; i++) {
    //this function calculates relative distance between the vecles position array and
    //the the relative point which are moving(not include static ones)
    if (vehcles[i].speed == 0) continue;
    let distance = findDistace(
      vehcles[i].latitude,
      lat,
      vehcles[i].longitude,
      lon
    );
    // console.log(distance, "km", "near_by");
    if (distance <= 0.03) {
      //30 meteres range
      //socket id of users near to incident
      near_by_num++;
    }
  }
  console.log(near_by_num)
  return near_by_num;
}

module.exports = {
  findNearBy,
  num_of_NearByVehcles,
};
