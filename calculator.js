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
  console.log(stream);

  return stream
}

Calculator.prototype.peek = function(currentIndex) {
  return this.tokenStream[currentIndex + 1] || null;
}

Calculator.prototype.get = function() {
  return this.tokenStream.shift();
}



const calc = new Calculator('1+(2*3)+4')
var num = calc.get();
var num2 = calc.get();
console.log(num2);

