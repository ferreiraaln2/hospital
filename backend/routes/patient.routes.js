module.exports = app => {
  const patients = require("../controllers/patient.controller.js");
  var router = require("express").Router();

  // Criar um novo paciente
  router.post("/", patients.create);

  // Recuperar todos os pacientes
  router.get("/", patients.findAll);

  // Recuperar um único paciente pelo id
  router.get("/:id", patients.findOne);

  // Atualizar um paciente pelo id
  router.put("/:id", patients.update);

  // Excluir um paciente pelo id
  router.delete("/:id", patients.delete);

  app.use('/api/patients', router);
}; 