# Jump Game - Hints

## Hint 1: Think Greedy 🎯
Instead of trying all possible paths, think about tracking the farthest position you can reach at any point.

## Hint 2: One Pass Solution 🏃‍♂️
You only need to traverse the array once. At each position, update the maximum distance you can reach.

## Hint 3: Early Termination ✋
If at any point your current position exceeds the maximum reachable position, you know it's impossible.

## Hint 4: Mathematical Insight 📊
At position `i` with value `nums[i]`, you can reach any position from `i+1` to `i+nums[i]`.

## Hint 5: Key Variables 🔑
You only need one variable: `maxReach` to track the farthest index you can reach.

## Algorithm Steps:
1. Initialize `maxReach = 0`
2. For each position `i`:
   - If `i > maxReach`, return false (stuck!)
   - Update `maxReach = max(maxReach, i + nums[i])`
   - If `maxReach >= length-1`, return true (can reach end!)
3. Return `maxReach >= length-1`

## Common Mistakes to Avoid ⚠️
- Don't use recursion or try all paths (leads to exponential time)
- Don't use extra space for DP unless required
- Remember to handle edge case of single element array
- Check if you're stuck before trying to make a jump

## Time Complexity: O(n) - Single pass
## Space Complexity: O(1) - Only using constant extra space