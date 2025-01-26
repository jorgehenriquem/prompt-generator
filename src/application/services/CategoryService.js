class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository; // Agora temos acesso ao repository
  }

  async addCategory(name, description) {
    console.log("Adding category: ", name);
    const existingCategory = await this.categoryRepository.findByName(name);
    console.log("Existing category: ", existingCategory);
    if (existingCategory) {
      throw new Error("Category with this name already exists.");
    }
    const category = { name, description };
    await this.categoryRepository.add(category);
    return "Category added successfully.";
  }

  async getCategories() {
    return this.categoryRepository.getAll();
  }

  async deleteCategory(name) {
    return this.categoryRepository.delete(name);
  }
}

module.exports = CategoryService;
