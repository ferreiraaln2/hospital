module.exports = app => {
  const doctors = require("../controllers/doctor.controller.js");
  var router = require("express").Router();

  // Criar um novo médico
  router.post("/", doctors.create);

  // Recuperar todos os médicos
  router.get("/", doctors.findAll);

  // Recuperar um único médico pelo id
  router.get("/:id", doctors.findOne);

  // Atualizar um médico pelo id
  router.put("/:id", doctors.update);

  // Excluir um médico pelo id
  router.delete("/:id", doctors.delete);

  app.use('/api/doctors', router);
}; 