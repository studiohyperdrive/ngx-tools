import { Router } from 'express';

import { ExpressStatusController } from '../controllers/express-status.controller';

const expressStatusController = new ExpressStatusController();

export const ExpressStatusRouter = Router();

ExpressStatusRouter.route('/status').get(expressStatusController.get);
