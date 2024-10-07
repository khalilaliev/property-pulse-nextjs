import { Types } from "mongoose";

type SerializableValue =
  | {
      toString: () => string;
      toJSON?: () => unknown;
    }
  | string
  | number
  | boolean
  | Date
  | Types.ObjectId
  | null
  | undefined;

export function convertToSerializableObject<K extends keyof any>(
  leanDocument: Record<K, SerializableValue>
): Record<K, string | number | boolean | null | undefined> {
  const result: Record<K, string | number | boolean | null | undefined> =
    {} as Record<K, string | number | boolean | null | undefined>;

  for (const key of Object.keys(leanDocument) as K[]) {
    const value = leanDocument[key];

    if (value instanceof Types.ObjectId) {
      result[key] = value.toString();
    } else if (value instanceof Date) {
      result[key] = value.toISOString();
    } else if (
      value !== null &&
      value !== undefined &&
      typeof value === "object"
    ) {
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
