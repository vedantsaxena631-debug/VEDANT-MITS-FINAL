import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, Trash2, Edit, ChevronDown, Check, X, Download, UserPlus, Layers, ShieldCheck, Mail, Building, Users } from 'lucide-react';

interface CRUDsProps {
  activeSection: 'users' | 'departments';
}

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty';
  dept: string;
  status: 'Active' | 'Suspended';
}

interface DepartmentRecord {
  id: string;
  name: string;
  code: string;
  hod: string;
  staff: number;
  intake: number;
  building: string;
}

export function AdminCRUDs({ activeSection }: CRUDsProps) {
  // === USER MANAGEMENT STATE ===
  const [userList, setUserList] = useState<UserRecord[]>([
    { id: 'MITS-CS-22-045', name: 'Vedant Saxena', email: 'vedantsaxena@mits.ac', role: 'student', dept: 'Computer Science', status: 'Active' },
    { id: 'MITS-CS-22-102', name: 'Priya Sharma', email: 'priyasharma@mits.ac', role: 'student', dept: 'Computer Science', status: 'Active' },
    { id: 'MITS-EC-23-018', name: 'Amit Patel', email: 'amitpatel@mits.ac', role: 'student', dept: 'Electronics', status: 'Suspended' },
    { id: 'MITS-FAC-102', name: 'Dr. Sarah Smith', email: 'sarahsmith@mits.ac', role: 'faculty', dept: 'Computer Science', status: 'Active' },
    { id: 'MITS-FAC-118', name: 'Dr. Robert Johnson', email: 'robertjohnson@mits.ac', role: 'faculty', dept: 'Mechanical', status: 'Active' },
    { id: 'MITS-CS-22-192', name: 'Tushar Verma', email: 'tusharv@mits.ac', role: 'student', dept: 'Civil', status: 'Active' },
  ]);

  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'student' | 'faculty'>('all');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'Active' | 'Suspended'>('all');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);

  // New User Form State
  const [newUser, setNewUser] = useState({
    id: '',
    name: '',
    email: '',
    role: 'student' as 'student' | 'faculty',
    dept: 'Computer Science',
    status: 'Active' as 'Active' | 'Suspended'
  });

  // === DEPARTMENT MANAGEMENT STATE ===
  const [deptList, setDeptList] = useState<DepartmentRecord[]>([
    { id: 'D01', name: 'Computer Science & Engineering', code: 'CSE', hod: 'Dr. Sarah Smith', staff: 28, intake: 180, building: 'Block A' },
    { id: 'D02', name: 'Electronics & Communication', code: 'ECE', hod: 'Dr. Rajesh Gupta', staff: 18, intake: 120, building: 'Block B' },
    { id: 'D03', name: 'Mechanical Engineering', code: 'ME', hod: 'Dr. Robert Johnson', staff: 15, intake: 90, building: 'Block C' },
    { id: 'D04', name: 'Civil Engineering', code: 'CE', hod: 'Dr. Ramesh Khanna', staff: 12, intake: 60, building: 'Block D' },
  ]);

  const [deptSearch, setDeptSearch] = useState('');
  const [selectedDeptIds, setSelectedDeptIds] = useState<string[]>([]);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [editingDept, setEditingDept] = useState<DepartmentRecord | null>(null);

  // New Department Form State
  const [newDept, setNewDept] = useState({
    id: '',
    name: '',
    code: '',
    hod: '',
    staff: 15,
    intake: 90,
    building: 'Block A'
  });

  // === HANDLERS FOR USERS ===
  const handleAddNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.id || !newUser.name || !newUser.email) {
      alert('Please fill all required fields');
      return;
    }
    setUserList([newUser, ...userList]);
    setNewUser({
      id: '',
      name: '',
      email: '',
      role: 'student',
      dept: 'Computer Science',
      status: 'Active'
    });
    setShowAddUserModal(false);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUserList(userList.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
  };

  const handleDeleteUser = (id: string) => {
    setUserList(userList.filter(u => u.id !== id));
    setSelectedUserIds(selectedUserIds.filter(x => x !== id));
  };

  const handleBulkToggleUserStatus = () => {
    if (selectedUserIds.length === 0) return;
    setUserList(userList.map(u => {
      if (selectedUserIds.includes(u.id)) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
  };

  const handleBulkDeleteUsers = () => {
    if (selectedUserIds.length === 0) return;
    setUserList(userList.filter(u => !selectedUserIds.includes(u.id)));
    setSelectedUserIds([]);
  };

  const handleSelectUser = (id: string) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter(x => x !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  const handleSelectAllUsers = (filteredUsers: UserRecord[]) => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map(u => u.id));
    }
  };

  const exportUsersToCSV = (filteredUsers: UserRecord[]) => {
    const headers = ['ID/Enrollment', 'Name', 'Email', 'Role', 'Department', 'Status'];
    const rows = filteredUsers.map(u => [u.id, u.name, u.email, u.role, u.dept, u.status]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mits_users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // === HANDLERS FOR DEPARTMENTS ===
  const handleAddNewDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDept.id || !newDept.name || !newDept.code) {
      alert('Please fill all required fields');
      return;
    }
    setDeptList([newDept, ...deptList]);
    setNewDept({
      id: '',
      name: '',
      code: '',
      hod: '',
      staff: 15,
      intake: 90,
      building: 'Block A'
    });
    setShowAddDeptModal(false);
  };

  const handleUpdateDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;
    setDeptList(deptList.map(d => d.id === editingDept.id ? editingDept : d));
    setEditingDept(null);
  };

  const handleDeleteDept = (id: string) => {
    setDeptList(deptList.filter(d => d.id !== id));
    setSelectedDeptIds(selectedDeptIds.filter(x => x !== id));
  };

  const handleBulkDeleteDepts = () => {
    if (selectedDeptIds.length === 0) return;
    setDeptList(deptList.filter(d => !selectedDeptIds.includes(d.id)));
    setSelectedDeptIds([]);
  };

  const handleSelectDept = (id: string) => {
    if (selectedDeptIds.includes(id)) {
      setSelectedDeptIds(selectedDeptIds.filter(x => x !== id));
    } else {
      setSelectedDeptIds([...selectedDeptIds, id]);
    }
  };

  const handleSelectAllDepts = (filteredDepts: DepartmentRecord[]) => {
    if (selectedDeptIds.length === filteredDepts.length) {
      setSelectedDeptIds([]);
    } else {
      setSelectedDeptIds(filteredDepts.map(d => d.id));
    }
  };

  const exportDeptsToCSV = (filteredDepts: DepartmentRecord[]) => {
    const headers = ['ID', 'Department Name', 'Code', 'Head of Dept', 'Staff Count', 'Student Intake', 'Building Location'];
    const rows = filteredDepts.map(d => [d.id, d.name, d.code, d.hod, d.staff, d.intake, d.building]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mits_departments_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // === FILTER CALCULATIONS ===
  const filteredUsers = userList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.id.toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchesStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredDepts = deptList.filter(d => {
    return d.name.toLowerCase().includes(deptSearch.toLowerCase()) ||
           d.code.toLowerCase().includes(deptSearch.toLowerCase()) ||
           d.hod.toLowerCase().includes(deptSearch.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {activeSection === 'users' ? (
        // ================= USER MANAGEMENT DASHBOARD =================
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Academic Directory (Users)</h2>
              <p className="text-xs text-slate-400 mt-1">Enroll students, configure faculty assignments, and control permissions</p>
            </div>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors shadow-lg shadow-indigo-600/10"
            >
              <UserPlus className="h-4 w-4" />
              Add Portal User
            </button>
          </div>

          {/* Search, filters, bulk actions */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search user, ID, email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 hover:border-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
              {/* Role filter */}
              <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-white/5 text-[11px]">
                <span className="text-slate-500">Role:</span>
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value as any)}
                  className="bg-transparent border-0 outline-none text-slate-200 cursor-pointer"
                >
                  <option value="all" className="bg-slate-950">All</option>
                  <option value="student" className="bg-slate-950">Student</option>
                  <option value="faculty" className="bg-slate-950">Faculty</option>
                </select>
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-white/5 text-[11px]">
                <span className="text-slate-500">Status:</span>
                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value as any)}
                  className="bg-transparent border-0 outline-none text-slate-200 cursor-pointer"
                >
                  <option value="all" className="bg-slate-950">All</option>
                  <option value="Active" className="bg-slate-950">Active</option>
                  <option value="Suspended" className="bg-slate-950">Suspended</option>
                </select>
              </div>

              {/* Export Button */}
              <button
                onClick={() => exportUsersToCSV(filteredUsers)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 text-[11px] font-bold transition-all"
                title="CSV Spreadsheet Download"
              >
                <Download className="h-3 w-3" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Bulk Action Strip */}
          {selectedUserIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/20 flex justify-between items-center text-xs text-indigo-200"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold underline">{selectedUserIds.length}</span> users selected for action.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkToggleUserStatus}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold transition-colors"
                >
                  Toggle Active/Suspend
                </button>
                <button
                  onClick={handleBulkDeleteUsers}
                  className="px-3 py-1 bg-red-600/30 hover:bg-red-600 border border-red-500/20 text-red-100 rounded text-[11px] font-semibold transition-colors"
                >
                  Delete Selected
                </button>
              </div>
            </motion.div>
          )}

          {/* Users List Data Table */}
          <div className="bg-slate-900/40 rounded-xl border border-white/5 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/50 border-b border-white/5 msg-table-tr select-none text-slate-400 font-mono">
                    <th className="py-3 px-4 w-12">
                      <input
                        type="checkbox"
                        checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={() => handleSelectAllUsers(filteredUsers)}
                        className="rounded accent-indigo-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-4 font-semibold">User Details</th>
                    <th className="py-3 px-4 font-semibold">Credentials ID</th>
                    <th className="py-3 px-4 font-semibold">Role</th>
                    <th className="py-3 px-4 font-semibold">Department</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-slate-500">
                        No matching administrative user records found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-slate-900/30 transition-all">
                        <td className="py-3.5 px-4 w-12">
                          <input
                            type="checkbox"
                            checked={selectedUserIds.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded accent-indigo-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-sans text-xs">
                              {user.name[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-200">{user.name}</p>
                              <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                <Mail className="h-3 w-3 text-slate-600" />
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">{user.id}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider font-mono ${
                            user.role === 'faculty' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">{user.dept}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-red-500/10 text-red-400 border border-red-500/25'
                          }`}>
                            <span className={`h-1 w-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingUser(user)}
                              className="p-1.5 hover:text-indigo-400 hover:bg-slate-800 text-slate-500 rounded transition-colors"
                              title="Modify Profile Parameters"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1.5 hover:text-red-400 hover:bg-slate-800 text-slate-500 rounded transition-colors"
                              title="Revoke Credentials Access"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add User Modal */}
          {showAddUserModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-white/10 rounded-xl p-5 w-full max-w-md shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                  <h3 className="font-bold text-white text-sm">Add Academic Administrator/User</h3>
                  <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleAddNewUser} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Enrollment ID / Faculty ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MITS-CS-23-094"
                      value={newUser.id}
                      onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Human Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vedant Saxena"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Administrative Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. v.saxena@mits.ac"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">User Base Role *</label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-slate-200 outline-none focus:border-indigo-500"
                      >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Core Department</label>
                      <select
                        value={newUser.dept}
                        onChange={(e) => setNewUser({ ...newUser, dept: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-slate-200 outline-none focus:border-indigo-500"
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddUserModal(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors"
                    >
                      Save Credentials
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Edit User Modal */}
          {editingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-white/10 rounded-xl p-5 w-full max-w-md shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                  <h3 className="font-bold text-white text-sm">Modify Portal User Details</h3>
                  <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleUpdateUser} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Human Legal Name</label>
                    <input
                      type="text"
                      required
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Administrative Email</label>
                    <input
                      type="email"
                      required
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Administrative Status</label>
                      <select
                        value={editingUser.status}
                        onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-slate-200 outline-none focus:border-indigo-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Core Department</label>
                      <select
                        value={editingUser.dept}
                        onChange={(e) => setEditingUser({ ...editingUser, dept: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-slate-200 outline-none focus:border-indigo-500"
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingUser(null)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors"
                    >
                      Commit Parameter Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </>
      ) : (
        // ================= DEPARTMENT MANAGEMENT DASHBOARD =================
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Department Organigram Management</h2>
              <p className="text-xs text-slate-400 mt-1">Configure academic offices, intake allocations, and Head of Department HOD desks</p>
            </div>
            <button
              onClick={() => setShowAddDeptModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors shadow-lg shadow-indigo-600/10"
            >
              <Plus className="h-4 w-4" />
              Add Department
            </button>
          </div>

          {/* Search, bulk operations */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search department, HOD, code..."
                value={deptSearch}
                onChange={(e) => setDeptSearch(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 hover:border-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            </div>

            <button
              onClick={() => exportDeptsToCSV(filteredDepts)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 text-[11px] font-bold transition-all w-full md:w-auto justify-center"
            >
              <Download className="h-3 w-3" />
              Export Directory Structure
            </button>
          </div>

          {/* Bulk selected strip for departments */}
          {selectedDeptIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/20 flex justify-between items-center text-xs text-indigo-200"
            >
              <div>
                <span className="font-bold underline">{selectedDeptIds.length}</span> departments selected.
              </div>
              <button
                onClick={handleBulkDeleteDepts}
                className="px-3 py-1 bg-red-600/30 hover:bg-red-600 border border-red-500/20 text-red-100 rounded text-[11px] font-semibold transition-colors"
              >
                Delete Selected Nodes
              </button>
            </motion.div>
          )}

          {/* Departments Table Layout */}
          <div className="bg-slate-900/40 rounded-xl border border-white/5 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/50 border-b border-white/5 text-slate-400 font-mono">
                    <th className="py-3 px-4 w-12">
                      <input
                        type="checkbox"
                        checked={selectedDeptIds.length === filteredDepts.length && filteredDepts.length > 0}
                        onChange={() => handleSelectAllDepts(filteredDepts)}
                        className="rounded accent-indigo-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-4 font-semibold">Department Structure</th>
                    <th className="py-3 px-4 font-semibold">Academic Code</th>
                    <th className="py-3 px-4 font-semibold">Head of Department (HOD)</th>
                    <th className="py-3 px-4 font-semibold">Core Staff</th>
                    <th className="py-3 px-4 font-semibold">Allocated Intake</th>
                    <th className="py-3 px-4 font-semibold">HQ Location</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-slate-500">No departments match your query.</td>
                    </tr>
                  ) : (
                    filteredDepts.map((dept) => (
                      <tr key={dept.id} className="border-b border-white/5 last:border-0 hover:bg-slate-900/30 transition-all text-slate-300">
                        <td className="py-3.5 px-4 w-12 text-slate-200">
                          <input
                            type="checkbox"
                            checked={selectedDeptIds.includes(dept.id)}
                            onChange={() => handleSelectDept(dept.id)}
                            className="rounded accent-indigo-500 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-indigo-400 shrink-0" />
                            {dept.name}
                          </div>
                        </td>
                        <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{dept.code}</span></td>
                        <td className="py-3.5 px-4 text-slate-200">{dept.hod}</td>
                        <td className="py-3.5 px-4 font-mono font-semibold">{dept.staff} Profs</td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{dept.intake} seats</td>
                        <td className="py-3.5 px-4 text-xs font-mono">{dept.building}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingDept(dept)}
                              className="p-1.5 hover:text-indigo-400 hover:bg-slate-800 text-slate-500 rounded transition-colors"
                              title="Modify Building/HOD configurations"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteDept(dept.id)}
                              className="p-1.5 hover:text-red-400 hover:bg-slate-800 text-slate-500 rounded transition-colors"
                              title="Dismantle Department Block"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Dept Modal */}
          {showAddDeptModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-white/10 rounded-xl p-5 w-full max-w-md shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                  <h3 className="font-bold text-white text-sm">Add Academic Department Node</h3>
                  <button onClick={() => setShowAddDeptModal(false)} className="text-slate-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleAddNewDept} className="space-y-4 text-xs">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="block text-slate-400 mb-1">Index ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. D05"
                        value={newDept.id}
                        onChange={(e) => setNewDept({ ...newDept, id: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-slate-400 mb-1">Dept Academic Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ME"
                        value={newDept.code}
                        onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none focus:border-indigo-500 font-mono font-bold uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Department Structure Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Electrical Engineering"
                      value={newDept.name}
                      onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Head of Department (HOD) Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Arthur Dent"
                      value={newDept.hod}
                      onChange={(e) => setNewDept({ ...newDept, hod: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Intake seat quota</label>
                      <input
                        type="number"
                        value={newDept.intake}
                        onChange={(e) => setNewDept({ ...newDept, intake: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-slate-200 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Core Campus building HQ</label>
                      <select
                        value={newDept.building}
                        onChange={(e) => setNewDept({ ...newDept, building: e.target.value })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-slate-200 outline-none focus:border-indigo-500"
                      >
                        <option value="Block A">Block A</option>
                        <option value="Block B">Block B</option>
                        <option value="Block C">Block C</option>
                        <option value="Block D">Block D</option>
                        <option value="Central Annex">Central Annex</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddDeptModal(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg"
                    >
                      Provision Node
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Edit Department Modal */}
          {editingDept && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-white/10 rounded-xl p-5 w-full max-w-md shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                  <h3 className="font-bold text-white text-sm">Modify Department Node Parameter</h3>
                  <button onClick={() => setEditingDept(null)} className="text-slate-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleUpdateDept} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Department Structure name</label>
                    <input
                      type="text"
                      required
                      value={editingDept.name}
                      onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Head of Department HOD Desk</label>
                    <input
                      type="text"
                      required
                      value={editingDept.hod}
                      onChange={(e) => setEditingDept({ ...editingDept, hod: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-slate-200 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Staff strength</label>
                      <input
                        type="number"
                        value={editingDept.staff}
                        onChange={(e) => setEditingDept({ ...editingDept, staff: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-slate-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Allocated Intake Limit</label>
                      <input
                        type="number"
                        value={editingDept.intake}
                        onChange={(e) => setEditingDept({ ...editingDept, intake: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-slate-200 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingDept(null)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg"
                    >
                      Commit parameters
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
