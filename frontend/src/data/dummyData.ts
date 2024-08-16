import { faker } from "@faker-js/faker";
import { Hazard } from "./hazard";

const generateDummyHazards = (count: number): Hazard[] => {
  const hazards: Hazard[] = [];

  for (let i = 0; i < count; i++) {
    const nearbyLocation = faker.location.nearbyGPSCoordinate({
      origin: [5.644519100222496, -0.15114114652601288],
    });
    hazards.push({
      id: i + 1,
      title: faker.lorem.sentence(),
      images: [faker.image.url()],
      location: {
        latitude: nearbyLocation[0],
        longitude: nearbyLocation[1],
      },
      hazardType: faker.helpers.arrayElement([
        "environmental",
        "noise",
        "accident",
        "flood",
      ]),
    });
  }

  return hazards;
};

export const dummyHazards = generateDummyHazards(20);
