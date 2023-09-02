# Contact Management with Charts and Maps

## Deployed link
https://taiyo-ai--assignment.vercel.app/

## Steps to run locally
1. Clone repo and run <code> npm install </code> or <code> yarn install </code> in your project terminal
2. And then run <code> npm run dev </code> or <code> yarn run dev </code> to start react app

### APIs used
1. I have used covid countries api(https://disease.sh/v3/covid-19/countries) which provides data on total cases and cases within the last two days, it also provided country details like latitude and longitude which I have used to place markers on leaflet map.

2. I used historical data api(https://disease.sh/v3/covid-19/historical/all?lastdays=all) which provided total number of cases registered from 22 Jan 2020, I have changed the data format from days to months. Added year and country as filter.
