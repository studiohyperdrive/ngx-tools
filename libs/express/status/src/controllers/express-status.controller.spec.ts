import Express from 'express';
import Supertest from 'supertest';
import { ExpressStatusController } from './express-status.controller';

describe('Express Status', () => {
	// Set the required process.env
	process.env.TZ = 'Europe/Brussels';
	process.env.VERSION = '1.0.0';
	process.env.NAME = 'express-status';
	process.env.NODE_ENV = 'test';
	process.env.CONTEXT = 'docker';

	const app = Express();
	const request = Supertest(app);
	const router = Express.Router();

	router.use('/status', ExpressStatusController.get);
	app.use(router);

	it('Should return a status page', async () => {
		const response = await request.get('/status');

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty('project');
		expect(response.body.project).toHaveProperty('name');
		expect(response.body.project).toHaveProperty('version');
		expect(response.body.project).toHaveProperty('environment');
		expect(response.body.project).toHaveProperty('context');

		expect(response.body).toHaveProperty('node');
		expect(response.body.node).toHaveProperty('version');
		expect(response.body.node).toHaveProperty('timezone');
		expect(response.body.node).toHaveProperty('time');

		expect(response.body).toHaveProperty('success');
		expect(response.body.success).toBeBoolean();
	});
});
