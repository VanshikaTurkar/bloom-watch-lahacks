// src/components/Legend.js
const Legend = () => {
    return (
      <div className="bg-white p-4 shadow-md rounded-md w-full max-w-xs">
        <h4 className="text-xl font-bold mb-4">Legend</h4>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span
              className="inline-block w-6 h-6 mr-2"
              style={{ backgroundColor: 'green' }}
            ></span>
            Green Zone
          </li>
          <li className="flex items-center">
            <span
              className="inline-block w-6 h-6 mr-2"
              style={{ backgroundColor: 'yellow' }}
            ></span>
            Yellow Zone
          </li>
          <li className="flex items-center">
            <span
              className="inline-block w-6 h-6 mr-2"
              style={{ backgroundColor: 'red' }}
            ></span>
            Red Zone
          </li>
        </ul>
      </div>
    );
  };
  
  export default Legend;
  