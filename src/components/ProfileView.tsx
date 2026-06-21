import { User, Mail, Phone, MapPin, Camera, Shield, Save } from 'lucide-react';
import { studentData } from '../data';

export function ProfileView() {
  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Profile & Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Update contact information, emergency contacts, and account security.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
          {/* Cover background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-slate-900 z-0"></div>

          <div className="relative z-10 pt-16 flex flex-col items-center">
            <div className="h-32 w-32 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white shadow-sm flex items-center justify-center relative overflow-hidden text-5xl font-sans font-bold text-slate-300">
              {studentData.firstName[0]}{studentData.lastName[0]}
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white">
                <Camera className="h-8 w-8" />
              </button>
            </div>
          </div>

          <div className="relative z-10 pt-24 md:pt-32 flex-1 w-full space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{studentData.firstName} {studentData.lastName}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-sm mt-1">{studentData.enrollmentNo}</p>
              <div className="flex gap-2 mt-3">
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded">{studentData.branch}</span>
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded">Sem {studentData.semester}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><User className="h-4 w-4"/> Personal Details</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Email</label>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md">
                    <Mail className="h-4 w-4 text-slate-400" /> {studentData.email}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Phone</label>
                  <input type="text" defaultValue="+91 98765 43210" className="w-full text-sm font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><Shield className="h-4 w-4"/> Emergency Contact</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Parents/Guardian Phone</label>
                  <input type="text" defaultValue="+91 91234 56789" className="w-full text-sm font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Home Address</label>
                  <textarea rows={2} defaultValue="123, Model Town, Delhi, 110009" className="w-full text-sm font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"></textarea>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 transition-colors">Discard</button>
              <button className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
