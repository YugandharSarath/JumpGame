import React, { useState, useEffect } from 'react';

function canJump(nums) {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {

        if (i > maxReach) {
            return false;
        }

        maxReach = Math.max(maxReach, i + nums[i]);

        if (maxReach >= nums.length - 1) {
            return true;
        }
    }

    return maxReach >= nums.length - 1;
}

function canJumpWithSteps(nums) {
    let maxReach = 0;
    const steps = [];

    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            steps.push({ index: i, maxReach: maxReach, canReach: false });
            return { result: false, steps };
        }

        maxReach = Math.max(maxReach, i + nums[i]);
        steps.push({ index: i, maxReach: maxReach, canReach: true });

        if (maxReach >= nums.length - 1) {
            return { result: true, steps };
        }
    }

    return { result: maxReach >= nums.length - 1, steps };
}

function canJumpDP(nums) {
    const n = nums.length;
    const dp = new Array(n).fill(false);
    dp[0] = true;

    for (let i = 0; i < n; i++) {
        if (!dp[i]) continue;

        for (let j = 1; j <= nums[i] && i + j < n; j++) {
            dp[i + j] = true;
        }
    }

    return dp[n - 1];
}

function canJumpBacktrack(nums) {
    function backtrack(position) {

        if (position >= nums.length - 1) {
            return true;
        }

        for (let jump = 1; jump <= nums[position]; jump++) {
            if (backtrack(position + jump)) {
                return true;
            }
        }

        return false;
    }

    return backtrack(0);
}

function canJumpMemo(nums) {
    const memo = new Map();

    function backtrack(position) {
        if (memo.has(position)) {
            return memo.get(position);
        }

        if (position >= nums.length - 1) {
            return true;
        }

        for (let jump = 1; jump <= nums[position]; jump++) {
            if (backtrack(position + jump)) {
                memo.set(position, true);
                return true;
            }
        }

        memo.set(position, false);
        return false;
    }

    return backtrack(0);
}

const JumpGameApp = () => {
    const [inputValue, setInputValue] = useState('2,3,1,1,4');
    const [result, setResult] = useState(null);
    const [visualization, setVisualization] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const parseInput = (input) => {
        return input.split(',')
                   .map(num => parseInt(num.trim()))
                   .filter(num => !isNaN(num));
    };

    const solveJumpGame = () => {
        const nums = parseInput(inputValue);

        if (nums.length === 0) {
            setResult({ success: false, message: 'Please enter valid numbers' });
            setVisualization(null);
            setIsVisible(false);
            return;
        }

        const solution = canJumpWithSteps(nums);

        setResult({
            success: solution.result,
            message: solution.result 
                ? '✅ TRUE - Can reach the last index!' 
                : '❌ FALSE - Cannot reach the last index!'
        });

        setVisualization({
            nums,
            solution,
            steps: generateSteps(nums, solution)
        });

        setIsVisible(true);
    };

    const generateSteps = (nums, solution) => {
        const steps = [];
        solution.steps.forEach((step, i) => {
            if (i < solution.steps.length - 1 || !solution.result) {
                steps.push(
                    `At index ${step.index} (value: ${nums[step.index]}), max reach becomes ${step.maxReach}`
                );
            }
        });

        if (solution.result) {
            steps.push(`Success! We can reach index ${nums.length - 1}`);
        } else {
            steps.push('Failed! Got stuck and cannot reach the last index');
        }

        return steps;
    };

    const loadExample = (example) => {
        setInputValue(example.join(','));
    };

    const getCellClass = (index, nums, solution) => {
        const step = solution.steps.find(s => s.index === index);
        let baseClasses = 'w-16 h-16 flex items-center justify-center border-2 border-gray-800 rounded-lg font-bold text-lg relative transition-all duration-300 hover:scale-110 cursor-pointer';

        if (index === 0) {
            return `${baseClasses} bg-green-500 text-white`;
        } else if (index === nums.length - 1) {
            const bgColor = (step && step.canReach) ? 'bg-green-500' : 'bg-yellow-400';
            return `${baseClasses} ${bgColor} text-gray-900`;
        } else if (step && step.canReach) {
            return `${baseClasses} bg-blue-500 text-white`;
        } else {
            return `${baseClasses} bg-red-500 text-white`;
        }
    };

    useEffect(() => {
        solveJumpGame();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen font-sans">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    🦘 Jump Game Visualizer
                </h1>

                <div className="mb-8">
                    <label className="block mb-3 font-semibold text-gray-700" htmlFor="arrayInput">
                        Enter array (comma-separated numbers):
                    </label>
                    <input
                        type="text"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500 transition-colors duration-300"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g., 2,3,1,1,4"
                        onKeyPress={(e) => e.key === 'Enter' && solveJumpGame()}
                    />
                    <div className="flex flex-wrap gap-3 mt-4">
                        <button
                            onClick={solveJumpGame}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:-translate-y-0.5 font-medium"
                        >
                            Solve Jump Game
                        </button>
                        <button
                            onClick={() => loadExample([2,3,1,1,4])}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:-translate-y-0.5 font-medium"
                        >
                            Example 1: True
                        </button>
                        <button
                            onClick={() => loadExample([3,2,1,0,4])}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:-translate-y-0.5 font-medium"
                        >
                            Example 2: False
                        </button>
                        <button
                            onClick={() => loadExample([1,0,1,0])}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:-translate-y-0.5 font-medium"
                        >
                            Example 3: Stuck
                        </button>
                    </div>
                </div>

                {result && (
                    <div className={`mb-6 p-4 rounded-lg text-lg font-bold text-center transition-all duration-500 ${
                        result.success 
                            ? 'bg-green-100 text-green-800 border border-green-300' 
                            : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                        {result.message}
                    </div>
                )}

                {isVisible && visualization && (
                    <div className="mt-8 transition-all duration-600 transform translate-y-0 opacity-100">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Visualization:</h3>

                        <div className="flex flex-wrap gap-6 mb-6 justify-center">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border">
                                <div className="w-5 h-5 bg-green-500 rounded"></div>
                                <span className="text-sm font-medium">Start Position</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border">
                                <div className="w-5 h-5 bg-blue-500 rounded"></div>
                                <span className="text-sm font-medium">Reachable</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border">
                                <div className="w-5 h-5 bg-red-500 rounded"></div>
                                <span className="text-sm font-medium">Unreachable</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border">
                                <div className="w-5 h-5 bg-yellow-400 rounded"></div>
                                <span className="text-sm font-medium">Target</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-8 justify-center">
                            {visualization.nums.map((num, index) => (
                                <div key={index} className={getCellClass(index, visualization.nums, visualization.solution)}>
                                    <div className="absolute -top-6 text-xs text-gray-600 font-normal">
                                        {index}
                                    </div>
                                    {num}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Step-by-step explanation:</h4>
                            <ul className="space-y-2">
                                {visualization.steps.map((step, index) => (
                                    <li key={index} className={`text-gray-700 ${
                                        step.includes('Success') || step.includes('Failed') 
                                            ? 'font-bold text-blue-600' 
                                            : ''
                                    }`}>
                                        • {step}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">Algorithm Explanation:</h4>
                            <p className="text-blue-700 text-sm leading-relaxed">
                                The greedy approach tracks the maximum reachable position at each step. 
                                If we ever reach a position beyond our current maximum reach, we're stuck and return false. 
                                Otherwise, we keep updating our maximum reach and check if we can reach the end.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { canJump, canJumpDP, canJumpBacktrack, canJumpMemo };

export default JumpGameApp;