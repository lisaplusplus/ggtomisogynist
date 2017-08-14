describe("ClientsideTextReplace 'doReplace' function", function() {
    beforeEach(function() {
    });

    var createTestDocument = function() {
    return document.implementation.createHTMLDocument("test doc");
    }

    // Tests that the target list is correct, tests nothing fancy about DOM structure.
    describe("Text replace target list", function() {

        // N.B All of the targets aren't tests indvidually unless they are likely to cause issues. Maintenance thing really.
        it("Replaces gamergate", function() {
            // Test data setup
            var testDocument = createTestDocument();
            testDocument.body.innerText = "gamergate isnie cool!";

            doReplace(testDocument);

            expect(testDocument.body.innerHTML).toEqual('misogynist isnie cool!');
        });

        it("Replaces game-gate", function() {
            // Test data setup
            var testDocument = createTestDocument();
            testDocument.body.innerText = "game-gate isnie cool!";

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
});
