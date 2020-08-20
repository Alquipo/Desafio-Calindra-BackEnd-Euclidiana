function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default function calculateDistance(
  latitude1: number,
  latitude2: number,
  longitude1: number,
  longitude2: number,
): number {
  const radius = 6371;

  const dLatitude = deg2rad(latitude2 - latitude1);
  const dLongitude = deg2rad(longitude2 - longitude1);

  const calcDistance =
    Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
    Math.cos(deg2rad(latitude1)) *
      Math.cos(deg2rad(latitude2)) *
      Math.sin(dLongitude / 2) *
      Math.sin(dLongitude / 2);
  const center =
    2 * Math.atan2(Math.sqrt(calcDistance), Math.sqrt(1 - calcDistance));
  const distance = Math.round(radius * center * 100) / 100;

  return distance;
}
