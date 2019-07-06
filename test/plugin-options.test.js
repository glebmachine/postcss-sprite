const { expect } = require('chai');
const { pluginOptions } = require('../lib/plugin-options');

/* eslint-disable func-names */
describe('Default options', function() {
  it('should throw error when `stylesheetsPath` is not defined or cannot be determined', function(done) {
    expect(() => pluginOptions.init()).to.throw(
      'Stylesheets path is undefined'
    );

    done();
  });

  it('should assign default options for any that are not defined by the user', function(done) {
    const opts = pluginOptions.init({}, 'path/to/css/file/image.png');

    expect(opts.groupBy).to.be.an('array');
    expect(opts.imagePath).to.equal(process.cwd());
    expect(opts.spritePath).to.equal(process.cwd());
    expect(opts.stylesheetPath).to.equal('path/to/css/file');
    expect(opts.padding).to.equal(20);
    expect(opts.algorithm).to.equal('binary-tree');

    done();
  });
});
