class CategoryController {
  constructor(addCategoryUseCase, categoryService) {
    this.addCategoryUseCase = addCategoryUseCase;
    this.categoryService = categoryService;
  }

  async create(req, res) {
    try {
      const { name, description } = req.body;
      const category = await this.addCategoryUseCase.execute(name, description);
      res.status(201).json(category);
    } catch (err) {
      // console.log(err.message);
      // console.log(req.body);
      res.status(400).json({ message: err.message });
    }
  }

  async list(req, res) {
    try {
      const categories = await this.categoryService.getCategories();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { name } = req.params;
      const deletedCategory = await this.categoryService.deleteCategory(name);
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = CategoryController;
