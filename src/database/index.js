import fs from "node:fs/promises";

const databasePath = new URL("../../database.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
    .then(data => {
      this.#database = JSON.parse(data);
    })
    .catch(() => {
      this.#persist();
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const dataIndex = this.#database.indexOf(data => data.id === id);

    this.#database[table][dataIndex] = data;

    return data;
  }

  delete(table, id) {
    const dataIndex = this.#database[table].indexOf(data => data.id === id);

    this.#database[table].splice(dataIndex, 1);
  }
}