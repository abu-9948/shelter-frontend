import React from 'react';

const ProfileHeader = ({ profile }) => {
  return (
    <div className="bg-[#6366F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="py-4 flex items-center space-x-6">
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center border-4 border-white">
            <span className="font-semibold text-[#6366F1] text-4xl">
              {profile.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-white">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;