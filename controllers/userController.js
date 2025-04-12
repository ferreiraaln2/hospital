const User = require('../models/userModel');

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-senha'); // Exclui a senha dos resultados
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
};

// Obter um usuário pelo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-senha');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
};

// Criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Verificar se o email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso' });
    }
    
    const newUser = new User({
      nome,
      email,
      senha // Em uma aplicação real, você deve criptografar a senha
    });
    
    const savedUser = await newUser.save();
    
    // Não retornar a senha na resposta
    const userResponse = {
      _id: savedUser._id,
      nome: savedUser.nome,
      email: savedUser.email,
      dataCriacao: savedUser.dataCriacao
    };
    
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

// Atualizar um usuário
exports.updateUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const userId = req.params.id;
    
    // Verificar se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Verificar se o novo email já está em uso por outro usuário
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Este email já está em uso' });
      }
    }
    
    // Atualizar os campos
    if (nome) user.nome = nome;
    if (email) user.email = email;
    if (senha) user.senha = senha; // Em uma aplicação real, você deve criptografar a senha
    
    const updatedUser = await user.save();
    
    // Não retornar a senha na resposta
    const userResponse = {
      _id: updatedUser._id,
      nome: updatedUser.nome,
      email: updatedUser.email,
      dataCriacao: updatedUser.dataCriacao
    };
    
    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
};

// Excluir um usuário
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Verificar se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    await User.findByIdAndDelete(userId);
    
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
  }
}; 