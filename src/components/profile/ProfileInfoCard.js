// components/profile/ProfileInfoCard.jsx
import React from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Mail, Phone, Shield, Edit, Loader2 } from 'lucide-react';

const ProfileInfoCard = ({ 
  profile, 
  isEditing, 
  editedProfile, 
  isActionLoading, 
  onEdit, 
  onCancel, 
  onSave, 
  onEditChange 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Profile Details</CardTitle>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            disabled={isActionLoading}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={editedProfile.name}
                onChange={(e) => onEditChange('name', e.target.value)}
                disabled={isActionLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={editedProfile.phone}
                onChange={(e) => onEditChange('phone', e.target.value)}
                disabled={isActionLoading}
              />
            </div>
            <div className="flex gap-4">
              <Button
                onClick={onSave}
                disabled={isActionLoading}
                className="bg-lime-600 hover:bg-lime-700"
              >
                {isActionLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Changes'}
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                disabled={isActionLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Shield className="h-4 w-4 text-gray-500" />
              <span>{profile.role}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;