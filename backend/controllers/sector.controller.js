const db = require('../models');
const Sector = db.sectors;
const Op = db.Sequelize.Op;

// Criar e salvar um novo setor
exports.create = (req, res) => {
  // Validar requisição
  if (!req.body.name) {
    res.status(400).send({
      message: "O nome do setor não pode estar vazio!"
    });
    return;
  }

  // Criar um setor
  const sector = {
    name: req.body.name,
    description: req.body.description
  };

  // Salvar setor no banco de dados
  Sector.create(sector)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao criar o setor."
      });
    });
};

// Recuperar todos os setores do banco de dados
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Sector.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao recuperar os setores."
      });
    });
};

// Encontrar um único setor pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sector.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar o setor com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar setor com id=" + id
      });
    });
};

// Atualizar um setor pelo id
exports.update = (req, res) => {
  const id = req.params.id;

  Sector.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Setor atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o setor com id=${id}. Talvez o setor não tenha sido encontrado ou o corpo da requisição está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar setor com id=" + id
      });
    });
};

// Excluir um setor pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Sector.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Setor excluído com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível excluir o setor com id=${id}. Talvez o setor não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir o setor com id=" + id
      });
    });
}; 