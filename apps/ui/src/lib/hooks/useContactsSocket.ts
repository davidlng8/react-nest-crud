import { BroadCastEvents, type Contact } from "@/types/contacts";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import webSocket from "../web-socket";
import toast from "react-hot-toast";
import {
  recentlyCreatedTracker,
  recentlyDeletedTracker,
  recentlyUpdatedTracker,
} from "../contactId.tracker";

export function useContactsSocket(
  setContacts: Dispatch<SetStateAction<Contact[]>>
) {
  useEffect(() => {
    const delayedToast = async ({
      message,
      func,
    }: {
      message: string;
      func: () => void;
    }) => {
      const syncPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          func();
          resolve();
        }, 1500);
      });

      await toast.promise(syncPromise, {
        loading: "Syncing contacts...",
        success: message,
        error: "Failed to sync contact",
      });
    };

    const createHandler = async (contact: Contact) => {
      const { contactId = "" } = contact;
      if (recentlyCreatedTracker.has(contactId)) return;

      delayedToast({
        message: "New contact added!",
        func: () => setContacts((prev) => [...prev, contact]),
      });
    };

    const updateHandler = async (contact: Contact) => {
      const { contactId = "" } = contact;
      if (recentlyUpdatedTracker.has(contactId)) return;

      delayedToast({
        message: "Contact updated!",
        func: () =>
          setContacts((prev) =>
            prev.map((c) => (c.contactId === contactId ? contact : c))
          ),
      });
    };

    const deleteHandler = async (contactId: string) => {
      if (recentlyDeletedTracker.has(contactId)) return;

      delayedToast({
        message: "Contact removed!",
        func: () =>
          setContacts((prev) => prev.filter((c) => c.contactId !== contactId)),
      });
    };

    webSocket.on(BroadCastEvents.CREATE_CONTACT, createHandler);
    webSocket.on(BroadCastEvents.UPDATE_CONTACT, updateHandler);
    webSocket.on(BroadCastEvents.DELETE_CONTACT, deleteHandler);

    return () => {
      webSocket.off(BroadCastEvents.CREATE_CONTACT, createHandler);
      webSocket.off(BroadCastEvents.UPDATE_CONTACT, updateHandler);
      webSocket.off(BroadCastEvents.DELETE_CONTACT, deleteHandler);
    };
  }, [setContacts]);
}
