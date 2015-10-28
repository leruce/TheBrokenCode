var value = element(by.binding('example.value'));

it('should initialize to model', function () {
     expect(valid.getText()).toContain('true');
});

it('should be invalid if empty', function () {
     input.clear();
     input.sendKeys('');
     expect(value.getText()).toEqual('value =');
     expect(valid.getText()).toContain('false');
});

it('should be invalid if over max', function () {
     input.clear();
     input.sendKeys('15');
     expect(value.getText()).toEqual('value =');
     expect(valid.getText()).toContain('false');
});