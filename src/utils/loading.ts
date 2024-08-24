export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const asyncProcess = async (asyncFunction: () => Promise<void>) => {
  try {
    await Promise.all([sleep(1000), asyncFunction()]);
  } catch (error) {
    console.error('Error during async process:', error);
  }
};