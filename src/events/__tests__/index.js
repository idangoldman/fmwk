import Events from 'events';
import Element from 'element';

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

  test('Should trigger a click event', () => {
    events.on('click', mockEventFunction);
    element.instance.click();
    expect(mockEventFunction).toHaveBeenCalled();
  });

  test('Should remove a click event', () => {
    events.on('click', mockEventFunction);
    events.off('click', mockEventFunction);
    element.instance.click();
    expect(mockEventFunction).not.toHaveBeenCalled();
  });

  test('Should trigger 2 events, click and focus', () => {
    events.on('click focus', mockEventFunction);
    element.instance.click();
    element.instance.focus();
    expect(mockEventFunction).toHaveBeenCalledTimes(2);
  });

  test('Should remove 2 events, click and focus', () => {
    events.on('click focus', mockEventFunction);
    events.off('click focus', mockEventFunction);
    element.instance.click();
    element.instance.focus();
    expect(mockEventFunction).not.toHaveBeenCalled();
  });

  test('Should remove event without specifying a callback', () => {
    events.on('click', mockEventFunction);
    events.off('click');
    element.instance.click();
    expect(mockEventFunction).not.toHaveBeenCalled();
  });

  test('Should remove 2 events without specifying a callback', () => {
    events.on('click focus', mockEventFunction);
    events.off('click focus');
    element.instance.click();
    element.instance.focus();
    expect(mockEventFunction).not.toHaveBeenCalled();
  });

  test('Should remove event without specifying a type or callback', () => {
    events.on('click', mockEventFunction);
    events.off();
    element.instance.click();
    element.instance.focus();
    expect(mockEventFunction).not.toHaveBeenCalled();
  });

  test('Should call click event only once', () => {
    events.once('click', mockEventFunction);
    element.instance.click();
    element.instance.click();
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should throw an error, dom event not found', () => {
    const eventNotFound = () => events.once('clicked', mockEventFunction);
    expect(eventNotFound).toThrowErrorMatchingSnapshot();
  });
});

// events.on('keypress:esc', callback);
