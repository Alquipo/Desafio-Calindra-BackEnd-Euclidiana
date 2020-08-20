import axios from 'axios';
import { Request, Response } from 'express';

import calculateDistance from '../utils/calculateDistance';

export default class ListAddressService {
  // eslint-disable-next-line class-methods-use-this
  public async address(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      data: { results },
    } = await axios.get(
      `${process.env.GOOGLE_API_ADDRESS}${request.params.address}&key=${process.env.GOOGLE_KEY}`,
    );

    const coordinates = results.map(
      (value: {
        formatted_address: string;
        geometry: { location: { lat: number; lng: number } };
      }) => {
        const data = {
          address: value.formatted_address,
          latitude: value.geometry.location.lat,
          longitude: value.geometry.location.lng,
        };

        return data;
      },
    );

    const count = coordinates.length;

    const distances = [];
    for (let i = 0; i < count; i += 1) {
      for (let j = i; j < count; j += 1) {
        if (coordinates[i] !== coordinates[j]) {
          const { latitude: latitude1, longitude: longitude1 } = coordinates[i];
          const { latitude: latitude2, longitude: longitude2 } = coordinates[j];

          const destinyAddress: string = coordinates[i].address;
          const originAddress: string = coordinates[j].address;

          const currentDistance: number = calculateDistance(
            latitude1,
            latitude2,
            longitude1,
            longitude2,
          );

          distances.push({ destinyAddress, originAddress, currentDistance });
        }
      }
    }

    const maxDistance = distances
      .map(distance => distance.currentDistance)
      .reduce((total, distance) => Math.max(total, distance));

    const minDistance = distances
      .map(distance => distance.currentDistance)
      .reduce((total, distance) => Math.min(total, distance));

    const maxDistanceAddress = distances.filter(
      distance => distance.currentDistance === maxDistance,
    );

    const minDistanceAddress = distances.filter(
      distance => distance.currentDistance === minDistance,
    );

    return response.send({
      distances,
      maxDistanceAddress,
      minDistanceAddress,
    });
  }
}
