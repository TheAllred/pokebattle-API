const express = require("express");
const router = express.Router();
router.use("/ducks", require("./ducks"));
router.use("/hunters", require("./hunters"));

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

const { requiresAuth } = require("express-openid-connect");

router.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
