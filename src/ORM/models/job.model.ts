import { JobStatus } from "../../enums/job-status.enum";
import { BaseModel } from "../abstracts/base.model";

export class Job extends BaseModel {
  constructor(
    id: string,
    public status: JobStatus,
    public created_at: Date,
    public result?: any,
    public processed_at?: Date
  ) {
    super(id);
  }

  save() {
    super.store({ ...this });
  }
}
