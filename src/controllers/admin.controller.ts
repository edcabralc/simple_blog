import { RequestHandler } from "express";

const adminController: { [key: string]: RequestHandler } = {
  getAll: (req, res) => {},

  getById: (req, res) => {},

  create: (req, res) => {},

  update: (req, res) => {},

  delete: (req, res) => {},
};

export { adminController };
