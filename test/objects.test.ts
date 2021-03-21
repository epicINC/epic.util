import { Objects } from '../src/objects'


const data = {
  a: 1,
  b: 2,
  c: 3
}



test('pick one', () => {
  expect(Objects.pick(data, 'b')).toStrictEqual({b: 2})
})

test('pick mutil', () => {
  expect(Objects.pick(data, 'a', 'c')).toStrictEqual({a: 1, c: 3})
})


test('picker one', () => {
  const picker = Objects.picker<typeof data>('b')
  expect(picker(data)).toStrictEqual({b: 2})
})

test('picker mutil', () => {
  const picker = Objects.picker<typeof data>('a', 'c')
  expect(picker(data)).toStrictEqual({a: 1, c: 3})
})




test('omit one', () => {
  expect(Objects.omit(data, 'b')).toStrictEqual({a: 1, c: 3})
})

test('omit mutil', () => {
  expect(Objects.omit(data, 'a', 'c')).toStrictEqual({b: 2})
})



test('omiter one', () => {
  const omiter = Objects.omiter<typeof data>('b')
  expect(omiter(data)).toStrictEqual({a: 1, c: 3})
})

test('omiter mutil', () => {
  const omiter = Objects.omiter<typeof data>('a', 'c')
  expect(omiter(data)).toStrictEqual({b: 2})
})