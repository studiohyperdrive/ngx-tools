import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import * as env from 'env-var';
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';

import { ExpressStatusResponse } from '../express-status.types';

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
	public get(req: Request, res: Response): Response {
		return res.status(OK).json({
			project: {
				name: env.get('NAME').required().asString(),
				version: env.get('VERSION').required().asString(),
				environment: env.get('NODE_ENV').required().asString(),
				context: env.get('CONTEXT').required().asString(),
			},
			node: {
				version: process.version,
				timezone: env.get('TZ').required().asString(),
				time: new Date().toString(),
			},
			success: true,
		} as ExpressStatusResponse);
	}
}
