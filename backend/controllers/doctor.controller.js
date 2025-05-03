const db = require('../models');
const Doctor = db.doctors;
const Sector = db.sectors;
const Op = db.Sequelize.Op;

// Criar e salvar um novo médico
exports.create = (req, res) => {
  // Validar requisição
  if (!req.body.name || !req.body.crm) {
    res.status(400).send({
      message: "Nome e CRM são obrigatórios!"
    });
    return;
  }

  // Criar um médico
  const doctor = {
    name: req.body.name,
    crm: req.body.crm,
    specialty: req.body.specialty,
    phone: req.body.phone,
    email: req.body.email,
    sectorId: req.body.sectorId
  };

  // Salvar médico no banco de dados
  Doctor.create(doctor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao criar o médico."
      });
    });
};

// Recuperar todos os médicos do banco de dados
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Doctor.findAll({ 
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
        message: err.message || "Ocorreu um erro ao recuperar os médicos."
      });
    });
};

// Encontrar um único médico pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Doctor.findByPk(id, {
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
          message: `Não foi possível encontrar o médico com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar médico com id=" + id
      });
    });
};

// Atualizar um médico pelo id
exports.update = (req, res) => {
  const id = req.params.id;

  Doctor.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Médico atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o médico com id=${id}. Talvez o médico não tenha sido encontrado ou o corpo da requisição está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar médico com id=" + id
      });
    });
};

// Excluir um médico pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Doctor.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Médico excluído com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível excluir o médico com id=${id}. Talvez o médico não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir o médico com id=" + id
      });
    });
}; 