import Mock from 'mockjs'
import data from './data'

var mh = "## this\n" +
  "### 默认绑定\n" +
  "- 独立函数调用：可以把这条规则看作是无法应用其他规则时的默认规则\n" +
  "- 独立函数调用：如果使用了非严格模式,this 会绑定到全局对象(window)\n" +
  "- 独立函数调用：如果使用严格模式（ strict mode ），this 会绑定到 undefined\n" +
  "- 这里有一个微妙但是非常重要的细节，虽然 this 的绑定规则完全取决于调用位置。\n" +
  "  - 但是只有 foo()运行在非 strict mode 下时，默认绑定才能绑定到全局对象；\n" +
  "  - 在严格模式底下foo()会绑给undefined\n" +
  "\n" +
  "多说无用，下面来看代码.\n" +
  "```\n" +
  "      var a = 2;\n" +
  "\t  function foo() {\n" +
  "\t\t  console.log( this.a );\n" +
  "\t  }\n" +
  "\n" +
  "\t  (function(){\n" +
  "\t\t\"use strict\";\n" +
  "\t\tfoo();\n" +
  "\t  })()\n" +
  "```\n" +
  "这个时候严格模式不会影响默认绑定规则，此时输出的是2\n" +
  "```\n" +
  "        function foo() {\n" +
  "\t\t  \"use strict\";\n" +
  "\t\t  console.log( this.a );\n" +
  "\t\t}\n" +
  "\t\tvar a = 2;\n" +
  "\t\tfoo();\n" +
  "```\n" +
  "现在这个时候会报错，a为undefined.\n" +
  "\n" +
  "### 隐式绑定\n" +
  "- 隐式绑定的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象\n" +
  "\n" +
  "- 对象属性引用链中只有最顶层或者说最后一层会影响调用位置\n" +
  "```\n" +
  "      function foo() {\n" +
  "\t\tconsole.log( this.a );\n" +
  "\t\t}\n" +
  "\t\tvar obj = {\n" +
  "\t\t\ta: 2,\n" +
  "\t\t\tfoo: foo\n" +
  "\t\t};\n" +
  "\t\tobj.foo();\n" +
  "```\n" +
  "毋庸置疑this指向调用者obj，输出2\n" +
  "\n" +
  "```\n" +
  "    function foo() {\n" +
  "\t\t\tconsole.log( this.a );\n" +
  "\t\t}\n" +
  "\t\tvar obj2 = {\n" +
  "\t\t\ta: 42,\n" +
  "\t\t\tfoo: foo\n" +
  "\t\t};\n" +
  "\t\tvar obj1 = {\n" +
  "\t\t\ta: 2,\n" +
  "\t\t\tobj2: obj2\n" +
  "\t\t};\n" +
  "\t\tobj1.obj2.foo();\n" +
  "```\n" +
  "这个时候this指向obj2，输出42\n" +
  "\n" +
  "- 一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上.(取决于是否是严格模式)\n" +
  "```\n" +
  "    function foo() {\n" +
  "\t\t\tconsole.log( this.a );\n" +
  "\t\t}\n" +
  "\t\tvar a = \"hello word\";\n" +
  "\t\tvar obj = {\n" +
  "\t\t\ta: 2,\n" +
  "\t\t\tfoo: foo\n" +
  "\t\t};\n" +
  "\n" +
  "\t\tvar bar = obj.foo;\n" +
  "\t\tbar();\n" +
  "```\n" +
  "这个时候会发生隐式丢失，this指向全局对象：hello word\n" +
  "\n" +
  "- 参数传递其实也是一种隐式赋值，因此我们传入函数时也会被隐式赋值\n" +
  "```\n" +
  "        function foo() {\n" +
  "\t\t\tconsole.log( this.a );\n" +
  "\t\t}\n" +
  "\n" +
  "\t\tfunction doFoo(fn) {\n" +
  "\t\t\tfn();\n" +
  "\t\t}\n" +
  "\n" +
  "\t\tvar a = \"hello word\";\n" +
  "\t\tvar obj = {\n" +
  "\t\t\ta: 2,\n" +
  "\t\t\tfoo: foo\n" +
  "\t\t};\n" +
  "\n" +
  "\t\tdoFoo( obj.foo );\n" +
  "```\n" +
  "这个时候会发生隐式丢失，this指向全局对象：hello word\n" +
  "\n" +
  "如果你把函数传入语言内置的函数而不是传入你自己声明的函数，你会发现结果是一样的，没有区别,比如定时器的内置函数：\n" +
  "```\n" +
  "        function foo() {\n" +
  "\t\t\tconsole.log( this.a );\n" +
  "\t\t}\n" +
  "\n" +
  "\t\tvar a = \"hello word\";\n" +
  "\t\tvar obj = {\n" +
  "\t\t\ta: 2,\n" +
  "\t\t\tfoo: foo\n" +
  "\t\t};\n" +
  "\n" +
  "\t\tsetTimeout( obj.foo, 1000 );  \n" +
  "```\n" +
  "结果输出的仍然是:hello word\n" +
  "\n" +
  "### 显示绑定\n" +
  "- 我们不想在对象内部包含函数引用，而想在某个对象上强制调用函数,具体点说，可以使用函数的 call(..) 和 apply(..) 方法来实现显示绑定.\n" +
  "```\n" +
  "        var a =0;\n" +
  "\t\tfunction foo() {\n" +
  "\t\t\tconsole.log( this.a );\n" +
  "\t\t}\n" +
  "\t\tvar obj = {\n" +
  "\t\t\ta:1\n" +
  "\t\t};\n" +
  "\t\tvar obj2 = {\n" +
  "\t\t\ta:2\n" +
  "\t\t};\n" +
  "\t\tvar obj3 = {\n" +
  "\t\t\ta:3\n" +
  "\t\t};\n" +
  "\t\tfoo();\n" +
  "\t\tfoo.call( obj );\n" +
  "\t\tfoo.apply( obj2 );\n" +
  "\t\tfoo.call( obj3 );\n" +
  "```\n" +
  "如果没有给foo使用call方法，foo使用的就是默认绑定，foo()输出0,。使用call apply方法，输出分别为1，2，3\n" +
  "\n" +
  "- 什么是硬绑定：一种显示绑定的变种\n" +
  "  - 我们来看看这个显式绑定变种到底是怎样工作的。我们创建了函数 bar() ,并在它的内部手动调用了 foo.call(obj) ,因此强制把 foo 的 this 绑定到了 obj 。无论之后如何调用函数 bar ，它总会手动,在 obj 上调用 foo 。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。\n" +
  "```\n" +
  "        var a =1;\n" +
  "        function foo() {\n" +
  "\t\t\tconsole.log( this.a );\n" +
  "\t\t}\n" +
  "\n" +
  "\t\tvar obj = {\n" +
  "\t\t\ta:2\n" +
  "\t\t};\n" +
  "\n" +
  "\t\tvar obj_test = {\n" +
  "\t\t\ta:\"test\"\n" +
  "\t\t};\n" +
  "\n" +
  "\t\tvar bar = function() {\n" +
  "\t\t\tfoo.call( obj );\n" +
  "\t\t};\n" +
  "\n" +
  "\t\tbar(); //2\n" +
  "\t\tsetTimeout( bar, 1000 ); // 2\n" +
  "\t\tbar.call( obj_test ); //2   \n" +
  "```\n" +
  "硬绑定的bar不可能再修改它的this(指的是foo中的this),是不是解决了之前的隐式丢失。(定时器内部this的调用是独立调用)\n" +
  "\n" +
  "- 简单的辅助绑定函数bind函数的作用：返回一个新的函数，并且指定该新函数的this指向\n" +
  "```\n" +
  "        function bind(fn, obj) {\n" +
  "\t\t\treturn function() {\n" +
  "\t\t\t\t\treturn fn.apply( obj, arguments );\n" +
  "\t\t\t\t};\n" +
  "\t\t}\n" +
  "\n" +
  "\t\tvar obj = {\n" +
  "\t\t\ta:2\n" +
  "\t\t};\n" +
  "\t\tvar obj_test = {\n" +
  "\t\t\ta:22\n" +
  "\t\t};\n" +
  "\n" +
  "\n" +
  "\t\tvar bar = bind( foo, obj);\n" +
  "\t\tvar b = bar(3); // 2 3 undefined\n" +
  "\t\tconsole.log( b ); // 5\n" +
  "\t\tbar.call(obj_test,3);//2 3 undefined\n" +
  "```\n" +
  "有了bind函数，我们可以把经过绑定的函数拿去使用（这样它就有默认值了）\n" +
  "\n" +
  "### new绑定\n" +
  "- 我们重新定义一下JS中的“构造函数”。JavaScript，构造函数只是一些使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。\n" +
  "\n" +
  "- 实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”\n" +
  "\n" +
  "- 使用 new 来调用函数，或者说发生构造函数调用时，对于我们的this来说。这个新对象会绑定到函数调用的 this 。\n" +
  "```\n" +
  "      function foo(a) {\n" +
  "\t\t\tthis.a = a;\n" +
  "\t\t}\n" +
  "\t\tvar bar = new foo(2);\n" +
  "\t\tconsole.log( bar.a ); // 2\n" +
  "```\n" +
  "使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this 上。new 是最后一种可以影响函数调用时 this 绑定行为的方法，我们称之为 new 绑定。\n" +
  "\n" +
  "### 绑定的优先级\n" +
  "- 最后我们来说一说绑定的优先级\n" +
  "- new绑定 > 显示绑定 > 隐式绑定 > 默认绑定\n" +
  "\n" +
  "### 绑定例外\n" +
  "- es6中胖箭头this指向与我们现在的规则不一样\n" +
  "  - 被忽略的this：apply call bind（null）  this----> window\n" +
  "- 柯里化:为函数去预绑定参数\n" +
  "```\n" +
  "var obj = Object.create（null）\n" +
  "```"

Mock.mock('/api/catalogue',{code:0,data:data.catalogue})

console.log('执行mockServer...')
