interface IEvent {
  img?: string;
  licensePlateNo?: string;
  duration?: string;
}

type ApiDataType = {
  events: IEvent[];
};
