import { useCallback, useEffect, useState } from 'react'
import useEvent from './useEvent';

const useScroll = (target?: any) => {
    const [show, setShow] = useState<boolean>(false);
    let targetEl = target ? 'current' in target ? target.current : target : window;
    const controlNavbar = () => {
      if ((targetEl?.scrollY ?? targetEl?.scrollTop) > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    useEvent(target,'scroll', controlNavbar)
  return  show;
}

export default useScroll
