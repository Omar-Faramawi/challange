import * as fs from "fs";
import { JobStatus } from "../../enums/job-status.enum";

export abstract class BaseModel {
  constructor(public id: string) {}

  static locateFile(id: string): boolean {
    try {
      if (fs.existsSync("store/" + id + ".json")) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error in locating file");
    }
  }

  store(object: Object): void {
    try {
      fs.writeFileSync(
        "store/" + this.id + ".json",
        JSON.stringify(object, null, 2)
      );
    } catch (error) {
      throw new Error("Error in creating file");
    }
    return;
  }

  static fetch(id: string): {
    id: string;
    status: JobStatus;
    created_at: Date;
    result: object;
    processed_at: Date;
  } {
    try {
      return JSON.parse(fs.readFileSync("store/" + id + ".json", "utf8"));
    } catch (error) {
      throw new Error("Error in reading file");
    }
  }
}
