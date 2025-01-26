const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const AddCategoryUseCase = require("../../application/usecases/AddCategoryUseCase");
const CategoryService = require("../../application/services/CategoryService");
const CategoryRepository = require("../../domain/repositories/CategoryRepository");

const router = express.Router();

// Configuração do DI para as rotas
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const addCategoryUseCase = new AddCategoryUseCase(categoryService);
const categoryController = new CategoryController(
  addCategoryUseCase,
  categoryService
);

// Rota de criação de categoria
router.post("/categories", (req, res) => categoryController.create(req, res));

// Rota para listar todas as categorias
router.get("/categories", (req, res) => categoryController.list(req, res));

// Rota para deletar categoria
router.delete("/categories/:name", (req, res) =>
  categoryController.delete(req, res)
);

module.exports = router;
