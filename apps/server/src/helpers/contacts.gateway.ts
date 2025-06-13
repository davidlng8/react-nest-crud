import { BroadCastEvents } from "@/definitions/contacts/contact";
import { Contact } from "@/entities/contact.entity";
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*", // TODO: Centralize and use across main.ts as well
  },
})
export class ContactsGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server!: Server;
  private totalConnections = 0;

  afterInit(server: Server) {
    // Explicitly assign the server after initialization
    console.log({ status: "server init", initComplete: Boolean(server) });
    this.server = server;
  }

  handleConnection(client: Socket) {
    console.log({
      staus: "Client Connected",
      totalConnections: ++this.totalConnections,
      isSecure: client.handshake?.secure,
    });
  }

  broadcastEvent(type: BroadCastEvents, contact: Contact) {
    if (!this.server) {
      console.error("Server was not auto defined");
      return;
    }
    try {
      switch (type) {
        case BroadCastEvents.DELETE_CONTACT:
          this.server.emit(type, contact.contactId);
          break;
        default:
          this.server.emit(type, contact);
      }
      console.log("Successfully broadcasted event", type);
    } catch (e) {
      console.error({ status: "failed", type, contact });
    }
  }
}
