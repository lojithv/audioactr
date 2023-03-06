
export namespace EditorHelper{
    export function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height,
        };
      }
}

