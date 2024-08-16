export type Hazard = {
  id: number;
  title: string;
  images: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  hazardType: string;
};
