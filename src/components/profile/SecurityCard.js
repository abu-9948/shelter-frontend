// components/profile/SecurityCard.jsx
import React from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { KeyRound, Loader2 } from 'lucide-react';

const SecurityCard = ({
  isChangingPassword,
  passwords,
  isActionLoading,
  onPasswordChange,
  onPasswordInputChange,
  onCancelPasswordChange,
  onStartPasswordChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isChangingPassword ? (
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Current Password"
              value={passwords.oldPassword}
              onChange={(e) => onPasswordInputChange('oldPassword', e.target.value)}
              disabled={isActionLoading}
            />
            <Input
              type="password"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) => onPasswordInputChange('newPassword', e.target.value)}
              disabled={isActionLoading}
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirmPassword}
              onChange={(e) => onPasswordInputChange('confirmPassword', e.target.value)}
              disabled={isActionLoading}
            />
            <div className="flex gap-4">
              <Button
                onClick={onPasswordChange}
                disabled={isActionLoading}
                className="bg-lime-600 hover:bg-lime-700"
              >
                {isActionLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing...
                  </>
                ) : (
                  <>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
              <Button
                onClick={onCancelPasswordChange}
                variant="outline"
                disabled={isActionLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={onStartPasswordChange}
            className="w-full bg-lime-600 hover:bg-lime-700"
            disabled={isActionLoading}
          >
            <KeyRound className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityCard;