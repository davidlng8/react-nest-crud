import type { ContactHistoryProps } from "@/types/contacts";
import { Modal } from "@/components/page-ui/modal";
import { humanReadableJoin } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const ContactHistory = ({
  isOpen,
  onClose,
  history,
  contactName,
}: ContactHistoryProps) => {
  const headerArray = ["Update History"];
  if (contactName.length > 0) headerArray.push(contactName);
  if (!isOpen) return null;

  console.log(history);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/** close modal button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-center">
          {headerArray.join(" - ")}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          X{" "}
        </button>
      </div>
      <div className="overflow-y-auto max-h-[60vh]">
        {history.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No changes recorded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((change, index) => (
              <div
                key={`${change.when}-${index}`}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-gray-900 capitalize">
                    Updated fields:{" "}
                    <span className="text-slate-600 font-bold text-sm">
                      {humanReadableJoin(change.updatedFields)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(change.when), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ContactHistory;
