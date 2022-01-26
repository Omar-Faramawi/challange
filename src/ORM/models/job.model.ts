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

  static find(jobId: string): Job {
    const { id, status, created_at, result, processed_at } = Job.fetch(jobId);

    return new Job(id, status, created_at, result, processed_at);
  }
}
