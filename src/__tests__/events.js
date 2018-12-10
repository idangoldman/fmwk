import Events from '../events';
import Element from '../element';

describe('Events class tested', () => {
  let element, events, mockEventFunction;

  beforeAll(() => {
    document.body.innerHTML = `
      <button>Click Me</button>
    `;
  });

  beforeEach(() => {
    element = new Element('button');
    events = new Events(element);
    mockEventFunction = jest.fn();
  });

  test('should trigger a click event', () => {
    events.on('click', mockEventFunction);
    element.raw.click();
    expect(mockEventFunction).toBeCalled();
  });

  test('should remove the click event', () => {
    events.on('click', mockEventFunction);
    events.off('click', mockEventFunction);
    element.raw.click();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should fire 2 events, click and focus', () => {
    events.on('click focus', mockEventFunction);
    element.raw.click();
    element.raw.focus();
    expect(mockEventFunction.mock.calls.length).toBe(2);
  });

  test('should remove 2 events, click and focus', () => {
    events.on('click focus', mockEventFunction);
    events.off('click focus', mockEventFunction);
    element.raw.click();
    element.raw.focus();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should remove event without specifying a callback', () => {
    events.on('click', mockEventFunction);
    events.off('click');
    element.raw.click();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should remove 2 events without specifying a callback', () => {
    events.on('click focus', mockEventFunction);
    events.off('click focus');
    element.raw.click();
    element.raw.focus();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should remove event without specifying a type or callback', () => {
    events.on('click', mockEventFunction);
    events.off();
    element.raw.click();
    element.raw.focus();
    expect(mockEventFunction).not.toBeCalled();
  });

  test('should call click event only once', () => {
    events.once('click', mockEventFunction);
    element.raw.click();
    element.raw.click();
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
