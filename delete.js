
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        // Found the target
        if (arr[mid] === target) {
            return mid;
        // Mid is still below the target, so continue the search to the right
        } else if (arr[mid] < target) {
            left = mid + 1;
        // Mid is above the target, so continue the search to the left
        } else {
            right = mid - 1;
        }
    }
    
    // If we get here, the target was not found
    return -1;
}
