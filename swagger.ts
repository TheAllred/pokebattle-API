import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Pokemon Battle API",
    description: "API to simulate Pokemon battles.",
  },
  host: "pokebattleapi.onrender.com/",
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.ts"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.ts, app.ts, routes.ts, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
