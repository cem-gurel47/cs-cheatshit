import { useState, useRef, useCallback, useEffect } from "react";

//@ts-ignore
const useDraggable = ({ onDrag, scale } = {}) => {
  // this state doesn't change often, so it's fine
  const [pressed, setPressed] = useState(false);

  // do not store position in useState! even if you useEffect on
  // it and update `transform` CSS property, React still rerenders
  // on every state change, and it LAGS
  const position = useRef({ x: 0, y: 0 });
  const ref = useRef();

  // handlers must be wrapped into `useCallback`. even though
  // resubscribing to `mousedown` on every tick is quite cheap
  // due to React's event system, `handleMouseDown` might be used
  // in `deps` argument of another hook, where it would really matter.
  // as you never know where return values of your hook might end up,
  // it's just generally a good idea to ALWAYS use `useCallback`
  //@ts-ignore
  const handleMouseDown = useCallback((e) => {
    // don't forget to disable text selection during drag and drop
    // operations
    e.target.style.userSelect = "none";
    setPressed(true);
  }, []);

  // TODO:
  // we've moved the code into the hook, and it would be weird to
  // return `ref` and `handleMouseDown` to be set on the same element
  // why not just do the job on our own here and use a function-ref
  // to subscribe to `mousedown` too? it would go like this:
  // const ref = useRef();
  // const unsubscribe = useRef();
  // const legacyRef = useCallback((elem) => {
  //   ref.current = elem;
  //   if (unsubscribe.current) {
  //     unsubscribe.current();
  //   }
  //   if (elem) {
  //     elem.addEventListener('mousedown', handleMouseDown);
  //     unsubscribe.current = () => {
  //       elem.removeEventListener('mousedown', handleMouseDown);
  //     };
  //   }
  // }, []);
  // then keep using `ref` to the end of this hook, but
  // return a `[legacyRef, pressed]`

  useEffect(() => {
    if (!pressed) {
      return;
    }
    // subscribe to mousemove only when pressed, otherwise it will lag
    // even when you're not dragging
    // TODO: updating the page without any throttling is a bad idea
    // requestAnimationFrame-based throttle would probably be fine,
    // but be aware that naive implementation might make element
    // lag 1 frame behind cursor, and it will appear to be lagging
    // even at 60 FPS
    const handleMouseMove = (
      event: React.MouseEventHandler<unknown> | undefined
    ) => {
      // needed for TypeScript anyway
      if (!ref.current || !position.current) {
        return;
      }
      const pos = position.current;
      // it's important to save it into variable here,
      // otherwise we might capture reference to an element
      // that was long gone. not really sure what's correct
      // behavior for a case when you've been scrolling, and
      // the target element was replaced. probably some formulae
      // needed to handle that case. TODO
      const elem = ref.current;
      position.current = onDrag({
        //@ts-ignore
        x: pos.x + event!.movementX,
        //@ts-ignore
        y: pos.y + event!.movementY,
      });
      //@ts-ignore
      elem.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
    };
    //@ts-ignore
    const handleMouseUp = (e) => {
      e.target.style.userSelect = "auto";
      setPressed(false);
    };
    // subscribe to mousemove and mouseup on document, otherwise you
    // can escape bounds of element while dragging and get stuck
    // dragging it forever
    //@ts-ignore
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      //@ts-ignore
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // if `onDrag` wasn't defined with `useCallback`, we'd have to
    // resubscribe to 2 DOM events here.
  }, [pressed, onDrag, scale]);

  // actually it makes sense to return an array only when
  // you expect that on the caller side all of the fields
  // will be usually renamed
  return [ref, pressed, handleMouseDown];

  // > seems the best of them all to me
  // this code doesn't look pretty anymore, huh?
};

export default useDraggable;
