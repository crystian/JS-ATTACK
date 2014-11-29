describe("Exercise 1", function() {
//  beforeEach(function() {
//    player = new Player();
//    song = new Song();
//  });

  it("should be defined", function(){
    expect(exercise1).toBeDefined();
  });

  it("should return 1", function() {
    expect(exercise1({ prop: 2 })).toBe(1);
  });

  it("should not be 2", function() {
    expect(exercise1({ prop: 2 })).not.toBe(2);
  });

  it("should not count foreign keys", function() {
    String.prototype.foreignProp = 'a';

    expect(exercise1("")).toBe(0);
  });
});
