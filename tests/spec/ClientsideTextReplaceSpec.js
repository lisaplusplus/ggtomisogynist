describe("ClientsideTextReplace 'doReplace' function", function() {
  beforeEach(function() {

  });

  var createTestDocument = function() {
    return document.implementation.createHTMLDocument("test doc");
  }

  // Tests that the target list is correct, tests nothing fancy about DOM structure.
  describe("Text replace target list", function() {

    it("Replaces gamergate", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "gamergate isnie cool!";

      doReplace(testDocument);

      expect(testDocument.body.innerHTML).toEqual('misogynist isnie cool!');
    });

    it("Replaces gAmErGaTe (N.B. is the replace case insensitive)", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "gAmErGaTe isnie cool!";

      doReplace(testDocument);

      expect(testDocument.body.innerHTML).toEqual('misogynist isnie cool!');
    });

    it("Replaces gamer-gate", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "gamer-gate isnie cool!";

      doReplace(testDocument);

      expect(testDocument.body.innerHTML).toEqual('misogynist isnie cool!');
    });

    it("Replaces gamer gate", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "gamer gate isnie cool!";

      doReplace(testDocument);

      expect(testDocument.body.innerHTML).toEqual('misogynist isnie cool!');
    });

    it("Replaces gamegate", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "gamegate isnie cool!";

      doReplace(testDocument);

      expect(testDocument.body.innerHTML).toEqual('misogynist isnie cool!');
    });

    it("Replaces 'It's about ethics in journalism'", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "It's about ethics in journalism bro!";

      doReplace(testDocument);

      // A future version might use proper grammer (though probably not tbh).
      expect(testDocument.body.innerHTML).toEqual('It\'s about stopping women from playing video games bro!');
    });

    it("Replaces 'It's about ethics in journalism' (case insensitive test)", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = " It's aBoUt eThIcs In jOurnalism bro!";

      doReplace(testDocument);

      // A future version might use proper grammer (though probably not tbh).
      expect(testDocument.body.innerHTML).toEqual(' It\'s about stopping women from playing video games bro!');
    });

    it("Replaces 'It's about ethics in gaming'", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "It's about ethics in gaming bro!";

      doReplace(testDocument);

      // A future version might use proper grammer (though probably not tbh).
      expect(testDocument.body.innerHTML).toEqual('It\'s about stopping women from playing video games bro!');
    });

    it("Replaces 'It's about ethics in GaMing'", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "It's about ethics in gaming bro!";

      doReplace(testDocument);

      // A future version might use proper grammer (though probably not tbh).
      expect(testDocument.body.innerHTML).toEqual('It\'s about stopping women from playing video games bro!');
    });

    it("Replaces 'ethics in game journalism'", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "ethics in game journalism bro!";

      doReplace(testDocument);

      // A future version might use proper grammer (though probably not tbh).
      expect(testDocument.body.innerHTML).toEqual('stopping women from playing video games bro!');
    });

    it("Replaces 'ethics in game journalism' (case insensitive)", function() {
      // Test data setup
      var testDocument = createTestDocument();
      testDocument.body.innerText = "eThIcs iN gAme jOurNalIsm bro!";

      doReplace(testDocument);

      // A future version might use proper grammer (though probably not tbh).
      expect(testDocument.body.innerHTML).toEqual('stopping women from playing video games bro!');
    });

  });

  it("Replaces text inside body.p", function() {
    // Test data setup
    var testDocument = createTestDocument();
    var pTag = testDocument.createElement('P');
    pTag.innerText = "gamergate isnie cool!";
    testDocument.body.append(pTag);

    doReplace(testDocument);

    // A future version might use proper grammer (though probably not tbh).
    expect(testDocument.body.innerHTML).toEqual('<p>misogynist isnie cool!</p>');
  });

  it("Replaces againsts body.div.a withtout touch the href attribute", function() {
    // Test data setup
    var testDocument = createTestDocument();
    var divTag = testDocument.createElement('DIV');
    var aTag = testDocument.createElement('A');
    aTag.innerText = "gamergate isnie cool!";
    aTag.href = "http://wikawikawik.com/gamergate"
    divTag.append(aTag);
    testDocument.body.append(divTag);

    doReplace(testDocument);

    // A future version might use proper grammer (though probably not tbh).
    expect(testDocument.body.innerHTML).toEqual('<div><a href="http://wikawikawik.com/gamergate">misogynist isnie cool!</a></div>');
  });


});
