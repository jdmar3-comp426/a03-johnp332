import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
let avgMPGCity = 0;
let avgMPGHigh = 0;
let yearArr = [];
let numHybrids = 0;

for(let i = 0; i < mpg_data.length; i++) {
    avgMPGCity += mpg_data[i].city_mpg;
    avgMPGHigh += mpg_data[i].highway_mpg;
    yearArr.push(mpg_data[i].year);
    if (mpg_data[i].hybrid == true) {
        numHybrids += 1;
    }
}

avgMPGCity = avgMPGCity / mpg_data.length;
avgMPGHigh = avgMPGHigh / mpg_data.length;

let avgMpgObj = {
    city: avgMPGCity,
    highway: avgMPGHigh
}

let yearArrStats = getStatistics(yearArr);

numHybrids = numHybrids / mpg_data.length;

export const allCarStats = {
    avgMpg: avgMpgObj,
    allYearStats: yearArrStats,
    ratioHybrids: numHybrids,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

let hybridNumObj = {}

for(let i = 0; i < mpg_data.length; i++) {
    if (mpg_data[i].hybrid == true) {
        if (mpg_data[i].make in hybridNumObj) {
            hybridNumObj[mpg_data[i].make] += 1;
        } else {
            hybridNumObj[mpg_data[i].make] = 1;
        }
    }
}

let sorter = []

for (var items in hybridNumObj) {
    sorter.push(items);
}

sorter.sort((a, b) => (hybridNumObj[b] > hybridNumObj[a]) ? 1 : -1);

let makerHybridsArr = []

for (let j = 0; j < sorter.length; j++) {
    let makerHybridsObj = {
        make: sorter[j],
        hybrids: []
    }
    for (let i = 0; i < mpg_data.length; i++) {
        if (mpg_data[i].hybrid == true && mpg_data[i].make == makerHybridsObj.make) {
            makerHybridsObj.hybrids.push(mpg_data[i].id)
        }
    }
    makerHybridsArr.push(makerHybridsObj);
}

let yearObjList = [];
for (let i = 0; i < mpg_data; i++) {
    let yearChObj = {
        year: 0,
        hybridObj: {
            city: 0,
            highway: 0
        },
        notHybrid: {
            city: 0,
            highway: 0
        }
    }
    if (mpg_data[i].year in yearChObj && mpg_data[i].hybrid == true) {
        yearChObj[mpg_data[i].year].hybridObj.city += mpg_data[i].city_mpg;
        yearChObj[mpg_data[i].year].hybridObj.highway += mpg_data[i].highway_mpg;
    } else if (mpg_data[i].year in yearChObj) {
        yearChObj[mpg_data[i].year].notHybrid.city += mpg_data[i].city_mpg;
        yearChObj[mpg_data[i].year].notHybrid.highway += mpg_data[i].highway_mpg;
    } else {
        yearObjList.push(yearChObj);
    }

}

export const moreStats = {
    makerHybrids: makerHybridsArr,
    avgMpgByYearAndHybrid: yearObjList
};
