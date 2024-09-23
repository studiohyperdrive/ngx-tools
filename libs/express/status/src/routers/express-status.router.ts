import Express from 'express';

import { ExpressStatusController } from '../controllers/express-status.controller.ts';

const expressStatusController = new ExpressStatusController();

export const ExpressStatusRouter = Express.Router();

ExpressStatusRouter.route('/status').get(expressStatusController.get);
