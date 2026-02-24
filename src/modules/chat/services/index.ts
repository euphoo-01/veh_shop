export class WSChat {
  private messageHandler: ((message: string) => void) | undefined;
  private ws: WebSocket | undefined;
  private isReconnecting: boolean = false;
  private reconnectTimer: ReturnType<typeof setTimeout> | undefined;

  setMessageHandler(messageHandler: (message: string) => void) {
    this.messageHandler = messageHandler;
  }

  connect(domain: string): void {
    try {
      this.ws = new WebSocket(domain);

      this.ws.onmessage = (event: MessageEvent) => {
        if (this.messageHandler) {
          this.messageHandler(event.data);
        } else {
          console.warn("No message handler set for incoming WebSocket message");
        }
      };

      this.ws.onerror = (error) => {
        throw error;
      };

      this.ws.onclose = (event) => {
        if (!event.wasClean) {
          this.reconnect(domain);
        }
      };
    } catch (e) {
      let errorMessage: string;
      if (e instanceof Error) {
        errorMessage = e.message;
      } else {
        errorMessage = "Unknown error";
      }
      throw new Error(`Failed to establish WebSocket connection: ${errorMessage}`);
    }
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    if (this.ws) {
      this.ws.onclose = null;
      this.ws.close();
      this.ws = undefined;
    } else {
      throw new Error("WebSocket connection needed to be initialized before disconnecting");
    }
  }

  sendMessage(message: string): void {
    if (this.ws) {
      this.ws.send(message);
    } else {
      throw new Error("WebSocket connection needed to be initialized before sending");
    }
  }

  private reconnect(domain: string) {
    if (this.isReconnecting) {
      return;
    }
    this.isReconnecting = true;

    this.reconnectTimer = setTimeout(() => {
      console.log("Reconnecting to WebSocket chat");
      this.isReconnecting = false;
      this.connect(domain);
    }, 5000);
  }
}
