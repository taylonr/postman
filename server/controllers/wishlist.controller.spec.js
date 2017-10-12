const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const td = require('testdouble');
const Wishlist = require('../models').wishlist;
const Book = require('../models').book;
const controller = require('./wishlist.controller');

describe('Wishlist controller', () => {
  afterEach(() => {
    td.reset();
  });


});