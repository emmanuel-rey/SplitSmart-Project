// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'SplitSmart API',
        version: '1.0.0',
        description: 'API documentation for the SplitSmart app 🧾',
    },
    servers: [
        {
        url: 'http://localhost:4000',
        description: 'Local development server',
        },
    ],
    components: {
        securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
        },
    },
    security: [{ bearerAuth: [] }],
    };

const options = {
    swaggerDefinition,
    apis: ['./Routes/*.js'], // Path to your route files
    };

const swaggerSpec = swaggerJSDoc(options);
    export default swaggerSpec;
