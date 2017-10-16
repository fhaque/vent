import _ from 'underscore';
import service from '../scripts/service';

describe('service', () => {

  it('should create a new message', () => {
    const msg = service.newMessage();

    expect( msg.hasOwnProperty('msg') ).toBe(true);
    expect( msg.hasOwnProperty('sentiment') ).toBe(true);
    expect( msg.hasOwnProperty('date') ).toBe(true);
    expect( typeof(msg['date']) ).toBe('number');

  });

  it('should get messages', async () => {
    const msg = service.newMessage();
    const text = "Hello!!!";

    expect.assertions(1);
    const data = await service.getMessages();
    expect(data instanceof Array).toBe(true);

  });

  it('should add message', async () => {
    const msg = service.newMessage();
    const text = "Hello!!!";
    msg.msg = text;

    expect.assertions(2);
    let data = await service.addMessage(msg);
    expect(data).toBe(true);

    data = await service.getMessages();

    const query = _.where(data, {msgid: msg.msgid});

    expect( query.length ).toBe(1);

  });

  

}); 