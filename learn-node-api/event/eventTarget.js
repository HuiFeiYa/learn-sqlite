const target = new EventTarget();

target.addEventListener('foo', (event) => {
  console.log('foo event happened!', event);
});
const event1 = new Event('foo')
target.dispatchEvent(event1)