function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var OrbitalPeriod = [];
  var time = function(elements){var radius=earthRadius+elements;
                                   return  (Math.round(2*(Math.PI)*Math.sqrt(Math.pow(radius,3)/GM)));};
  for(var i in arr)
    {
      arr[i]={
        name: arr[i].name,
        orbitalPeriod: time(arr[i].avgAlt)
      }; 
    }
  return arr;
}

orbitalPeriod([{name : "sputkin", avgAlt : 35873.5553}]);
