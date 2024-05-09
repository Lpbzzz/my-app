import { useEffect, useRef } from "react";
import { Canvas, Rect } from "fabric";

function App() {
  const canvasEl = useRef(null);
  const canvasRef = useRef(null)
  useEffect(() => {
    canvasRef.current = new Canvas(canvasEl.current, {
      backgroundColor: '#fff'
    })
    return () => {
      canvasRef.current.dispose()
    }
  }, [])
  console.log('canvasRef:', canvasRef)
  useEffect(() => {
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 50,
      height: 50,
    })
    canvasRef.current.add(rect)
  }, [canvasRef])


  useEffect(() => {
    const worker = new Worker(new URL('./worker.js', import.meta.url));
    console.log('worker:', worker)
    worker.postMessage({
      rect: {
        left: 200,
        top: 200,
        fill: 'blue',
        width: 50,
        height: 50
      }
    });
    worker.onmessage = function (e) {
      console.log('e.data:', e.data)
      canvasRef.current.add(e.data.result)
    }
  }, [canvasRef])


  return (
    <div >
      <canvas width="900" height="600" ref={canvasEl} />
    </div>
  );
}

export default App;
