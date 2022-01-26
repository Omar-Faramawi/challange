export const generateJobId = (): string => {
  return "job_" + +new Date();
};

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const delayExecution = async () => {
  let sequence: number[] | null = Array.from(
    { length: 60 },
    (_, i) => 5 + i * 5
  );

  const ms = sequence[Math.floor(Math.random() * sequence.length)] * 1000;

  sequence = null;

  await sleep(ms);
};
