declare module "@xenova/transformers" {
  export const env: {
    allowLocalModels: boolean;
    cacheDir: string;
  };

  export function pipeline(
    task: string,
    model: string,
  ): Promise<any>;
}