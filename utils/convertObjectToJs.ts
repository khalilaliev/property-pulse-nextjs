type SerializableValue =
  | {
      toString: () => string;
      toJSON?: () => unknown;
    }
  | string
  | number
  | boolean
  | null
  | undefined;

export function convertToSerializableObject<K extends keyof any>(
  leanDocument: Record<K, SerializableValue>
): Record<K, string | number | boolean | null | undefined> {
  const result: Record<K, string | number | boolean | null | undefined> =
    {} as Record<K, string | number | boolean | null | undefined>;

  for (const key of Object.keys(leanDocument) as K[]) {
    const value = leanDocument[key];

    if (value !== null && value !== undefined && typeof value === "object") {
      if (typeof value.toJSON === "function") {
        result[key] = value.toJSON() as
          | string
          | number
          | boolean
          | null
          | undefined;
      } else if (typeof value.toString === "function") {
        result[key] = value.toString();
      }
    } else {
      result[key] = value as string | number | boolean | null | undefined;
    }
  }

  return result;
}
