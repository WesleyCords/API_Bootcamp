import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "API de Gerenciamento de Usuários e Reservas",
      version: "1.0.0",
      description: "Documentação completa da API para registro, login de usuários e gerenciamento de suas reservas de salas.",
    },
    servers: [
      {
        url: "http://localhost:8081/api", 
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT para autenticação. Forneça o token no formato 'Bearer {token}'",
        }
      },
    },
    security: [
        {
          BearerAuth: []
        }
      ],
    },
  apis: ['./routers/*.js'], 
}

const specs = swaggerJSDoc(options);

export {
  swaggerUi,
  specs
}


