/**
 * Global declaration for 'process' to satisfy TypeScript compiler (tsc).
 * This allows the use of process.env.API_KEY in both browser and build scripts.
 */

export {};

declare global {
  interface Process {
    env: {
      API_KEY: string;
      [key: string]: string | undefined;
    };
  }

  // Use var here to allow augmentation of the global process object
  var process: Process;
}
