// ==========================
// 1. getUserInitials
// ==========================
function getUserInitials(user) {
  if (!user || !user.firstName || !user.lastName) return "";
  return (user.firstName[0] + user.lastName[0]).toUpperCase();
}

// ==========================
// 2. countProperties
// ==========================
function countProperties(obj) {
  return Object.keys(obj).length;
}

// ==========================
// 3. invertObject
// ==========================
function invertObject(obj) {
  const result = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[obj[key]] = key;
    }
  }
  return result;
}

// ==========================
// 4. removeFalsyValues
// ==========================
function removeFalsyValues(arr) {
  return arr.filter(Boolean);
}

// ==========================
// 5. groupByAge
// ==========================
function groupByAge(people) {
  return people.reduce((acc, person) => {
    const age = person.age;
    if (!acc[age]) acc[age] = [];
    acc[age].push(person);
    return acc;
  }, {});
}

// ==========================
// 6. findMostFrequentElement
// ==========================
function findMostFrequentElement(arr) {
  const freq = {};
  let maxCount = 0;
  let mostFrequent = null;

  for (let item of arr) {
    freq[item] = (freq[item] || 0) + 1;
    if (freq[item] > maxCount) {
      maxCount = freq[item];
      mostFrequent = item;
    }
  }

  return mostFrequent;
}

// ==========================
// 7. flatten (any depth)
// ==========================
function flatten(arr) {
  const result = [];

  function helper(subArr) {
    for (let item of subArr) {
      if (Array.isArray(item)) {
        helper(item);
      } else {
        result.push(item);
      }
    }
  }

  helper(arr);
  return result;
}

// ==========================
// 8. mergeObjects (deep merge)
// ==========================
function mergeObjects(...objects) {
  function isObject(obj) {
    return obj && typeof obj === "object" && !Array.isArray(obj);
  }

  const result = {};

  for (let obj of objects) {
    for (let key in obj) {
      if (isObject(obj[key])) {
        if (!result[key]) result[key] = {};
        result[key] = mergeObjects(result[key], obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result;
}

// ==========================
// 9. rotateArray
// ==========================
function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n;
  return [...arr.slice(-k), ...arr.slice(0, n - k)];
}

// ==========================
// 10. intersection (no duplicates)
// ==========================
function intersection(nums1, nums2) {
  const set2 = new Set(nums2);
  return [...new Set(nums1.filter(num => set2.has(num)))];
}

// ==========================
// 11. groupAnagrams
// ==========================
function groupAnagrams(words) {
  const map = {};

  for (let word of words) {
    const key = word.split("").sort().join("");
    if (!map[key]) map[key] = [];
    map[key].push(word);
  }

  return Object.values(map);
}

// ==========================
// 12. moveZerosToEnd (in-place)
// ==========================
function moveZerosToEnd(arr) {
  let insertPos = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[insertPos++] = arr[i];
    }
  }

  while (insertPos < arr.length) {
    arr[insertPos++] = 0;
  }

  return arr;
}

// ==========================
// 13. longestConsecutiveSequence
// ==========================
function longestConsecutiveSequence(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (let num of set) {
    if (!set.has(num - 1)) {
      let current = num;
      let count = 1;

      while (set.has(current + 1)) {
        current++;
        count++;
      }

      longest = Math.max(longest, count);
    }
  }

  return longest;
}

// ==========================
// 14. productExceptSelf
// ==========================
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let left = 1;
  for (let i = 0; i < n; i++) {
    result[i] *= left;
    left *= nums[i];
  }

  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }

  return result;
}

// ==========================
// 15. deepEqual
// ==========================
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" || obj1 === null ||
    typeof obj2 !== "object" || obj2 === null
  ) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// ==========================
// 16. serializeObject & deserializeObject
// ==========================
function serializeObject(obj) {
  return JSON.stringify(obj, function (key, value) {
    if (value === undefined) {
      return { __type: "undefined" };
    }
    if (value instanceof Date) {
      return { __type: "Date", value: value.toISOString() };
    }
    if (value instanceof Map) {
      return { __type: "Map", value: Array.from(value.entries()) };
    }
    if (value instanceof Set) {
      return { __type: "Set", value: Array.from(value.values()) };
    }
    return value;
  });
}

function deserializeObject(str) {
  return JSON.parse(str, function (key, value) {
    if (value && value.__type === "undefined") {
      return undefined;
    }
    if (value && value.__type === "Date") {
      return new Date(value.value);
    }
    if (value && value.__type === "Map") {
      return new Map(value.value);
    }
    if (value && value.__type === "Set") {
      return new Set(value.value);
    }
    return value;
  });
}
