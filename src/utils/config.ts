export default class Config {
  private methodNames: object = {
    getAll: "list",
    getOne: "find",
    post: "create",
    update: "update",
    delete: "delete"
  }

  constructor(config: object = {}) {
    this.methodNames = this.setMethods(config);
  }

  getMethod = (key: string): string => this.methodNames[key];

  private setMethods = (config: object): object => Object
    .keys(this.methodNames)
    .reduce((obj, key) => config[key] != null ?
      { ...obj, [key]: config[key] } :
      { ...obj, [key]: this.methodNames[key] }, {});
}