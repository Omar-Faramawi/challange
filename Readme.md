# Requirements

Install the latest version of Typescript 4.5

```
npm install -g typescript
```

# Installation

Open your prefered command line tool and run the following commands:

1- Clone this repository to your local machine:

```bash
$ git clone https://github.com/Omar-Faramawi/challange.git
$ cd challenge
```

2- Install dependencies:

```bash
$ npm install
```

3- Build and serve:

```bash
$ npm run build
$ npm run start
```

App will be running on http://localhost:3000

### NOTE:

Don't use any live watching and serving packages like (nodemon) because the application uses a Store directory as data storage inside the project root directory, so it will watch the change in the beginning of Job creation process as it adds new file to the store directory and automatically reload the app before compeleting the task.

# Usage

Use your prefered API testing application (Insomnia, Postman,..etc) to test the following endpoints:

### Create Job:

```
POST http://localhost:3000/jobs
```

### Fetch Job:

```
GET http://localhost:3000/jobs/{jobId}
```

### Failed Job:

In order to test Job failuer case open the (Services\unsplash.service.ts) file and replace the access key with any random string then build and serve the application again

```js
const api = createApi({
  accessKey: "PLACE_ANY_RANDOM_STRING_FOR_FAILURE",
  fetch: nodeFetch,
});
```

then locate the store folder in the root directory and copy the last file name created there and pass to the fetch endpoint jobId parameter

# Solution

## Scenario

![alt text](https://raw.githubusercontent.com/Omar-Faramawi/challange/master/flowcharts.png)

## Timereport

![alt text](https://raw.githubusercontent.com/Omar-Faramawi/challange/master/report.png)
