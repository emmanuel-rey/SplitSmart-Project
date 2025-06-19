// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'SplitSmart API',
        version: '1.0.0',
        description: 'API documentation for the SplitSmart app which allows users to create groups, manage expenses, and settle debts.',
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
        schemas: {
            Group: {
                type: 'object',
                required: ['name', 'members'],
                properties: {
                    id: {
                        type: 'string',
                        description: 'Group ID',
                        example: '64a1e31f885cd2b9f66c1234',
                        
                    },
                    name: {
                        type: 'string',
                        description: 'Name of the group',
                        example: 'Birthday Dinner Group',
                    },
                    members: {
                        type: 'array',
                        items: {
                            type: 'string',
                            description: 'User IDs of members',
                            example: '64a1e3f9885cd2b9f66c5678',
                        },
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the group',
                        example: 'A group for planning birthday dinners and events.',
                    },
                    createdBy: {
                        type: 'string',
                        description: 'User ID of the group creator',
                        example: '64a1e3f9885cd2b9f66c5678',
                    },
                },
            },
            User: {
                type: 'object',
                required: ['username', 'password', 'email'],
                properties: {
                    id: {
                        type: 'string',
                        description: 'User ID',
                        example: '64a1e3f9885cd2b9f66c5678',
                    },
                    username: {
                        type: 'string',
                        description: 'Username of the user',
                        example: 'John Doe',
                    },
                    email: {
                        type: 'string',
                        description: 'Email address of the user',
                        example: 'johndoe@example.com',
                    },
                    password: {
                        type: 'string',
                        description: 'Password of the user',
                        example: 'password123',
                    },
                },
            },
        },
    },
    security: [{ BearerAuth: [] }],
};

const options = {
    swaggerDefinition,
    apis: ['./Routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
