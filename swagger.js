import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
 
  openapi: "3.0.0",

  info: {
    title: "API Documentation",
    description: "CSE341 API Documentation",
  },

  servers: [
    {
      url: process.env.NODE_ENV === "development"
        ? process.env.SWAGGER_HOST_LOCAL
        : process.env.SWAGGER_HOST
    }
  ],

  components: {
    schemas: {
      ProductCreate: {
        type: "object",
        properties: {
          productName: { type: "string", example: "Laptop CF-34" },
          description: { type: "string", example: "A rugged System" },
          price: { type: "number", example: "4000.00" },
          category: { type: "string", example: "PC" },
          subCategory: { type: "string", example: "Laptop"  },
          ownerName: {type: "string", example: "John Doe" },
          ownerEmail: { type: "string", format: "email", example: "tom@gmail.com" },
          ownerPhone: {type: "string", format:"phone", example: "+45-080-93894"},
          isActive: { type: "boolean", example: "true" }
        },
        required: ["name", "price", "category"]
      },
      ProductUpdate: {
        type: "object",
        properties: {
           productName: { type: "string", example: "Laptop CF-34" },
          description: { type: "string", example: "A rugged System" },
          price: { type: "number", example: "4000.00" },
          category: { type: "string", example: "PC" },
          subCategory: { type: "string", example: "Laptop"  },
          ownerName: {type: "string", example: "John Doe" },
          ownerEmail: { type: "string", format: "email", example: "tom@gmail.com" },
          ownerPhone: {type: "string", format:"phone", example: "+45-080-93894"},
          isActive: { type: "boolean", example: "true" }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
