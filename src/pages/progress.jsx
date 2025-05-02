import { Check } from "lucide-react";

const ProgressBar = ({ step }) => {
  const steps = [
    { label: "Create account", icon: "👤" },
    { label: "Set your Interests", icon: "📷" },
    { label: "Test CEFR", icon: "🧠" },
  ];

  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((item, index) => {
        const isActive = step === index;
        const isCompleted = index < step;
        const isUpcoming = index > step;

        return (
          <div className="flex items-center" key={index}>
            {/* Icon + Label */}
            <div className="flex flex-col items-center relative">
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-200 ${
                    isActive
                      ? "bg-yellow-300 border-blue-500"
                      : isCompleted
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-gray-300 border-gray-300 text-gray-500"
                  }`}
                >
                  {item.icon}
                </div>

                {isCompleted && (
                  <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full w-4 h-4 flex items-center justify-center shadow">
                    <Check className="text-green-500 w-3 h-3" strokeWidth={3} />
                  </div>
                )}
              </div>
              <p
                className={`text-xs mt-2 text-center ${
                  isUpcoming ? "text-white opacity-50" : "text-white"
                }`}
              >
                {item.label}
              </p>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="h-0.5 w-16 bg-white/50 mx-2 mb-5"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
