"use strict";

require('should');
var wordpressLib = require(__dirname + '/../lib/wordpress.js');

describe('Wordpressorg', function () {
  describe('getYoastAnalysis', function () {
    var blog,
      url = 'http://somedomain.com';

    beforeEach(function () {
      blog = wordpressLib.createClient({
        url: url,
        username: 'admin',
        password: 'admin'
      });
    });

    it('should call the callback function', function (done) {
      blog.getYoastAnalysis(1, null, function () {
        done();
      });

    });

    it('should call the callback function even if it passed as 2nd argument', function (done) {
      blog.getYoastAnalysis(1, function () {
        done();
      });
    });


    it('should throw error without post id', function () {
      var func = function () {
        blog.getYoastAnalysis();
      };
      func.should.throw();
    });

    it('should throw error without callback function', function () {
      var func = function () {
        blog.getYoastAnalysis(1);
      };
      func.should.throw();
    });
  });
});