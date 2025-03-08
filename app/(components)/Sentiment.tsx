import { useRef } from "react";
import { ChevronRight } from "lucide-react";

export default function Sentiment() {
  const scrollRef = useRef<HTMLDivElement>(null);

 
  const scrollRight = () => {

    if (scrollRef.current) {
      scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-700">Sentiment</h2>
      <p className="text-gray-500 mb-4 flex items-center">
        <span className="font-medium">Key Events</span>
        <span className="ml-2 text-gray-400">ℹ️</span>
      </p>

      <div className="relative">

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar"
        >
      
          <div className="min-w-[320px] bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <div className="bg-blue-500 text-white p-2 rounded-full">
                📘
              </div>
              <h3 className="text-sm font-semibold text-gray-700">
                Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.
              </h3>
            </div>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est
              faucibus metus quis. Amet sapien quam viverra adipiscing
              condimentum...
            </p>
          </div>

       
          <div className="min-w-[320px] bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center space-x-2 mb-2">
              <div className="bg-green-500 text-white p-2 rounded-full">
                📈
              </div>
              <h3 className="text-sm font-semibold text-gray-700">
                Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.
              </h3>
            </div>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est
              faucibus metus quis. Amet sapien quam viverra adipiscing
              condimentum...
            </p>
          </div>
        </div>

    
        <button
          onClick={scrollRight}
          className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
