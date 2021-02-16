var tableData = require("../data/tableData");

module.exports = function(app) {

  app.get("/api/tables", function(req, res) {
    res.json(tableData);
  });

  app.post("/api/tables", function(req, res) {
    tableData.push(req.body);
    res.json(true);
  });

  app.post("/api/clear", function(req, res) {
    tableData.length = 0;
    res.json({ ok: true });
  });
};