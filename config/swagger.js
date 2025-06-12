const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SplitSmart API',
      version: '1.0.0',
      description: 'API for managing groups and user expenses',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
          }
        },
        Group: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            members: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      }
    },
    security: [{
      BearerAuth: []
    }]
  },
  apis: ['./Routes/*.js'], // Path to your route files
};

export default options;