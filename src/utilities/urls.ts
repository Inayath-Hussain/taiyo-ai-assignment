export const dataForAllCountriesURL = 'https://disease.sh/v3/covid-19/countries'

export const historicalDataURL = (country: string) => `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`