/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getTallestDinosaur()
 * ---------------------
 * Returns an object with the tallest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getTallestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getTallestDinosaur(dinosaurs) {
  let tallestDinosaur = {};

  //if parameter dinosaurs is an empty array, return an empty object
  if (dinosaurs.length === 0) {
    return tallestDinosaur;
  } else {
    //if dinosaurs is not empty array, assume the first dinosaur in the array is the highest
    tallestDinosaur = dinosaurs[0];
  }

  //iterate through the dinosaurs array
  for (let dinosaur of dinosaurs) {
    //if find dinosaur with higher height, update the tallestDinosaur
    if (tallestDinosaur.lengthInMeters < dinosaur.lengthInMeters) {
      tallestDinosaur = dinosaur;
    }
  }

  let name = tallestDinosaur.name;
  let heightInFeet = tallestDinosaur.lengthInMeters * 3.281; //convert meter to feet
  let result = {};
  result[name] = heightInFeet;

  return result;
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  //looking for the dinosaur with the given id
  let selectedDinosaur = {};
  for (let dinosaur of dinosaurs) {
    if (dinosaur.dinosaurId === id) {
      selectedDinosaur = dinosaur;
    }
  }

  //if the given id can not be found inside the dinosaurs array, return an error message
  if (selectedDinosaur.dinosaurId !== id) {
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  }

  let mya;
  if (selectedDinosaur.mya.length > 1) {
    //pick the second mya element if there are two mya inside the mya array
    mya = selectedDinosaur.mya[1];
  } else {
    //pick the only mya element within the mya array
    mya = selectedDinosaur.mya[0];
  }

  //return the description
  return `${selectedDinosaur.name} (${selectedDinosaur.pronunciation})\n${selectedDinosaur.info} It lived in the ${selectedDinosaur.period} period, over ${mya} million years ago.`;
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let arr = [];

  //iterate through dinosaurs array
  for (let dinosaur of dinosaurs) {
    if (dinosaur.mya.length === 1) {
      //if found dinosaur live in the given mya push it into the array
      if (dinosaur.mya[0] === mya || dinosaur.mya[0] - 1 === mya) {
        arr.push(dinosaur);
      }
    } else if (dinosaur.mya.length === 2) {
      //if found dinosaur live in the given mya push it into the array
      if (dinosaur.mya[0] >= mya && dinosaur.mya[1] <= mya) {
        arr.push(dinosaur);
      }
    }
  }

  let result = [];
  for (let element of arr) {
    //if the dinosaur object has the given key, push that property into the result array
    if (element.hasOwnProperty(key)) {
      result.push(element[key]);
    } else {
      //if the property of the dinosaur object not exist, just push the dinosaur id into the result array
      result.push(element.dinosaurId);
    }
  }

  return result;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
