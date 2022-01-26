import { RequestHandler } from "express";
import { JobStatus } from "../enums/job-status.enum";
import { Job } from "../ORM/models/job.model";
import * as Utility from "../Utilities/utility";
import * as Unsplash from "../Servies/unsplash.service";

export const getJob: RequestHandler<{ id: string }> = (req, res, next) => {
  const paramId = req.params.id;
  // Locate Job File
  const exists = Job.locateFile(paramId);
  // File Exists
  if (exists) {
    // destruct the json object
    const { id, status, created_at, result, processed_at } = Job.fetch(paramId);

    if (status === JobStatus.PROCESSED) {
      // Status is Processed
      // Return Response with Job Object
      res.status(201).json({
        data: {
          jobId: id,
          status: status,
          created_at,
          result: result,
          processed_at: processed_at,
        },
      });
    } else if (status === JobStatus.PENDING) {
      // Status is Pending
      // Return response with Job Status
      res.status(201).json({
        data: {
          jobId: id,
          status: status,
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

  // Delay excution by generated random number from 5 sec to 5 mins with 5 sec step
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
