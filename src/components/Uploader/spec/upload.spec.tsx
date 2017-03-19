import * as React           from 'react';
import * as ReactDOM        from 'react-dom';
import { expect, assert }   from 'chai';
import { stub, spy }        from 'sinon';
import * as mocha           from 'mocha';
import { mount, shallow, ReactWrapper }   from 'enzyme';

import * as TestUtils       from 'react-addons-test-utils';
import Uploader             from '../../../layouts/Uploader';
import * as path            from 'path';


describe("Upload page", () => {
    const MAIN_VIEW_PROPS = {
        onDrop: spy()
    };

    var component: any;
    var renderedDOM: Function;
    let file: any;
    let dragDrop: ReactWrapper<any, {}>;

    before(() => {
        dragDrop = mount(
            <Uploader {...MAIN_VIEW_PROPS} params={ window.location.href.split('is_new=')[1] } />
        );
        component = TestUtils.renderIntoDocument(<Uploader params={ window.location.href.split('is_new=')[1] } />);
        renderedDOM = () => ReactDOM.findDOMNode(component);
        file = [{
            name: 'ocean.mp4',
            size: 23014356,
            type: 'video/mp4'
        }];
    });

    it('should renders without problems', () => { 
        expect(component).to.exist;
    });

    it("should renders a <div> with the good amount of class and children", () => {
        let rootElement = renderedDOM();
        expect(rootElement.tagName).to.equal("DIV");
        expect(rootElement.classList.length).to.equal(3);
        expect(rootElement.classList[0]).to.equal("column");
    });

    it("should renders a div which display drop file", () => {
        let renderedDivs = renderedDOM().querySelectorAll("div");

        expect(renderedDOM().children.length).to.equal(1);
        expect(renderedDivs.length).to.equal(3);
        expect(renderedDivs[2].textContent).to.equal("Déposer le(s) fichier(s) ici");
    });

    it('should call `open` method', () => {
        let eventStub: sinon.SinonStub = stub(dragDrop, 'simulate');
        let clickStub: sinon.SinonStub = stub(dragDrop, 'click');
        TestUtils.Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(dragDrop.instance(), 'input')[0]);
        dragDrop.simulate('click');
        assert.ok(MAIN_VIEW_PROPS.onDrop.calledOnce);
        expect(eventStub.callCount).to.equal(1);
        expect(clickStub.callCount).to.equal(1);

        dragDrop.simulate('drop', { dataTransfer: { items: file } });
        expect(eventStub.callCount).to.equal(2);
    });

    after(() => {
        dragDrop.unmount();
    });
});