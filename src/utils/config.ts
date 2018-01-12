export default class Config {
  private methodNames: object = {
    getAll: "list",
    getOne: "find",
    post: "create",
    update: "update",
    delete: "delete"
  }
  constructor(config: object) {
    this.setMethods(config);
  }

  getMethod(key: string) {
    return this.methodNames[key];
  }

  private setMethods(config: object) {
    for (let key in this.methodNames) {
      if (config[key] != null) this.methodNames[key] = config[key];
    }
  }
}