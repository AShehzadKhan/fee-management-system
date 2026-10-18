const StudentProfileInfo = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 lg:p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 lg:w-11 lg:h-11 shrink-0 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon size={18} className="text-blue-600 lg:w-5 lg:h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-sm lg:text-base font-medium text-gray-900 mt-1 lg:mt-1.5 wrap-break-word">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileInfo;
