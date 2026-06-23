import { Download, FileText, CheckCircle, Clock, BookOpen, Search, Loader2, AlertCircle, Video, Presentation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface SharedMaterial {
  id: string;
  title: string;
  course: string;
  description?: string;
  type: string;
  size: string;
  date: string;
  file_url?: string;
  fallback?: boolean;
}

export function DownloadsView() {
  const [activeSubTab, setActiveSubTab] = useState<'official' | 'materials'>('materials');
  const [materials, setMaterials] = useState<SharedMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const documents = [
    { id: 1, title: 'Bonafide Certificate', status: 'Available', type: 'Official Document', size: '1.2 MB' },
    { id: 2, title: 'Semester 2 Marksheet', status: 'Available', type: 'Academic Record', size: '2.4 MB' },
    { id: 3, title: 'Semester 1 Marksheet', status: 'Available', type: 'Academic Record', size: '2.3 MB' },
    { id: 4, title: 'Mid-Sem Hall Ticket', status: 'Available', type: 'Examination', size: '0.8 MB' },
    { id: 5, title: 'Fee Receipt (Odd Sem)', status: 'Available', type: 'Financial', size: '1.1 MB' },
    { id: 6, title: 'Hostel Allotment Letter', status: 'Available', type: 'Accommodation', size: '0.5 MB' },
  ];

  const fetchSharedMaterials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/materials');
      if (res.ok) {
        const data = await res.json();
        setMaterials(data);
      }
    } catch (err) {
      console.error('Failed to retrieve coursewares materials:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSharedMaterials();
  }, []);

  const handleDownloadSimulation = (title: string) => {
    alert(`File handshake compiled. Initiating secure digital download of: ${title}`);
  };

  const handleDownloadMaterial = (file: SharedMaterial) => {
    if (file.file_url) {
      window.open(file.file_url, '_blank');
    } else {
      handleDownloadSimulation(file.title);
    }
  };

  const filteredMaterials = materials.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.description && m.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Download Center</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Access formal certifications and shared study resources uploaded by your course faculty.</p>
        </div>

        {/* Dynamic Sync Trigger */}
        {activeSubTab === 'materials' && (
          <button 
            onClick={fetchSharedMaterials}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Clock className="h-3.5 w-3.5 text-blue-500 animate-spin" />
            <span>Synchronize Resources</span>
          </button>
        )}
      </div>

      {/* Primary Sub-Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1.5">
        <button
          onClick={() => setActiveSubTab('materials')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold tracking-wide transition-colors relative cursor-pointer ${
            activeSubTab === 'materials'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-450 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>Faculty Shared Study Materials ({materials.length})</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('official')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold tracking-wide transition-colors relative cursor-pointer ${
            activeSubTab === 'official'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-450 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span>Official Certificates & Marksheets ({documents.length})</span>
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'materials' ? (
          <motion.div
            key="materials-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Search Input for Materials */}
            {materials.length > 0 && (
              <div className="relative w-full max-w-sm mb-4">
                <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter resources by name, subject..." 
                  className="pl-9 pr-4 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                />
              </div>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500 gap-2 font-semibold">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <p className="text-xs">Connecting with institutional db...</p>
              </div>
            ) : filteredMaterials.length === 0 ? (
              <div className="py-16 text-center text-slate-400 dark:text-slate-550 flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl">
                <AlertCircle className="h-9 w-9 text-slate-350 dark:text-slate-700" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-200">No Course Materials available</p>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">Faculty has not currently published shared lectures materials for these courses.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMaterials.map((file) => (
                  <div key={file.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-sm transition-all group">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2.5 rounded-lg border transition-colors ${
                          file.type === 'PDF' 
                            ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/10' 
                            : file.type === 'PPT' 
                              ? 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/10' 
                              : file.type === 'Video' 
                                ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/10' 
                                : 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/10'
                        }`}>
                          {file.type === 'PDF' && <FileText className="h-5 w-5" />}
                          {file.type === 'PPT' && <Presentation className="h-5 w-5" />}
                          {file.type === 'Video' && <Video className="h-5 w-5" />}
                          {file.type !== 'PDF' && file.type !== 'PPT' && file.type !== 'Video' && <FileText className="h-5 w-5" />}
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                          {file.course}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight truncate-2-lines">{file.title}</h3>
                      {file.description && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {file.description}
                        </p>
                      )}
                      <p className="text-[10px] text-slate-455 dark:text-slate-400 mt-1.5 font-medium">
                        Added: {file.date} • Size: {file.size}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                      <button 
                        onClick={() => handleDownloadMaterial(file)}
                        className="w-full flex items-center justify-center gap-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-blue-600 dark:hover:bg-blue-600 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white hover:border-blue-600 dark:hover:border-blue-600 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                      >
                        <Download className="h-3.5 w-3.5" /> Download Resource
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="official-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {documents.map(doc => (
              <div key={doc.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 flex flex-col hover:border-blue-300 hover:shadow-sm transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 transition-colors">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-100">
                    {doc.status}
                  </span>
                </div>
                
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{doc.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{doc.type} • {doc.size}</p>
                
                <div className="mt-auto pt-5">
                  <button 
                    onClick={() => handleDownloadSimulation(doc.title)}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2 rounded-md text-sm font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all cursor-pointer"
                  >
                    <Download className="h-4 w-4" /> Download
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-900/20 rounded-lg p-5 flex items-start gap-3">
        <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-amber-900 dark:text-amber-400">Document Verification Process</h4>
          <p className="text-sm text-amber-800/80 dark:text-amber-400/85 mt-1">If you require a digitally signed and stamped copy of any document for official purposes, please raise a request in the Grievance section. The process typically takes 2-3 working days.</p>
        </div>
      </div>
    </motion.div>
  );
}
