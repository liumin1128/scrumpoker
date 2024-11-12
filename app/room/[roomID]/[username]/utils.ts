export const calculateAverageScore = (scores: number[]) => {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  const average = sum / scores.length;
  return average.toFixed(2); // 保留两位小数
};

export const findMostChosenScore = (scores: number[]): number[] => {
  if (scores.length === 0) return [0];

  const frequencyMap: Record<number, number> = {};

  // 统计每个元素的频率
  scores.forEach((element) => {
    frequencyMap[element] = (frequencyMap[element] || 0) + 1;
  });

  let maxFrequency = 0;
  let mostFrequentElements: number[] = [];
  Object.entries(frequencyMap).forEach(([element, frequency]) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mostFrequentElements = [Number(element)];
    } else if (frequency === maxFrequency) {
      mostFrequentElements.push(Number(element));
    }
  });

  // // 如果只有一个元素出现频率最高，返回这个元素
  // if (mostFrequentElements.length === 1) {
  //   return mostFrequentElements[0];
  // }

  // 如果有多个元素出现频率相同且最高，返回这些元素的数组
  return mostFrequentElements;
};

export const findMaxScore = (scores: number[]) => {
  if (scores.length === 0) return 0;
  return Math.max(...scores);
};

export const findMinScore = (scores: number[]) => {
  if (scores.length === 0) return 0;
  return Math.min(...scores);
};
