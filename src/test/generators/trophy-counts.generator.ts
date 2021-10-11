import * as faker from "faker";

import type { TrophyCounts } from "@/models";

export const generateTrophyCounts = (
  trophyCountsProps?: Partial<TrophyCounts>
): TrophyCounts => {
  return {
    bronze: faker.datatype.number({ min: 0, max: 1000 }),
    silver: faker.datatype.number({ min: 0, max: 1000 }),
    gold: faker.datatype.number({ min: 0, max: 1000 }),
    platinum: faker.datatype.number({ min: 0, max: 100 }),
    ...trophyCountsProps
  };
};
