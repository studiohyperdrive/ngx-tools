import Express from 'express';

import { ExpressStatusController } from '../controllers/express-status.controller';

export const ExpressStatusRouter = Express.Router();

ExpressStatusRouter
	.route('/status')
	.get(ExpressStatusController.get);
