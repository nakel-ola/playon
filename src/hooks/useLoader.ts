import * as React from "react";

function useLoader({
  crossOrigin,
  referrerPolicy,
  src,
  srcSet,
}: {
  crossOrigin?: string;
  referrerPolicy?: any;
  src?: string;
  srcSet?: any;
}) {
  const [loaded, setLoaded] = React.useState<boolean | string>(false);

  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded(true);
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded("Failed");
    };

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }
    if (src) {
      image.src = src;
    }
    image.referrerPolicy = referrerPolicy;
    if (srcSet) {
      image.srcset = srcSet;
    }

    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);

  return loaded;
}

export default useLoader;
