"use strict";

var xmlrpc = require('xmlrpc'),
    url = require('url'),
    should = require('should'),
    wordpressLib = require(__dirname + '/../lib/wordpress.js');

describe('Wordpressorg', function () {
  describe('Client', function () {
    var settings,
        blog,
        url = 'http://somedomain.com';

    it('should create Client when not given http auth entries are undefined', function (done) {
      settings = {
        url: url,
        username: 'fake_user',
        password: 'password',
        blogId: 1,
        httpAuthUser: undefined,
        httpAuthPassword: undefined
      };
      blog = wordpressLib.createClient(settings);
      blog.should.not.equal(null);
      blog.rpc.should.not.equal(null);
      blog.rpc.options.should.not.equal(null);
      blog.rpc.options.host.should.equal('somedomain.com');

      // check to be sure values passed through the xmlrpc process properly
      blog.rpc.options.path.should.equal('/xmlrpc.php');
      blog.rpc.options.basic_auth.should.be.undefined;
      blog.rpc.options.method.should.equal('POST');
      blog.rpc.isSecure.should.equal(false);
      done();
    });

    it('should create Client when http auth entries defined', function () {
      settings = {
        url: url,
        username: 'fake_user',
        password: 'password',
        blogId: 1,
        httpAuthUser: 'authorized_user',
        httpAuthPassword: 'auth_password'
      };
      blog = wordpressLib.createClient(settings);
      blog.rpc.should.not.equal(null);

      // check to be sure values passed through the xmlrpc process properly
      blog.rpc.options.should.not.equal(null);
      blog.rpc.options.host.should.equal('somedomain.com');
      blog.rpc.options.path.should.equal('/xmlrpc.php');
      blog.rpc.options.basic_auth.user.should.equal('authorized_user');
      blog.rpc.options.basic_auth.pass.should.equal('auth_password');
      blog.rpc.options.method.should.equal('POST');
      blog.rpc.isSecure.should.equal(false);
    });
  });
});
