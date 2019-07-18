const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/api", { target: "http://server:4000" }));
  app.use(proxy("/auth", { target: "http://server:4000" }));
};
