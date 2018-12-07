import Events from '../events';
import Element from '../element';

describe('Events class tested', () => {
  let element, events, mockEventFunction;

  beforeAll(() => {
    document.body.innerHTML = `
      <button>Click Me</button>
    `;

    const selector = 'button';
    mockEventFunction = jest.fn();
    element = new Element(selector);
    events = new Events(selector, element);
  });

  test('should trigger a click event', () => {
    events.on('click', mockEventFunction);
    element.click();
    expect(mockEventFunction).toBeCalled();
  });

  test('should remove the click event', () => {
    events.off('click', mockEventFunction);
    element.click();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should fire 2 events, click and focus', () => {
    events.on('click focus', mockEventFunction);
    element.click();
    element.focus();
    expect(mockEventFunction.mock.calls.length).toBe(2);
  });

  test('should remove 2 events, click and focus', () => {
    events.off('click focus', mockEventFunction);
    element.click();
    element.focus();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should remove event without specifying a function', () => {
    events.on('click', mockEventFunction);
    events.off('click');
    element.click();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should remove 2 events without specifying a function', () => {
    events.on('click focus', mockEventFunction);
    events.off('click focus');
    element.click();
    element.focus();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should remove event without specifying a type or function', () => {
    events.on('click', mockEventFunction);
    events.off();
    element.click();
    element.focus();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should call click event only once', () => {
    events.once('click', mockEventFunction);
    element.click();
    element.click();
    expect(mockEventFunction.mock.calls.length).toBe(1);
  });

  test('should trigger a click event', () => {
    events.on('click', mockEventFunction);
    events.trigger('click');
    expect(mockEventFunction).toBeCalled();
  });
});

// errors
// events.on('click');
// events.once('click');
// events.trigger('click focus');
