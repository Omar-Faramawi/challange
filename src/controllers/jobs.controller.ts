import { RequestHandler } from "express";
import { JobStatus } from "../enums/job-status.enum";
import { Job } from "../ORM/models/job.model";
import * as Utility from "../Utilities/utility";
import * as Unsplash from "../Servies/unsplash.service";
import { UnsplashException } from "../Exceptions/UnsplashException";
import { ModelException } from "../Exceptions/ModelException";

export const getJob: RequestHandler<{ id: string }> = (req, res, next) => {
  const paramId = req.params.id;

  try {
    // File Exists
    if (Job.exists(paramId)) {
      // Load the Job
      try {
        const job = Job.find(paramId);

        if (job.status === JobStatus.PROCESSED) {
          // Status is Processed
          // Return Response with Job data
          res.status(200).json({
            data: {
              jobId: job.id,
              status: job.status,
              created_at: job.created_at,
              result: job.result,
              processed_at: job.processed_at,
            },
          });
        } else {
          // Status is Pending
          // Return response with Job Status
          res.status(200).json({
            data: {
              status: job.status,
            },
          });
        }
      } catch (error) {
        if (error instanceof ModelException) {
          res.status(500).json({ message: error.getMessages() });
        } else {
          res.status(500).json({ message: "Service not available now" });
        }
      }
    } else {
      // File doesn't exist
      // Return 404 Response
      res.status(404).json({ message: "Job Not Found" });
    }
  } catch (error) {
    if (error instanceof ModelException) {
      res.status(500).json({ message: error.getMessages() });
    } else {
      res.status(500).json({ message: "Service not available now" });
    }
  }
};

export const createJob: RequestHandler = async (req, res, next) => {
  // Generate new JobId
  const newJobId = Utility.generateJobId();

  // Create New Job Object with status pending
  const newJob = new Job(newJobId, JobStatus.PENDING, new Date());

  // Create new storage file contains Job Objet
  try {
    newJob.save();

    // Delay excution
    await Utility.delayExecution();

    // Fetch random image from food Category
    try {
      const randomFoodImage = await Unsplash.getRandomFoodImage();

      // Update the Created New Job
      try {
        newJob.update({
          result: randomFoodImage,
          processed_at: new Date(),
          status: JobStatus.PROCESSED,
        });
        // Return response with Object ID (JobId)
        res.status(201).json({ jobId: newJob.id });
      } catch (error) {
        let errorMessage: string;
        if (error instanceof ModelException) {
          errorMessage = error.getMessages();
        } else {
          errorMessage = "Service not available now";
        }
        /*
         update job status to failed 
        */
        try {
          newJob.update({
            status: JobStatus.FAILED,
          });
        } catch (error) {
          if (error instanceof ModelException) {
            errorMessage = error.getMessages();
          } else {
            errorMessage = "Service not available now";
          }
        }
        /******* End of Status update */

        res.status(500).json({ message: errorMessage });
      }
    } catch (error) {
      let unsplashErrorMessage: string;

      if (error instanceof UnsplashException) {
        unsplashErrorMessage = error.getMessages();
      } else {
        unsplashErrorMessage = "Service not available now";
      }

      /*
        update job status to failed 
      */
      try {
        newJob.update({
          status: JobStatus.FAILED,
        });
      } catch (error) {
        if (error instanceof ModelException) {
          unsplashErrorMessage =
            unsplashErrorMessage + " & " + error.getMessages();
        } else {
          unsplashErrorMessage = "Service not available now";
        }
      }
      /******* End of Status update */

      //return response
      res.status(500).json({ message: unsplashErrorMessage });
    }
  } catch (error) {
    if (error instanceof ModelException) {
      res.status(500).json({ message: error.getMessages() });
    } else {
      res.status(500).json({ message: "Service not available now" });
    }
  }
};
