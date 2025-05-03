module.exports = app => {
  const sectors = require("../controllers/sector.controller.js");
  var router = require("express").Router();

  // Criar um novo setor
  router.post("/", sectors.create);

  // Recuperar todos os setores
  router.get("/", sectors.findAll);

  // Recuperar um único setor pelo id
  router.get("/:id", sectors.findOne);

  // Atualizar um setor pelo id
  router.put("/:id", sectors.update);

  // Excluir um setor pelo id
  router.delete("/:id", sectors.delete);

  app.use('/api/sectors', router);
}; 