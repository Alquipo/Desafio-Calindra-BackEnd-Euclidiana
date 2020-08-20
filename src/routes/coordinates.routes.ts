import { Router } from 'express';

import ListAddressService from '../controller/ListAddressController';

const listAddressService = new ListAddressService();

const routes = Router();

routes.get('/coordinates/:address', listAddressService.index);

export default routes;
