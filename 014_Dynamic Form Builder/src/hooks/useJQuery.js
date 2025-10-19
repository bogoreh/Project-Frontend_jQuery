import { useEffect, useRef } from 'react';

const useJQuery = () => {
  const jQueryRef = useRef(null);

  useEffect(() => {
    // jQuery is already available globally via CDN
    jQueryRef.current = window.jQuery;
  }, []);

  return jQueryRef.current;
};

export default useJQuery;