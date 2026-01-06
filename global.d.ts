/**
 * Global declaration for 'process' to satisfy TypeScript compiler (tsc).
 * We augment the NodeJS namespace to avoid conflicts with existing declarations
 * of the global 'process' variable while ensuring process.env.API_KEY is correctly typed.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}
