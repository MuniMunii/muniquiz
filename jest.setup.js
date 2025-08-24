import 'whatwg-fetch'
import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder, } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import { TransformStream, ReadableStream, WritableStream } from 'web-streams-polyfill'
class MockBroadcastChannel {
  constructor(name) {
    this.name = name
  }

  postMessage(message) {
    if (this.onmessage) {
      this.onmessage({ data: message })
    }
  }

  close() {}
}
if (typeof global.BroadcastChannel === 'undefined') {
  global.BroadcastChannel = MockBroadcastChannel
}
if (typeof global.TransformStream === 'undefined') {
  ;global.TransformStream = TransformStream
}
if (typeof global.ReadableStream === 'undefined') {
  ;global.ReadableStream = ReadableStream
}
if (typeof global.WritableStream === 'undefined') {
  ;global.WritableStream = WritableStream
}