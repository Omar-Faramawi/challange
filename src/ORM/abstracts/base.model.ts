import * as fs from "fs";
import { ModelException } from "../../Exceptions/ModelException";

export abstract class BaseModel {
  constructor(public id: string) {}

  static exists(id: string): boolean {
    try {
      if (fs.existsSync("store/" + id + ".json")) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new ModelException("Error in locating file");
    }
  }

  store(object: Object) {
    try {
      fs.writeFileSync(
        "store/" + this.id + ".json",
        JSON.stringify(object, null, 2)
      );
    } catch (error) {
      throw new ModelException("Error in creating file");
    }
  }

  static fetch(id: string) {
    try {
      return JSON.parse(fs.readFileSync("store/" + id + ".json", "utf8"));
    } catch (error) {
      throw new ModelException("Error in reading file");
    }
  }
}
