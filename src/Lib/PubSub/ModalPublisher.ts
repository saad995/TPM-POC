import Event from './Event'

const ModalPublisher = {
    message: (title:string, content:any) => {
        Event.emit("showModal", title, content);
    },
    clearAllMessage: () => {
        Event.emit("clearAllMessage");
    }
  };

  export default ModalPublisher;
  