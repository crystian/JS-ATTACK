describe("Exercise 1", function() {
//  beforeEach(function() {
//    player = new Player();
//    song = new Song();
//  });

  it("foo function should be defined", function(){
    expect(foo).toBeDefined();
  });

  it("Should return 1", function() {
    expect(foo()).toBe(1);
  });

  it("should indicate that the song is currently paused", function() {
    expect(foo()).not.toBe(2);
  });
});
