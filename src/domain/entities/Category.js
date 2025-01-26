class Category {
  constructor(name, description) {
    if (!name || !description) {
      throw new Error("Category name and description are required.");
    }
    this.name = name;
    this.description = description;
  }
}

module.exports = Category;
