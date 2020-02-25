import { Response, Request } from 'express';
import HttpCodes from 'http-status-codes';

import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';
import Env from '@studiohyperdrive/env';

import { ExpressStatusResponse } from '../types/express-status.types';

@ApiPath({
	name: 'Status',
	path: '/status',
})
export class ExpressStatusController {
	@ApiOperationGet({
		description: 'Get status',
		summary: 'Get server status',
		responses: {
			200: {
				description: 'OK',
				type: SwaggerDefinitionConstant.Response.Type.OBJECT,
				model: 'Status',
			},
		},
	})
	public static get(req: Request, res: Response): Response {
		return res.status(HttpCodes.OK).json({
			project: {
				name: Env.get('NAME'),
				version: Env.get('VERSION'),
				environment: Env.get('NODE_ENV'),
				context: Env.get('CONTEXT'),
			},
			node: {
				version: process.version,
				timezone: Env.get('TZ'),
				time: new Date().toString(),
			},
			success: true,
		} as ExpressStatusResponse);
	}
}
