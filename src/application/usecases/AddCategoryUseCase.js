class AddCategoryUseCase {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  async execute(name, description) {
    return this.categoryService.addCategory(name, description);
  }
}

module.exports = AddCategoryUseCase;
