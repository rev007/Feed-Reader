/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: 1) Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('has URLs that are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
            });
        });

        it('has URLs that are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).not.toEqual('');
            });
        });


        /* TODO: 2) Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('has names that are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
            });
        });

        it('has names that are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).not.toEqual('');
            });
        });

    });


    /* TODO: 3) Write a new test suite named "The menu" */

    describe('The Menu', function() {

        /* TODO: 4) Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it ('is hidden by default', function() {
            var element = document.getElementsByClassName("menu-hidden");
            expect(element.length).not.toBeLessThan(1); // "menu-hidden" is the class css uses to push menu off screen
        });

         /* TODO: 5) Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

         it('changes visibility when clicked', function() {

             var element;

             // click the menu on
             menuIcon = $('.menu-icon-link'); // get the burger menu icon
             menuIcon.click(); // make the menu shift onto the screen by clicking the burger
             element = document.getElementsByClassName("menu-hidden");
             expect(element.length).toBeLessThan(1); // "menu-hidden" class should be toggled off

             // click the menu off
             menuIcon.click(); // make the menu shift off the screen by clicking the burger
             element = document.getElementsByClassName("menu-hidden");
             expect(element.length).not.toBeLessThan(1); // "menu-hidden" class should be toggled off
             
         });

    });

    
    /* TODO: 6) Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: 7) Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should have at least one entry', function(done) {
            var x = $(".feed").contents().length;
            expect(x).toBeGreaterThan(0);
            done();
        });

    });


    /* TODO: 8) Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: 9) Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // uncomment to clear localStorage for an initial test
        // localStorage.setItem("strSavedStuff", "");

        var strOldFeed = localStorage.getItem("strSavedStuff");
        console.log('oldFeed = ' + strOldFeed);

        var newFeed;
        var strNewFeed = '';

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('content changes', function(done) {

            // get all the entries
            newFeed = document.getElementsByClassName("entry");

            // build a string out of them
            for (var i = 0; i < newFeed.length; i++) {
                strNewFeed = strNewFeed + newFeed[i].innerText;
            }

            console.log('newFeed = ' + strNewFeed);

            // save this feed so you can compare next time a new feed is requested
            localStorage.setItem("strSavedStuff", strNewFeed);

            expect(strNewFeed).not.toEqual(strOldFeed);
            done();
        });

    });

}());
