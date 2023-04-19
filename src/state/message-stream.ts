export type MessageCallback = (message: string) => void;
export type ErrorCallback = (err: any) => void;
export type CloseCallback = () => void;

export abstract class MessageStream {
  callbacks: {
    message: MessageCallback[];
  };

  constructor() {
    this.callbacks = { message: [] };
  }

  on(event: 'message', callback: (message: string) => void): MessageStream {
    this.callbacks[event].push(callback);

    return this;
  }

  receiveMessage(message: string) {
    this.callbacks['message'] = this.callbacks['message'] || [];
    this.callbacks['message'].forEach((callback) => callback(message));
  }

  abstract connect(): void;
  abstract disconnect(): void;
  abstract isRunning(): boolean;
  abstract send(message: string): void;
}
