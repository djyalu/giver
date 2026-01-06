
/**
 * Augmenting the NodeJS namespace to ensure process.env.API_KEY is correctly typed.
 * We do not redeclare the 'process' variable directly because it is already 
 * provided by the environment (e.g., Node.js or Vite's environment).
 */
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
