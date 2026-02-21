const findPrefixSumArray = (input: number[]): number[] => {
  const preFixSum: number[] = [];
  for (let i = 0; i < input.length; i++) {
    if (i == 0) {
      preFixSum[i] = input[i];
    } else {
      preFixSum[i] = preFixSum[i - 1] + input[i];
    }
  }
  return preFixSum;
};

//1 Find the prefix sum of given index
const prefixSum = (input: number[], indexs: number[]): number => {
  const preFixSum: number[] = findPrefixSumArray(input);
  let sum = 0;
  sum = preFixSum[indexs[indexs.length - 1]] - (preFixSum[indexs[0] - 1] || 0);
  console.log(sum);
  return sum;
};
prefixSum([3, -1, -2, 5, 2, -5, 1], [1, 2]);

// 2 Find the number of subarrays with sum equal to k
const subArraySum = (input: number[], k: number) => {
  let count = 0;
  const preFixSum: number[] = findPrefixSumArray(input);
  for (let i = 0; i < preFixSum.length; i++) {
    for (let j = i + 1; j < preFixSum.length; j++) {
      if (preFixSum[j] - preFixSum[i] === k) {
        count++;
      }
    }
  }
  return count;
};

console.log(subArraySum([1, 1, 1], 2));
