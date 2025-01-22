function threeSum(arr) {
    const n = arr.length;
    let count = 0;

    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {
                if (arr[i] + arr[j] + arr[k] === 0) {
                    count++;
                }
            }
        }
    }

    return count;
}


function measureTime(arr, count) {
    const start = performance.now();
    threeSum(arr);
    const end = performance.now();
    console.log(`Execution time for ${count}: ${end - start} ms`);
}


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const a_128 = Array.from({ length: 128 }, () => getRandomInt(-100, 100));
const a_256 = Array.from({ length: 256 }, () => getRandomInt(-100, 100));
const a_512 = Array.from({ length: 512 }, () => getRandomInt(-100, 100));
const a_1024 = Array.from({ length: 1024 }, () => getRandomInt(-100, 100));
const a_2048 = Array.from({ length: 2048 }, () => getRandomInt(-100, 100));
const a_4096 = Array.from({ length: 4096 }, () => getRandomInt(-100, 100));
const a_8192 = Array.from({ length: 8192 }, () => getRandomInt(-100, 100));
const a_16384 = Array.from({ length: 16384 }, () => getRandomInt(-100, 100));
const a_32768 = Array.from({ length: 32768 }, () => getRandomInt(-100, 100));

measureTime(a_128, 128);
measureTime(a_256, 256);
measureTime(a_512, 512);
measureTime(a_1024, 1024);
measureTime(a_2048, 2048);
measureTime(a_4096, 4096);

// measureTime(a_8192, 8192);
// measureTime(a_16384, 16384);
// measureTime(a_32768, 32768);
