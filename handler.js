import handler from 'serverless-express/handler'
import express from 'serverless-express/express'

import MakePdfController from './src/app/controllers/MakePdfController'

const app = express();

app.get('/api/make-pdf', MakePdfController.send);

exports.handler = handler(app)
