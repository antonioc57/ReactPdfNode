import { Router } from 'express';

import MakePdfController from './app/controllers/MakePdfController';

const routes = new Router();

routes.get('/make-pdf', MakePdfController.send);

export default routes;
