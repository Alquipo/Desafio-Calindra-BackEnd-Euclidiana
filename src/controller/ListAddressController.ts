import axios from 'axios';
import { Request, Response } from 'express';

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default class ListAddressService {
  // eslint-disable-next-line class-methods-use-this
  public async address(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      data: { results },
    } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${request.params.address}&key=AIzaSyD8iN3UZvmdFCzCleO7WuZiCk0dYe2nWjQ`,
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

    // const distances = coordinates.map((value, index) => {
    //   const { latitude, longitude } = value;

    //   return { latitude, longitude };
    // });

    // console.log(coordinates);

    const radius = 6371;

    const { latitude: latitude1, longitude: longitude1 } = coordinates[0];
    const { latitude: latitude2, longitude: longitude2 } = coordinates[1];
    const { latitude: latitude3, longitude: longitude3 } = coordinates[2];

    const dLatitudeAB = deg2rad(latitude2 - latitude1);
    const dLongitudeAB = deg2rad(longitude2 - longitude1);

    const dLatitudeAC = deg2rad(latitude3 - latitude1);
    const dLongitudeAC = deg2rad(longitude3 - longitude1);

    const dLatitudeBC = deg2rad(latitude3 - latitude2);
    const dLongitudeBC = deg2rad(longitude3 - longitude2);

    const a =
      Math.sin(dLatitudeAB / 2) * Math.sin(dLatitudeAB / 2) +
      Math.cos(deg2rad(latitude1)) *
        Math.cos(deg2rad(latitude2)) *
        Math.sin(dLongitudeAB / 2) *
        Math.sin(dLongitudeAB / 2);
    const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = Math.round(radius * center * 100) / 100;

    const b =
      Math.sin(dLatitudeAC / 2) * Math.sin(dLatitudeAC / 2) +
      Math.cos(deg2rad(latitude1)) *
        Math.cos(deg2rad(latitude3)) *
        Math.sin(dLongitudeAC / 2) *
        Math.sin(dLongitudeAC / 2);
    const center1 = 2 * Math.atan2(Math.sqrt(b), Math.sqrt(1 - b));
    const distance1 = Math.round(radius * center1 * 100) / 100;

    const c =
      Math.sin(dLatitudeBC / 2) * Math.sin(dLatitudeBC / 2) +
      Math.cos(deg2rad(latitude2)) *
        Math.cos(deg2rad(latitude3)) *
        Math.sin(dLongitudeBC / 2) *
        Math.sin(dLongitudeBC / 2);
    const center2 = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
    const distance2 = Math.round(radius * center2 * 100) / 100;

    return response.send({
      coordinates,
      'Distancia do ponto A ao ponto B em KM é': distance,
      'Distancia do ponto A ao ponto C em KM é': distance1,
      'Distancia do ponto B ao ponto C em KM é': distance2,
    });
  }
}
