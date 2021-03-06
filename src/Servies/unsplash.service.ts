import { createApi } from "unsplash-js";
import nodeFetch from "cross-fetch";
import { UnsplashException } from "../Exceptions/UnsplashException";

// key written explicitly in this file for the sake of the challenge only so you don't need to create a new one
// in real case, keys should be added in .env file and by using dotenv npm package we can load it for development purposes
// and preload it for production
const api = createApi({
  accessKey: "qRaOOxNwNsHZLgiI9IAa5AwHb5Y3sLz8hJ6GQIRSR_4",
  fetch: nodeFetch,
});

const getFoodCollectionId = async () => {
  return await api.search
    .getCollections({ query: "food" })
    .then((result) => result.response?.results[0].id)
    .catch(() => {
      throw new UnsplashException();
    });
};

export const getRandomFoodImage = async () => {
  const catId = await getFoodCollectionId();
  let foodImage: Object;
  if (typeof catId == "string") {
    foodImage = await api.photos
      .getRandom({
        collectionIds: [catId],
        count: 1,
      })
      .then((image) => image)
      .catch(() => {
        throw new UnsplashException();
      });
  } else {
    throw new UnsplashException();
  }
  return foodImage;
};
