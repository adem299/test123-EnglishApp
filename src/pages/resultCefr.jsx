import { useLocation } from 'react-router-dom';

const ResultCefrPage = () => {
  const location = useLocation();
  const { cefrLevel } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">Your CEFR Analysis</h2>
        <div className="flex items-center justify-between gap-x-5">
          {/* General Level Box */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md p-6 w-1/3">
            <p className="text-gray-600 font-medium">General level</p>
            <p className="text-blue-500 text-4xl font-bold mt-2">{cefrLevel ? cefrLevel : 'No data available'}</p>
          </div>
          {/* Analysis Text Box */}
          <div className="bg-gray-50 rounded-lg shadow-md p-6 w-2/3">
            <p className="text-gray-700 text-sm mb-2">Your vocabulary includes common words in everyday life. You also show an initial understanding of simple grammatical structures.</p>
            <p className="text-gray-700 text-sm">Let’s learn more with us 🙌</p>
          </div>
        </div>
        {/* Button */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => (window.location.href = '/home')}>
            Let’s Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCefrPage;
