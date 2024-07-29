import { throws } from "node:assert"
import { describe, it } from "node:test"
import { parseScript } from "./parseScript.js"

describe(parseScript.name, () => {
    it("doesn't fail for simple script", () => {
        parseScript(`testing simple
        
        func main() -> Int {
            0
        }`)
    })

    it("doesn't fail for simple script containing literal Real", () => {
        parseScript(`testing lit_real
        
        func main() -> Real {
            0.0
        }`)
    })

    it("throws if top-level function doesn't have return type", () => {
        throws(() => {
            parseScript(
                `testing no_top_return_type
            func main() -> {
                0
            }`
            )
        })
    })

    it("throws if switch case conditions are inconsistent", () => {
        throws(() => {
            parseScript(
                `testing inconsistent_switch
                func main(a: MyEnum1, b: MyEnum2) -> Bool {
                    (a, b).switch{
                        (A, B) => true,
                        (A, B, C) => true,
                        _ => false
                    }
                }`
            )
        })
    })

    it("throws if switch case conditions are inconsistent 2", () => {
        throws(() => {
            parseScript(
                `testing inconsistent_switch
                func main(a: MyEnum1, b: MyEnum2) -> Bool {
                    (a, b).switch{
                        A => true,
                        (A, B) => true,
                        _ => false
                    }
                }`
            )
        })
    })
})
