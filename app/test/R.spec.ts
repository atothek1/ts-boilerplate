import {suite, test} from "mocha-typescript";
import {expect} from "chai";
import {Test} from "./base/Test";
import R from "../src/R";

@suite
export class RTest extends Test {
    @test
    public testR() {
        expect(R).not.to.be.undefined;
        expect(R).to.have.deep.property("Environment");
        expect(R.Environment).not.to.undefined;
    }
}