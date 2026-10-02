import { useEffect, useState } from "react";
import {
  Clock,
  Trash2,
} from "lucide-react";

import {
  getSearchHistory,
} from "../services/musicApi";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getSearchHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto">

      <p className="text-blue-500 font-medium text-sm">
        HISTORY
      </p>

      <h1 className="
        text-2xl
        sm:text-3xl
        lg:text-4xl
        font-bold
        mt-2
      ">
        Search History 🕘
      </h1>

      <p className="text-gray-400 text-sm sm:text-base mt-2">
        Your recently searched artists and songs.
      </p>

      {/* Loading */}
      {loading && (
        <p className="text-blue-400 mt-8">
          Loading history...
        </p>
      )}

      {/* Empty */}
      {!loading && history.length === 0 && (
        <div className="
          mt-8
          bg-[#0b0f19]
          border border-blue-500/10
          rounded-2xl
          p-6
          sm:p-8
        ">
          <p className="text-gray-400">
            No search history yet.
          </p>
        </div>
      )}

      {/* History */}
      {!loading && history.length > 0 && (
        <div className="mt-8 space-y-3">

          {history.map((item) => (
            <div
              key={item._id}
              className="
                flex
                items-center
                gap-3
                sm:gap-4
                bg-[#0b0f19]
                border border-blue-500/10
                rounded-xl
                p-3
                sm:p-4
              "
            >

              <div className="
                shrink-0
                bg-blue-600/10
                p-2.5
                sm:p-3
                rounded-lg
              ">
                <Clock
                  size={19}
                  className="text-blue-500"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="
                  font-medium
                  text-sm
                  sm:text-base
                  truncate
                ">
                  {item.query}
                </p>

                <p className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                  mt-1
                ">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                className="
                  shrink-0
                  text-gray-600
                  hover:text-red-400
                  transition
                "
              >
                <Trash2 size={18} />
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default History;