import {MAX_PERCENT, months, STARS_COUNT} from '../const/const';
import {OfferInfo} from '../types/offer';
import {SortingName} from '../types/sort';

export const formatDate = (date: string) => {
  const dateParsed = new Date(date);

  return `${months[dateParsed.getMonth()]} ${dateParsed.getFullYear()}`;
};

export const getRatingStarsWidth = (rating: number): object => ({
  width: `${(MAX_PERCENT * Math.round(rating)) / STARS_COUNT}%`
});

export const getRatingStarsWidthForTest = (rating: number): string => (
  `width: ${(MAX_PERCENT * Math.round(rating)) / STARS_COUNT}%`
);

export const getRandomElement = <T>(array: readonly T[]): T => array[Math.floor(Math.random() * array.length)];

export const SortingList: {
  [key in SortingName]: (a: OfferInfo, b: OfferInfo) => number
} = {
  Popular: () => 0,
  PriceToHigh: (a, b) => a.price - b.price,
  PriceToLow: (a, b) => b.price - a.price,
  TopRated: (a, b) => b.rating - a.rating,
};

export const pluralizeTextValue = (str: string, count: number) => count === 1 ? str : `${str}s`;

export const capitalizeTextValue = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
