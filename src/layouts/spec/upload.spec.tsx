import * as React       from 'react';
import * as chai        from 'chai';
import * as sinon       from 'sinon';
import * as mocha       from 'mocha';
import { shallow }      from 'enzyme';

import * as TestUtils   from 'react-addons-test-utils';
import  Uploader        from '../Uploader';
import * as path        from 'path';


describe("Upload page", function() {
    it('renders without problems', function() { 
       var uploader = TestUtils.renderIntoDocument(<Uploader params={ window.location.href.split('is_new=')[1] } />);
       chai.expect(uploader).to.exist;
    });

    it('upload de la video', function() {
        var fileToUpload = '../video/ocean.mp4',
        absolutePath = path.resolve(__dirname, fileToUpload);
        //element(by.css('input[type="file"]')).sendKeys(absolutePath);    
        //element(by.id('uploadButton')).click();
    });
});