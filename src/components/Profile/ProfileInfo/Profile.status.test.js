import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus userStatus="super" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("super");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus userStatus="super" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus userStatus="super" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus userStatus="super" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("super");
    });
});