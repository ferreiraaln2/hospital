const db = require('../models');
const Patient = db.patients;
const Sector = db.sectors;
const Op = db.Sequelize.Op;

// Criar e salvar um novo paciente
exports.create = (req, res) => {
  // Validar requisição
  if (!req.body.name || !req.body.cpf) {
    res.status(400).send({
      message: "Nome e CPF são obrigatórios!"
    });
    return;
  }

  // Criar um paciente
  const patient = {
    name: req.body.name,
    cpf: req.body.cpf,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    medicalRecord: req.body.medicalRecord,
    sectorId: req.body.sectorId
  };

  // Salvar paciente no banco de dados
  Patient.create(patient)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao criar o paciente."
      });
    });
};

// Recuperar todos os pacientes do banco de dados
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Patient.findAll({ 
    where: condition,
    include: [{
      model: Sector,
      as: 'sector'
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao recuperar os pacientes."
      });
    });
};

// Encontrar um único paciente pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Patient.findByPk(id, {
    include: [{
      model: Sector,
      as: 'sector'
    }]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar o paciente com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar paciente com id=" + id
      });
    });
};

// Atualizar um paciente pelo id
exports.update = (req, res) => {
  const id = req.params.id;

  Patient.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Paciente atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o paciente com id=${id}. Talvez o paciente não tenha sido encontrado ou o corpo da requisição está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar paciente com id=" + id
      });
    });
};

// Excluir um paciente pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Patient.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Paciente excluído com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível excluir o paciente com id=${id}. Talvez o paciente não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir o paciente com id=" + id
      });
    });
}; 