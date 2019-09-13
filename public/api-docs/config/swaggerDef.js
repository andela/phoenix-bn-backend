import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.2',
  info: {
    title: 'REST API Documentation for WeTravel', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: "### WeTravel API is an application that will enable its Company to book travels for it's Employees. \n\n"
                + 'Prefix all enpoints with ```/api/v1/```',
  },
  servers: [
    {
      url: 'https://localhost:3000/api/v1',
      description: 'Development server'
    }
  ],
  basePath: '/api/v1',
};
const dir = path.join(__dirname, '..', '/');
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [`${dir}/docs/**/*.yaml`],
};
// initialize swagger-jsdoc
export default swaggerJSDoc(options);
