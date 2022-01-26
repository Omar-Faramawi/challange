import { JobStatus } from "../../enums/job-status.enum";
import { ModelException } from "../../Exceptions/ModelException";
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
    try {
      super.store({ ...this });
    } catch (error) {
      if (error instanceof ModelException) {
        throw new ModelException(error.getMessages());
      } else {
        throw new ModelException("Storing Failed");
      }
    }
  }

  static find(jobId: string): Job {
    try {
      const { id, status, created_at, result, processed_at } = Job.fetch(jobId);

      return new Job(id, status, created_at, result, processed_at);
    } catch (error) {
      if (error instanceof ModelException) {
        throw new ModelException(error.getMessages());
      } else {
        throw new ModelException("Couldn't find requested job");
      }
    }
  }

  update(props: { status: JobStatus; result?: object; processed_at?: Date }) {
    this.status = props.status;
    this.result = props?.result;
    this.processed_at = props?.processed_at;

    try {
      this.save();
    } catch (error) {
      if (error instanceof ModelException) {
        throw new ModelException(error.getMessages());
      } else {
        throw new ModelException("Updating Job Failed");
      }
    }
  }
}
