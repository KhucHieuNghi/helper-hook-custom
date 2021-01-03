
export const useKeepPositionScroll = () => {
  const { location } = window;
  const [scrollTop, setScrollTop] = useState(0);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    let newScrollPosition = [];

    // get scrollPosition from sessionStorage
    const scrollPosition = JSON.parse(sessionStorage.getItem('scroll-position')) || [];

    // get index
    const id = scrollPosition.findIndex(
      v => v.pathname === location.pathname,
    );

    // check if pathname exist in storage
    if (id !== -1) {
      // if not scroll then default scroll to position available in storage
      if (!isScroll) window.scrollTo(0, scrollPosition[id].position);

      // update sessionStorage
      newScrollPosition = [...scrollPosition];
      newScrollPosition.splice(id, 1, {
        pathname: location.pathname,
        position: scrollTop,
      });

      sessionStorage.setItem(
        'scroll-position',
        JSON.stringify(newScrollPosition),
      );

      return;
    }

    newScrollPosition = [
      ...scrollPosition,
      {
        pathname: location.pathname,
        position: 0,
      },
    ];

    sessionStorage.setItem(
      'scroll-position',
      JSON.stringify(newScrollPosition),
    );
    window.scrollTo(0, 0);
  }, [scrollTop, location.pathname, isScroll]);

  // Get scroll top
  const windowScrollTop = () => {
    const position = window.pageYOffset;
    setIsScroll(true);
    setScrollTop(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', windowScrollTop);
    return () => window.removeEventListener('scroll', windowScrollTop);
  }, []);

  return location;
}
