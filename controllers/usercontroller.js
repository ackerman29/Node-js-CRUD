// const express = require('express');
const User = require('../model/usermodel.js');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const createUser = async (req, res) => {
  try {
    const createuser = new User(req.body);
    const saveuser = await createuser.save();
    res.status(201).json(saveuser); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const updateuser = req.body;
    const updateduser = await User.findByIdAndUpdate(id, updateuser, { new: true });
    if (!updateduser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updateduser); 
  } catch (err) {
    res.status(400).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
