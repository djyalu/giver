
/**
 * Explicitly define the 'process' object for the TypeScript compiler.
 * This satisfies tsc when it encounters process.env.API_KEY in both 
 * browser-side services and build-side config files.
 */
export {};

declare global {
  var process: {
    env: {
      API_KEY: string;
      [key: string]: string | undefined;
    };
  };
}
