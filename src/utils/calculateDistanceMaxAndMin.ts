interface DestinationTypes {
  destinationAddress: string;
  destinationLatitude: number;
  destinationLongitude: number;
}

interface OriginTypes {
  originAddress: string;
  originLatitude: number;
  originLongitude: number;
}

export interface DistanceRequest {
  destination: DestinationTypes;
  origin: OriginTypes;
  currentDistance: number;
}

interface DistanceResponse {
  maxDistanceAddress: Array<{
    destination: DestinationTypes;
    origin: OriginTypes;
    distance: number;
  }>;
  minDistanceAddress: Array<{
    destination: DestinationTypes;
    origin: OriginTypes;
    distance: number;
  }>;
}

function calculateDistanceMaxMin(distances: DistanceRequest[]) {
  const maxDistance = distances
    .map(distance => distance.currentDistance)
    .reduce((total, distance) => Math.max(total, distance));

  const minDistance = distances
    .map(distance => distance.currentDistance)
    .reduce((total, distance) => Math.min(total, distance));

  return { maxDistance, minDistance };
}

export default function calculateDistanceAddress(
  distances: DistanceRequest[],
): DistanceResponse {
  const { maxDistance, minDistance } = calculateDistanceMaxMin(distances);

  const maxDistanceAddress = distances
    .filter(distance => distance.currentDistance === maxDistance)
    .map(({ currentDistance, ...rest }) => ({
      ...rest,
      distance: currentDistance,
    }));

  const minDistanceAddress = distances
    .filter(distance => distance.currentDistance === minDistance)
    .map(({ currentDistance, ...rest }) => ({
      ...rest,
      distance: currentDistance,
    }));

  return { maxDistanceAddress, minDistanceAddress };
}
