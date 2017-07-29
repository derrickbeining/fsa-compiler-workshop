function Calculator(input) {
  this.tokenStream = this.lexer(input);
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
  console.log(stream);

  return stream
}

const calc = new Calculator('1+(2*3)+4')
