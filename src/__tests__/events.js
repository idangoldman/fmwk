import Events from '../events';
import Element from '../element';

describe('Events class tested', () => {
  let element, events, mockEventFunction;

  beforeAll(() => {
    document.body.innerHTML = '<button></button>';

    mockEventFunction = jest.fn();
    element = new Element('button');
    events = new Events(element);
  });

  test('should fire an onClick event', () => {
    events.on('click', mockEventFunction);
    element.click();
    expect(mockEventFunction).toBeCalled();
  });

  test('should remove the onClick event', () => {
    events.off('click', mockEventFunction);
    element.click();
    expect(mockEventFunction).not.toBeCalled();
  });
});

// events.on('click');
// events.on('click focus', mockEventFunction);
// events.on('focus', mockEventFunction)
// events.off('click focus', mockEventFunction);
// events.off('click focus');
// events.off('focus');
// events.off();
// events.trigger('click');
// events.trigger('click focus');
// events.once('click');
// events.once('click', mockEventFunction);
