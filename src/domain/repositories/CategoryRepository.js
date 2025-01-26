const fs = require("fs").promises;
const path = require("path");
class CategoryRepository {
  constructor() {
    this.filePath = path.join(
      __dirname,
      "../../infrastructure/database/categories.json"
    );
  }

  async _readFile() {
    const data = await fs.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  async _writeFile(categories) {
    await fs.writeFile(
      this.filePath,
      JSON.stringify(categories, null, 2),
      "utf-8"
    );
  }

  async add(category) {
    console.log(category);
    const categories = await this._readFile();
    categories.push(category);
    await this._writeFile(categories);
    return category;
  }

  async getAll() {
    return this._readFile();
  }

  async findByName(name) {
    console.log("searching for category: ", name);
    const categories = await this._readFile();
    console.log("categories: ", categories);
    return categories.find((category) => category.name === name);
  }

  async delete(name) {
    let categories = await this._readFile();
    const index = categories.findIndex((category) => category.name === name);
    if (index !== -1) {
      const deletedCategory = categories.splice(index, 1);
      await this._writeFile(categories);
      return deletedCategory;
    }
    return null;
  }
}

module.exports = CategoryRepository;
