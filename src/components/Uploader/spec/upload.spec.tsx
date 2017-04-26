// Pour enlever les erreurs concernant Chai (expect.to....)
// tslint:disable:no-unused-expression
// tslint:disable:import-spacing
import * as React           from "react";
import * as ReactDOM        from "react-dom";
import { expect, assert }   from "chai";
import { stub, spy }        from "sinon";
import * as mocha           from "mocha";
import {
    mount,
    shallow,
    ReactWrapper,
}   from "enzyme";

import * as path            from "path";
import * as TestUtils       from "react-addons-test-utils";
import Uploader             from "../../../layouts/Uploader";
import * as Actions         from "../../../actions/UploadActions";
import Store                from "../../../stores/UploaderStore";
import DragDrop              from "../DragDrop";
import Message              from "../Message";
import ConfirmForm          from "../Confirmation";
import Form                 from "../Form";
import { IMessages }        from "../../../interfaces/interfaces";
// tslint:enable:import-spacing

describe("Upload page", () => {
    let file: any;
    let component: any;
    // tslint:disable-next-line:ban-types
    let renderedDOM: Function;
    let dragDrop: ReactWrapper<any, {}>;

    before(() => {
        dragDrop = mount(
            <Uploader params={ window.location.href.split("is_new=")[1] } />,
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
        expect(renderedDivs.length).to.equal(4);
        expect(renderedDivs[2].textContent).to.equal("Déposer le(s) fichier(s) ici");
    });

    /*it("should send an upload request with empty files", () => {
        const files: File[] = [new File([], "fihier1"), new File([], "fichier2")];
        Actions.upload(files);
        expect(renderedDOM().children.length).to.equal(1);
        expect(renderedDOM().children[0].tagName).to.equal("DIV");
    });*/

    after(() => {
        dragDrop.unmount();
    });
});

describe("DragDrop part", () => {
    let component: any;
    // tslint:disable-next-line:ban-types
    let renderedDOM: Function;
    let mess: ReactWrapper<any, {}>;

    before(() => {
        mess = mount(
            <DragDrop />,
        );
        component = TestUtils.renderIntoDocument(<DragDrop />);
        renderedDOM = () => ReactDOM.findDOMNode(component);
    });

    it("should renders without problems", () => {
        expect(component).to.exist;
    });

    it("should renders a <div> with the good amount of class and children", () => {
        const rootElement = renderedDOM();
        expect(rootElement.tagName).to.equal("DIV");
    });

    it("should renders a div which display drop file", () => {
        const renderedDivs = renderedDOM().querySelectorAll("div");

        expect(renderedDOM().children.length).to.equal(1);
        expect(renderedDivs.length).to.equal(3);
        expect(renderedDivs[1].textContent).to.equal("Déposer le(s) fichier(s) ici");
    });

    after(() => {
        mess.unmount();
    });
});

describe("Message part", () => {
    const message: IMessages = {
        isError: true,
        message: "Ceci est un message d'erreur !",
    };

    let component: any;
    // tslint:disable-next-line:ban-types
    let renderedDOM: Function;
    let mess: ReactWrapper<any, {}>;

    before(() => {
        mess = mount(
            <Message message={message} />,
        );
        component = TestUtils.renderIntoDocument(<Message message={message} />);
        renderedDOM = () => ReactDOM.findDOMNode(component);
    });

    it("should renders without problems", () => {
        expect(component).to.exist;
    });

    it("should renders a <div> with the good amount of class and children", () => {
        const rootElement = renderedDOM();
        expect(rootElement.tagName).to.equal("DIV");
        expect(rootElement.classList.length).to.equal(1);
        expect(rootElement.textContent).to.equal(message.message);
    });

    after(() => {
        mess.unmount();
    });
});

describe("Form part", () => {
    let component: any;
    // tslint:disable-next-line:ban-types
    let renderedDOM: Function;
    let form: ReactWrapper<any, {}>;

    before(() => {
        form = mount(
            <Form />,
        );
        component = TestUtils.renderIntoDocument(<Form />);
        renderedDOM = () => ReactDOM.findDOMNode(component);
    });

    it("should renders without problems", () => {
        expect(component).to.exist;
    });

    it("should renders a <div> with the good amount of class and children", () => {
        const rootElement = renderedDOM();
        expect(rootElement.tagName).to.equal("DIV");
        expect(rootElement.children.length).to.equal(2);
    });

    after(() => {
        form.unmount();
    });
});

describe("Confirmation form part", () => {
    let component: any;
    // tslint:disable-next-line:ban-types
    let renderedDOM: Function;
    let confForm: ReactWrapper<any, {}>;

    before(() => {
        confForm = mount(
            <ConfirmForm />,
        );
        component = TestUtils.renderIntoDocument(<ConfirmForm />);
        renderedDOM = () => ReactDOM.findDOMNode(component);
    });

    it("should renders without problems", () => {
        expect(component).to.exist;
    });

    it("should renders a <div> with the good amount of class and children", () => {
        const rootElement = renderedDOM();
        expect(rootElement.tagName).to.equal("DIV");
        expect(rootElement.children.length).to.equal(2);
        expect(rootElement.textContent).to.contain("Êtes-vous sûr de vouloir terminer l\'analyse ?AnnulerTerminer");
    });

    after(() => {
        confForm.unmount();
    });
});
