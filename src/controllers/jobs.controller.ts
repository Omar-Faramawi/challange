import { RequestHandler } from "express";
import { JobStatus } from "../enums/job-status.enum";
import { Job } from "../ORM/models/job.model";
import * as Utility from "../Utilities/utility";
import * as Unsplash from "../Servies/unsplash.service";

export const getJob: RequestHandler<{ id: string }> = (req, res, next) => {
  const paramId = req.params.id;
  // File Exists
  if (Job.exists(paramId)) {
    // Load the Job
    const job = Job.find(paramId);

    if (job.status === JobStatus.PROCESSED) {
      // Status is Processed
      // Return Response with Job data
      res.status(201).json({
        data: {
          jobId: job.id,
          status: job.status,
          created_at: job.created_at,
          result: job.result,
          processed_at: job.processed_at,
        },
      });
    } else if (job.status === JobStatus.PENDING) {
      // Status is Pending
      // Return response with Job Status
      res.status(201).json({
        data: {
          jobId: job.id,
          status: job.status,
        },
      });
    }
  } else {
    // File doesn't exist
    // Return 404 Response
    res.status(404).json({ message: "Job Not Found" });
  }
};

export const createJob: RequestHandler = async (req, res, next) => {
  // Generate new JobId
  const newJobId = Utility.generateJobId();

  // Create New Job Object with status pending
  const newJob = new Job(newJobId, JobStatus.PENDING, new Date());

  // Create new storage file contains Job Objet
  newJob.save();

  // Delay excution
  await Utility.delayExecution();

  // Fetch random image from food Category
  const randomFoodImage = await Unsplash.getRandomFoodImage();

  // Update the Created New Job
  newJob.result = randomFoodImage;
  newJob.processed_at = new Date();
  newJob.status = JobStatus.PROCESSED;

  // save the Updated job.
  newJob.save();

  // Return response with Object ID (JobId)
  res.status(201).json({ message: "Job Processed", createdJobId: newJob.id });
};
