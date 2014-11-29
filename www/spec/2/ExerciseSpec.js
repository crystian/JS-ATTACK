describe('Exercise 2', function() {
//  beforeEach(function() {
//    player = new Player();
//    song = new Song();
//  });

  it('should be defined', function(){
    expect(exercise2).toBeDefined();
  });

  it('should return "supercalifragilisticoespialidoso"', function() {
    var arr = ['t', 'tiny', 'supercalifragilisticoespialidoso', 3];
    var result = 'supercalifragilisticoespialidoso';
    expect(exercise2(arr)).toBe(result);
  });

  it('should discriminate by Type', function() {
    var arr = [['a', 'b', 'c', 'd', 'f'], 'tiny', 'app'];
    var result = 'tiny';
    var run = exercise2(arr);
    expect(run).not.toEqual(jasmine.any(Array));
    expect(exercise2(arr)).toBe(result);
  });

  it('should return empty string if array is empty', function() {
    expect(exercise2([])).toBe('');
  });
});
