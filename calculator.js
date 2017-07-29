function Calculator(input) {
  this.tokenStream = this.lexer(input);
}

function TreeNode(name, ...children) {
  this.name = name;
  this.children = children;
}

Calculator.prototype.lexer = function(str) {
  const stream = []
  const tokenTypes = [
    ['NUMBER',    /^\d+/ ],
    ['ADD',       /^\+/  ],
    ['SUB',       /^\-/  ],
    ['MUL',       /^\*/  ],
    ['DIV',       /^\//  ],
    ['LPAREN',    /^\(/  ],
    ['RPAREN',    /^\)/  ]
  ]
  for (let i = 0; i < str.length; i++) {
    let foundIt = false
    tokenTypes.forEach(function(el) {
      if (str[i].match(el[1])) {
        foundIt = true
        stream.push({name: el[0], value: str[i]})
      }
    })
    if (!foundIt) {
      throw new Error('Found uparseable token: ' + str[i])
    }
  }
  return stream
}

Calculator.prototype.peek = function() {
  return this.tokenStream[0] || null;
}

Calculator.prototype.get = function() {
  return this.tokenStream.shift();
}

Calculator.prototype.parseExpression = function() {
  var t = this.parseTerm();
  var a = this.parseA();
  return new TreeNode('Expression', t, a);
}

Calculator.prototype.parseTerm = function() {
  const f = this.parseF()
  const b = this.parseB()
  return new TreeNode('Term', f, b)
}

Calculator.prototype.parseA = function() {
  const nextToken = this.peek();
  if (nextToken && nextToken.name === 'ADD') {
    this.get();
    return  new TreeNode('A', '+', this.parseTerm(), this.parseA())
  } else if (nextToken && nextToken.name === 'SUB') {
    this.get();
    return new TreeNode('A', '-', this.parseTerm(), this.parseA())
  } else {
    return new TreeNode('A')
  }
}

Calculator.prototype.parseB = function() {
  const nextToken = this.peek();
  if (nextToken && nextToken.name === 'MUL') {
    this.get();
    return  new TreeNode('B', '*', this.parseF(), this.parseB())
  } else if (nextToken && nextToken.name === 'DIV') {
    this.get();
    return new TreeNode('B', '/', this.parseF(), this.parseB())
  } else {
    return new TreeNode('B')
  }
}

Calculator.prototype.parseF = function() {
  const nextToken = this.peek();
  if (nextToken && nextToken.name === 'LPAREN') {
    this.get();
    const expr = this.parseExpression();
    this.get();
    return  new TreeNode('F', '(', expr, ')')
  } else if (nextToken && nextToken.name === 'SUB') {
    return new TreeNode('F', '-', this.parseF())
  } else {
    return new TreeNode('F', nextToken.value)
  }
}

// E = Expression
// T = Term
// F = Factor
// A = ExpressionRemainder // a placeholder created to remove the left-recursion
// B = TermRemainder // same as above

// E => T A
// A => + T A
//      - T A
//      epsilon
// T => F B
// B => * F B
//      / F B
//      epsilon
// F => ( E )
//      - F
//      NUMBER

