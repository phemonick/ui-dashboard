
export const toCamelCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[-_](.)/g, (_, char) => char?.toUpperCase());
}