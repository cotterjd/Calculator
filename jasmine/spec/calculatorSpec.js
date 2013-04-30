describe("Calculator", function () {
    it("should be able to add", function () {
        expect(add(1, -1)).toEqual(0);
    });

    it("should be able to divide", function () {
        expect(divide(-5, 1)).toEqual(-5);
    });

    it("should be able to multiply", function () {
        expect(multiply(3, 4)).toEqual(12);
    });

    it("should be able to subtract", function () {
        expect(subtract(-5, -2)).toBe(-3);
    });

    it("should reset values when resetValues is called", function () {
        numberTwo = 2;
        resetValues();
        expect(numberOne).toBe("");
        expect(numberTwo).toBe("");
        expect(numberTracker).toBe(0);
        expect(operation).toBe("");
        expect(lastInput).toBe("");
        expect(beforeLastInput).toBe("");
    });

    it("should change sign when changeSign function is called", function () {
        expect(changeSign(1)).toBe(-1);
    });
});
