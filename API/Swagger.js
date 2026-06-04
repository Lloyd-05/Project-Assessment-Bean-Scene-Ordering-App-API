const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const Category = require("./models/Category");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Restaurant Menu API",
            version: "1.0.0",
            description: "API documentation for the restaurant menu system",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}/api`,
                description: "Local development server (API base path)",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Menu: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        name: { type: "string" },
                        description: { type: "string" },
                        category: { type: "string" },
                        price: { type: "number" },
                        photo: { type: "string" },
                        dietaryFlags: {
                            type: "array",
                            items: { type: "string" },
                        },
                        Availability: { type: "boolean" },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        username: { type: "string" },
                        password: { type: "string" },
                        role: { type: "string" },
                    },
                },

                Order: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        items: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    menuItem: { type: "string" },
                                    quantity: { type: "number" },
                                },
                            },
                        },
                        totalPrice: { type: "number" },
                        status: { type: "string" },
                        table: { type: "string" },
                        user: { type: "string" },
                    },
                },
                Table: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        number: { type: "number" },
                        capacity: { type: "number" },
                        status: { type: "string" },
                    },
                },
                Category: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        name: { type: "string" },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    // Scan all route files for Swagger JSDoc comments
    apis: ["./api/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

// function swaggerDocs(app) {
//     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//     const port = process.env.PORT || 5000;
//     console.log(`📘 Swagger Docs available at: http://localhost:${port}/api-docs`);
// }

module.exports = swaggerSpec;