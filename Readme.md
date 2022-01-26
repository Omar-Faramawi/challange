# Requirements

Install the latest version of typescipt 4.5

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

In order to test Job failuer case open the (Services\unsplash.service.ts) file and replace the access key with any random string

```js
const api = createApi({
  accessKey: "PLACE_ANY_RANDOM_STRING_FOR_FAILURE",
  fetch: nodeFetch,
});
```

# Solution

## Scenario

![alt text](https://raw.githubusercontent.com/Omar-Faramawi/challange/master/flowcharts.png)

## Timereport

![alt text](https://raw.githubusercontent.com/Omar-Faramawi/challange/master/report.png)
