/* eslint-disable */
import { Rect } from 'fabric';
self.addEventListener('message', function (e) {
  const { rect } = e.data
  const rectObj = new Rect(rect)
  console.log('rectObj:', rectObj)
  postMessage({
    result: rectObj
  })
})