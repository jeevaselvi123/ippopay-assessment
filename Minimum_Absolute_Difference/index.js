const minimumDifference = (nums) => {
  const n = nums.length >> 1;
  const first = {};
  const last = {};

  //finding the subsets

  for (let i = 0; i < 1 << n; i++) {
    let sum = 0;
    let count = 0;
    let sum1 = 0;
    let count1 = 0;

    for (let j = 0; j < n; j++) {
      if ((i & (1 << j)) !== 0) {
        sum += nums[j];
        count += 1;
        sum1 += nums[n + j];
        count1 += 1;
      } else {
        sum -= nums[j];
        sum1 -= nums[n + j];
      }
    }

    if (!first[count]) {
      first[count] = new Set();
    }
    first[count].add(sum);

    if (!last[count1]) {
      last[count1] = new Set();
    }
    last[count1].add(sum1);
  }

  let ans = Infinity;

  // finding the minimum absolute difference
  for (let i = 0; i <= n; i++) {
    const subset = Array.from(first[i]).sort();
    const subset1 = Array.from(last[n - i]).sort();

    for (let a of subset) {
      let left = 0;
      let right = subset1.length - 1;
      let b = -a;

      while (left < right) {
        const mid = (left + right) >> 1;

        if (subset1[mid] >= b) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }

      ans = Math.min(ans, Math.abs(a + subset1[left]));

      if (left > 0) {
        ans = Math.min(ans, Math.abs(a + subset1[left - 1]));
      }
    }
  }

  return ans;
};
var minDiff = minimumDifference([191, -942, -867, 117, 787, -242, 131, 623]);
console.log(minDiff);
