const event = {
    list: new Map(),
    on(eventType:any, eventAction:any) {
      this.list.has(eventType) || this.list.set(eventType, []);
      if (this.list.get(eventType)) this.list.get(eventType).push(eventAction);
      return this;
    },
  
    emit(eventType:any, ...args:any) {
      this.list.get(eventType) &&
        this.list.get(eventType).forEach((cb:any) => {
          cb(...args);
        });
    }
  };


  export default event;