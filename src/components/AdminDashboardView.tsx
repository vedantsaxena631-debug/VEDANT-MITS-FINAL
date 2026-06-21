import { motion, AnimatePresence } from 'motion/react';
import { AdminOverview } from './admin/AdminOverview';
import { AdminCRUDs } from './admin/AdminCRUDs';
import { AdminAnalytics } from './admin/AdminAnalytics';
import { AdminOperations } from './admin/AdminOperations';
import { AdminUtilities } from './admin/AdminUtilities';

interface AdminDashboardViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AdminDashboardView({ activeTab, setActiveTab }: AdminDashboardViewProps) {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminOverview setActiveTab={setActiveTab} />;

      // Main Academic Directory CRUDs
      case 'users':
        return <AdminCRUDs activeSection="users" />;
      case 'departments':
        return <AdminCRUDs activeSection="departments" />;

      // Campus Analytics & Dynamic Metrics
      case 'traffic-analytics':
        return <AdminAnalytics activeSection="traffic" />;
      case 'performance-metrics':
        return <AdminAnalytics activeSection="performance" />;

      // Campus and Academic Operations CRUDs
      case 'notices':
        return <AdminOperations activeSection="notices" />;
      case 'academic-calendar':
        return <AdminOperations activeSection="academic-calendar" />;
      case 'exam-scheduling':
        return <AdminOperations activeSection="exam-scheduling" />;
      case 'assignment-control':
        return <AdminOperations activeSection="assignment-control" />;
      case 'fee-management':
        return <AdminOperations activeSection="fee-management" />;
      case 'grievances':
        return <AdminOperations activeSection="grievances" />;

      // Settings and System Utilities
      case 'app-settings':
        return <AdminUtilities activeSection="app-settings" />;
      case 'backup-restore':
        return <AdminUtilities activeSection="backup-restore" />;
      case 'activity-logs':
        return <AdminUtilities activeSection="activity-logs" />;

      default:
        return <AdminOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="w-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
