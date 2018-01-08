export default class Config {
  private methodNames: any = {
    getAll: "list",
    getOne: "find",
    post: "create",
    update: "update",
    delete: "delete"
  }
  constructor(config: any) {
    this.setMethods(config);
  }

  getMethod(key: string) {
    return this.methodNames[key];
  }

  private setMethods(config: any) {
    for (let key in this.methodNames) {
      if (config[key] != null) this.methodNames[key] = config[key];
    }
  }
}