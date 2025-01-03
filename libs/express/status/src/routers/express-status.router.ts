import * as Express from 'express';

import { ExpressStatusController } from '../controllers/express-status.controller';

const expressStatusController = new ExpressStatusController();

export const ExpressStatusRouter = Express.Router();

ExpressStatusRouter.route('/status').get(expressStatusController.get);
