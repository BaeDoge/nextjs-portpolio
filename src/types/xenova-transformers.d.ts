declare module "@xenova/transformers" {
  export const env: {
    allowLocalModels: boolean;
    cacheDir: string;
    [key: string]: unknown;
  };

  export function pipeline(
    task: string,
    model: string,
    options?: Record<string, unknown>,
  ): Promise<any>;
}