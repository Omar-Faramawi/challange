import { createApi } from "unsplash-js";
import nodeFetch from "cross-fetch";

const api = createApi({
  accessKey: "qRaOOxNwNsHZLgiI9IAa5AwHb5Y3sLz8hJ6GQIRSR_4",
  fetch: nodeFetch,
});

const getFoodCollectionId = async () => {
  return await api.search
    .getCollections({ query: "food" })
    .then((result) => result.response?.results[0].id)
    .catch(() => {
      throw new Error("Can't fetch collection Id");
    });
};

export const getRandomFoodImage = async () => {
  let catId = await getFoodCollectionId();

  let foodImage: Object;

  if (typeof catId == "string") {
    foodImage = await api.photos
      .getRandom({
        collectionIds: [catId],
        count: 1,
      })
      .then((image) => image)
      .catch(() => {
        throw new Error("Can't fetch Image");
      });
  } else {
    throw new Error("Can't fetch Image");
  }

  return foodImage;
};
