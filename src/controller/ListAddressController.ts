import axios from 'axios';
import { Request, Response } from 'express';

import calculateDistance from '../utils/calculateDistance';
import calculateDistanceAddress, {
  DistanceRequest,
} from '../utils/calculateDistanceMaxAndMin';

interface CoordinatesType {
  address: string;
  latitude: number;
  longitude: number;
}

export default class ListAddressService {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const {
        data: { results },
      } = await axios.get(
        `${process.env.GOOGLE_API_ADDRESS}${request.params.address}&key=${process.env.GOOGLE_KEY}`,
      );

      const coordinates: CoordinatesType[] = results.map(
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

      const distances: DistanceRequest[] = [];
      for (let i = 0; i < count; i += 1) {
        for (let j = i; j < count; j += 1) {
          if (coordinates[i] !== coordinates[j]) {
            const { latitude: latitude1, longitude: longitude1 } = coordinates[
              i
            ];
            const { latitude: latitude2, longitude: longitude2 } = coordinates[
              j
            ];

            const destinationAddress = coordinates[i].address;
            const originAddress = coordinates[j].address;

            const {
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            } = coordinates[i];
            const {
              latitude: originLatitude,
              longitude: originLongitude,
            } = coordinates[j];

            const currentDistance = calculateDistance(
              latitude1,
              latitude2,
              longitude1,
              longitude2,
            );

            distances.push({
              destination: {
                destinationAddress,
                destinationLatitude,
                destinationLongitude,
              },
              origin: {
                originAddress,
                originLatitude,
                originLongitude,
              },

              currentDistance,
            });
          }
        }
      }

      const {
        maxDistanceAddress,
        minDistanceAddress,
      } = calculateDistanceAddress(distances);

      return response.send({
        distances,
        maxDistanceAddress,
        minDistanceAddress,
      });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
