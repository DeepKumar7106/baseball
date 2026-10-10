// aaa1a11a 
/**
 * Processes a tag and returns its Validity
 * 
 * @param String the unique player tag
 * @returns {@code true} if successful, {@code false} otherwise 
 */


/**
 * SYNTAX : aaa1a11x
 * a : alphabets in the list [a, b, c, d, ...., y, z]
 * 1 : digits in the list [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * x : unique check bit which brings the total upto or down to 75
 * 
 * example : aaa9a998 
 *   a * 4 = 40
 * + 9 * 3 = 27
 *         = 67
 *         +  8 (8) check bit
 *         = 75
 * returns True  
 */

// const characterList = '0123456789qwertyuiopasdfghjklzxcvbnm'.split('')
// const characterList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']

// characterList.forEach((character, index) => {
//     characterMap[character.toString()] = index
// })

const testPlayerTag = 'qqq9q91u'

const characterMap = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'q': 10,
  'w': 11,
  'e': 12,
  'r': 13,
  't': 14,
  'y': 15,
  'u': 16,
  'i': 17,
  'o': 18,
  'p': 19,
  'a': 20,
  's': 21,
  'd': 22,
  'f': 23,
  'g': 24,
  'h': 25,
  'j': 26,
  'k': 27,
  'l': 28,
  'z': 29,
  'x': 30,
  'c': 31,
  'v': 32,
  'b': 33,
  'n': 34,
  'm': 35
}

// function to validate a player tag using checksum
const validatePlayerTag = (playerTag) => {
    const playerTagList = String(playerTag).split('')
    const lastIndex = playerTagList.length - 1
    const checkBit = playerTagList[lastIndex]
    const checkSum = 75

    let sumOfCharaters = 0
    for (let i = 0; i < 7; i++) {
        const character = playerTagList[i]
        sumOfCharaters += characterMap[character]
    }

    return (sumOfCharaters + characterMap[checkBit]) === checkSum || (sumOfCharaters - characterMap[checkBit]) === checkSum
}



const generateAlphabets = (digitSum) => {
    let selectedChars = []
    let attempts = 0

    const chars = Object.keys(characterMap)
    const charsLength = chars.length - 10
    const MAX_ATTEMPS = 100
    let totalSum = 0

    while (attempts < MAX_ATTEMPS) {
        attempts++
        selectedChars = [] // new empty list
        let testSum = digitSum

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.round(Math.random() * charsLength) + 9
            const randomChar = chars[randomIndex]
            selectedChars.push(randomChar)
            testSum += characterMap[randomChar]
        }

        if (40 <= testSum && 110 >= testSum) {
            totalSum = testSum
            break;
        }
    }

    return {
        selectedChars : selectedChars,
        totalSum : totalSum
    }
}


/**
 * Genetates unique player tag
 * 
 * @returns a 8 bit alpha numeric player tag
 */
const generatePlayerTag = () => {
    // generate 3 digit and sum them 
    const randomThreeDigit = Math.round(Math.random() * 999)
    let num = randomThreeDigit
    let sumOfDigits = 0
    while (num > 0) {
        sumOfDigits += num % 10
        num = Math.floor(num/10)
    }

    // pad with zeroes if digit < 100 and made it to list
    const strThreeDigits = randomThreeDigit.toString().padStart(3, '0').split('')
    
    // generate a subset whose sum is within the required range
    const {selectedChars, totalSum} = generateAlphabets(sumOfDigits)

    const indexForAlphabets = [0,1,2,4]

    let playerTag = ""
    let charIndex = 0
    let numIndex = 0

    for (let i = 0; i < 7; i++) {
        if (indexForAlphabets.includes(i)) {
            playerTag += selectedChars[charIndex++]
        } else {
            playerTag += strThreeDigits[numIndex++]
        }
    }
    
    
    // add check bit
    const requiredCheckBitValue = Math.abs(75 - totalSum)
    const checkBit = Object.keys(characterMap).find(key => characterMap[key] === requiredCheckBitValue)
    playerTag += checkBit
    
    return playerTag
}

export {validatePlayerTag, generatePlayerTag}

// function to generate a tag 
// const generatePlayerTag = () => {
//     // generate 7 bit tag
//     const indexForAlphabets = [0,1,2,4]
//     let tag = ""

    
//     const generateCharacter = (index) => {
//         const characterList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
//         if (index in indexForAlphabets) {
//             const characterIndex =  Math.round(Math.random() * 26) + 9
//             return characterList[characterIndex]
//         } else {
//             const characterIndex =  Math.round(Math.random() * 9)
//             return characterList[characterIndex]
//         }
//     }
   
//     for (let i = 0; i < 7; i++) {
//         const character = generateCharacter(i)
//         tag += character
//     }

//     // check for possible tag
//     let tagSum = 0
//     for (const character of tag) {
//         tagSum += characterMap[character]
//     }

//     if (!35 <= Math.abs(tagSum - 75)) { //} && (tagSum >= 40 || tagSum <= 110))) {
//         generatePlayerTag()
//     }

//     // add the checkbit
//     const checkBitValue = Math.abs(tagSum - 75)
//     const checkBit = Object.keys(characterMap).find(key => characterMap[key] === checkBitValue)
//     console.log(checkBit, checkBitValue)
//     tag += checkBit
//     // check existence in the table
//     console.log(tag)
//     // return tag if new tag else generate new
//     return tag
// }