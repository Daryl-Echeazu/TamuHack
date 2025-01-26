import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, X, Check, Clock, Medal, Dumbbell, Activity } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type NotificationType = 'achievement' | 'workout' | 'reminder' | 'progress';

const iconMap = {
  achievement: Medal,
  workout: Dumbbell,
  reminder: Clock,
  progress: Activity
} as const;

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: string;
}

const NotificationItem = ({ notification, onDismiss }: { notification: Notification; onDismiss: (id: number) => void }) => {
  const IconComponent = iconMap[notification.type] || Bell;
  
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="mt-1">
        <IconComponent className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{notification.title}</p>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => onDismiss(notification.id)}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatTimestamp(notification.timestamp)}</span>
        </div>
        {notification.action && (
          <div className="mt-2">
            <Button variant="outline" size="sm" className="w-full">
              {notification.action}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, this would be an API call
      const response = await mockFetchNotifications();
      setNotifications(response);
      setUnreadCount(response.filter(n => !n.read).length);
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Set up polling for new notifications
    const pollInterval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(pollInterval);
  }, []);

interface DismissHandler {
    (id: number): Promise<void>;
}

const handleDismiss: DismissHandler = async (id) => {
        try {
            // In a real app, this would be an API call
            await mockDismissNotification(id);
            setNotifications(prev => prev.filter(n => n.id !== id));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error('Error dismissing notification:', err);
        }
    };

  const markAllAsRead = async () => {
    try {
      // In a real app, this would be an API call
      await mockMarkAllAsRead();
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96" align="end">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[400px] py-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center p-4 text-sm text-muted-foreground">
              {error}
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2"
                onClick={fetchNotifications}
              >
                Try again
              </Button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center p-4 text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onDismiss={handleDismiss}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};



const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff: number = now.getTime() - date.getTime();
    
    const minutes: number = Math.floor(diff / 60000);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
};

// Mock API functions (replace with real API calls)
const mockFetchNotifications = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      type: 'achievement' as NotificationType,
      title: 'New Achievement Unlocked!',
      message: 'Congratulations! You\'ve completed 10 workouts this month.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false,
      action: 'View Achievement'
    },
    {
      id: 2,
      type: 'workout' as NotificationType,
      title: 'Workout Reminder',
      message: 'Don\'t forget your scheduled leg day workout today!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: false,
      action: 'Start Workout'
    },
    {
      id: 3,
      type: 'progress' as NotificationType,
      title: 'Weekly Progress Update',
      message: 'You\'ve increased your bench press by 10 lbs this week!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: true,
      action: 'View Progress'
    },
    {
      id: 4,
      type: 'reminder' as NotificationType,
      title: 'Update Your Goals',
      message: 'It\'s time to review and update your fitness goals for the month.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
      action: 'Update Goals'
    }
  ];
};

interface DismissNotificationResult {
    success: boolean;
}

const mockDismissNotification = async (id: number): Promise<DismissNotificationResult> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log(`Dismissing notification with ID: ${id}`);
    return { success: true };
};

const mockMarkAllAsRead = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return true;
};

export default NotificationSystem;