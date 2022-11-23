export const ValidateEmail = input => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};
export const handleDate = name => {
  const date = new Date(name);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    months[date.getMonth()] +
    ' ' +
    handleSingleDate(date.getDate()) +
    ' ' +
    date.getFullYear()
  );
};
const handleSingleDate = j => {
  let s = '';
  if (j.toString().length == 1) {
    return (s = '0' + j);
  }
  return j;
};
export const regionFrom = (lat, lon, accuracy) => {
  const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
  const circumference = (40075 / 360) * 1000;

  const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
  const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: Math.max(0, latDelta),
    longitudeDelta: Math.max(0, lonDelta),
  };
};
