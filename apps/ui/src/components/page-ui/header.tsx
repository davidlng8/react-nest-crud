import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 px-4 py-2 rounded-lg">
            <FontAwesomeIcon icon={faUser} className="text-3xl" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Live Contacts
            </h1>
            <p className="text-sm text-gray-500">
              Real-time contact management
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
