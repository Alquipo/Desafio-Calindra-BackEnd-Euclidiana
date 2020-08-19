import { Router } from 'express';

import ListAddressService from '../controller/ListAddressController';

const listAddressService = new ListAddressService();

const routes = Router();

// routes.get('/', (request, response) =>
//   response.json({ message: 'hello World' }),
// );

routes.get('/coordinates/:address', listAddressService.address);

export default routes;

// Av. Rio Branco, 1 Centro, Rio de Janeiro RJ,m20090003;
//  Praça Mal. Âncora, 122 Centro, Rio de Janeiro RJ, 20021200;
//   Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030
