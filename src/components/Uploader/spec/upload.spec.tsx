// tslint:disable:import-spacing
import * as React           from "react";
import * as ReactDOM        from "react-dom";
import { expect, assert }   from "chai";
import { stub, spy }        from "sinon";
import * as mocha           from "mocha";
import { mount, shallow, ReactWrapper }   from "enzyme";

import * as TestUtils       from "react-addons-test-utils";
import Uploader             from "../../../layouts/Uploader";
import * as path            from "path";
// tslint:enable:import-spacing

describe("Upload page", () => {
    const MAIN_VIEW_PROPS = {
        onDrop: spy(),
    };

    let component: any;
    // tslint:disable-next-line:ban-types
    let renderedDOM: Function;
    let file: any;
    let dragDrop: ReactWrapper<any, {}>;

    before(() => {
        dragDrop = mount(
            <Uploader {...MAIN_VIEW_PROPS} params={ window.location.href.split("is_new=")[1] } />,
        );
        component = TestUtils.renderIntoDocument(<Uploader params={ window.location.href.split("is_new=")[1] } />);
        renderedDOM = () => ReactDOM.findDOMNode(component);
        file = [{
            name: "ocean.mp4",
            size: 23014356,
            type: "video/mp4",
        }];
    });

    it("should renders without problems", () => {
        expect(component).to.exist;
    });

    it("should renders a <div> with the good amount of class and children", () => {
        const rootElement = renderedDOM();
        expect(rootElement.tagName).to.equal("DIV");
        expect(rootElement.classList.length).to.equal(3);
        expect(rootElement.classList[0]).to.equal("column");
    });

    it("should renders a div which display drop file", () => {
        const renderedDivs = renderedDOM().querySelectorAll("div");

        expect(renderedDOM().children.length).to.equal(1);
        expect(renderedDivs.length).to.equal(3);
        expect(renderedDivs[2].textContent).to.equal("Déposer le(s) fichier(s) ici");
    });

    after(() => {
        dragDrop.unmount();
    });
});
