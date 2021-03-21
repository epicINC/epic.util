


function test(a: string, ...args: string[]) {
  console.log(arguments.length)
  console.log(a, args)
}

test('a', 'b', 'c')