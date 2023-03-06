
export namespace EditorHelper{
    export function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height,
        };
      }
}

export const roundnum = (num: number) => {
  const index = Math.round(num / 50);
  return index * 50;
};