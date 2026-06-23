import { Upload, FileText, Video, Presentation, Search, MoreVertical, Trash2, Database, Loader2, AlertCircle, Info, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

interface Material {
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

export function FacultyMaterialsView() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFallback, setHasFallback] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS302 - OS');
  const [description, setDescription] = useState('');
  const [materialType, setMaterialType] = useState('PDF');
  const [searchQuery, setSearchQuery] = useState('');

  // Storage Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadWarning, setUploadWarning] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/materials');
      const data = await res.json();
      setMaterials(data);
      const containsFallback = data.some((item: any) => item.fallback);
      setHasFallback(containsFallback);
    } catch (err) {
      console.error('Failed to load study materials:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploadWarning(null);

      // Guess Title if Currently Empty
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setTitle(nameWithoutExt);

      // Auto-extract Material format based on ext
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'pdf') {
        setMaterialType('PDF');
      } else if (ext === 'ppt' || ext === 'pptx') {
        setMaterialType('PPT');
      } else if (ext === 'mp4' || ext === 'mov' || ext === 'avi' || ext === 'mkv') {
        setMaterialType('Video');
      } else if (ext === 'zip' || ext === 'rar' || ext === 'tar' || ext === 'gz') {
        setMaterialType('Zip');
      }
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setUploadWarning(null);
    setUploadStatus('');

    let fileUrl = '';
    let fileSizeStr = '';

    if (selectedFile) {
      const sizeMB = selectedFile.size / (1024 * 1024);
      fileSizeStr = `${sizeMB.toFixed(1)} MB`;

      if (isSupabaseConfigured && supabase) {
        setUploadStatus('Uploading resource to Supabase Storage...');
        try {
          const fileExt = selectedFile.name.split('.').pop();
          const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('materials')
            .upload(cleanFileName, selectedFile, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.warn('Storage bucket alert details:', uploadError);
            if (uploadError.message?.toLowerCase().includes('bucket not found') || 
                uploadError.message?.toLowerCase().includes('does not exist')) {
              setUploadWarning(
                'Storage Bucket "materials" was not found in your Supabase project. To fully active it, please go to your Supabase Console -> Storage dashboard and create a public bucket named "materials" with public read/write permission rules! Proceeding standardly with database register using fallback simulation link.'
              );
            } else {
              setUploadWarning(`Supabase Storage upload warning: ${uploadError.message}. Proceeding with standard dynamic database entry.`);
            }
          } else {
            const { data } = supabase.storage
              .from('materials')
              .getPublicUrl(cleanFileName);
            
            fileUrl = data?.publicUrl || '';
            setUploadStatus('File uploaded successfully to Supabase!');
          }
        } catch (storageErr: any) {
          console.error('Storage driver system warning:', storageErr);
          setUploadWarning(`Storage error: ${storageErr.message || 'unknown error'}. Fallback in place.`);
        }
      } else {
        setUploadWarning('Supabase credentials are not configured yet. Proceeding with mock upload handshake.');
      }
    }

    if (!fileSizeStr) {
      fileSizeStr = materialType === 'Video' 
        ? `${(Math.random() * 120 + 30).toFixed(1)} MB` 
        : `${(Math.random() * 4 + 1).toFixed(1)} MB`;
    }

    const cleanCourseCode = course.split(' ')[0]; // E.g. "CS302"

    try {
      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          course: cleanCourseCode,
          description: description.trim(),
          type: materialType,
          size: fileSizeStr,
          file_url: fileUrl || null
        })
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setTitle('');
          setDescription('');
          setSelectedFile(null);
          setUploadStatus('');
          fetchMaterials();
        }
      }
    } catch (err) {
      console.error('Failed to post new material:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const res = await fetch(`/api/materials/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchMaterials();
      }
    } catch (err) {
      console.error('Failed to delete material resource:', err);
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Study Materials</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Upload and coordinate digital academic resources for your courses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Publish new Materials form */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-1.5 text-sm sm:text-base">
              <Database className="h-4 w-4 text-emerald-500" />
              <span>Publish New Material</span>
            </h3>

            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Resource Title
                </label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-slate-400 dark:placeholder-slate-550 font-medium" 
                  placeholder="e.g. Chapter 4: Memory Management" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Course Module
                  </label>
                  <select 
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold cursor-pointer"
                  >
                    <option value="CS301 - DSA">CS301 - DSA</option>
                    <option value="CS302 - OS">CS302 - OS</option>
                    <option value="CS303 - DBMS">CS303 - DBMS</option>
                    <option value="CS304 - CN">CS304 - CN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Format Type
                  </label>
                  <select 
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold cursor-pointer"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="PPT">PPT Slideshow</option>
                    <option value="Video">Video Lecture</option>
                    <option value="Zip">Zip Archive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Short Description
                </label>
                <textarea 
                  rows={2} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs placeholder-slate-400 dark:placeholder-slate-550 font-medium" 
                  placeholder="Optional brief regarding slides, topics discussed..." 
                />
              </div>

              <div className="border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-955/20 hover:bg-slate-100/50 dark:hover:bg-slate-900/10 transition-colors relative group">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" 
                />
                <div className="text-center pointer-events-none">
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full mb-2">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-850 dark:text-slate-100 line-clamp-1 max-w-[200px]">{selectedFile.name}</p>
                      <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-1 font-mono">{((selectedFile.size)/(1024*1024)).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/15 text-blue-600 dark:text-blue-450 rounded-full mb-1.5 group-hover:scale-105 transition-transform">
                        <Upload className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Choose File or Drag/Drop</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">PDF, PPT, Videos, or Archive (Max 20MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {uploadStatus && (
                <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-lg text-xs flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin text-blue-500 shrink-0" />
                  <p className="text-blue-700 dark:text-blue-300 font-medium leading-tight">{uploadStatus}</p>
                </div>
              )}

              {uploadWarning && (
                <div className="p-3 bg-amber-50/80 dark:bg-amber-950/25 border border-amber-200/50 dark:border-amber-900/30 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2 leading-relaxed">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p className="font-semibold">{uploadWarning}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-75 text-white font-bold rounded-lg transition-colors text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/10 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Publishing Course Resource...</span>
                  </>
                ) : (
                  <span>Publish Academic Resource</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Uploaded materials list */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div>
              <h3 className="font-semibold text-slate-805 dark:text-slate-200 w-full text-sm sm:text-base">Uploaded Directory</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 p-0 m-0">Synchronized actively with Postgres storage</p>
            </div>
            
            <div className="relative w-full sm:w-auto">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files by title or course..." 
                className="pl-9 pr-4 py-2 border border-slate-250 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-slate-450 dark:text-slate-500 gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <p className="text-xs font-semibold">Reading digital resource ledger...</p>
              </div>
            ) : filteredMaterials.length === 0 ? (
              <div className="py-20 text-center text-slate-400 dark:text-slate-550 flex flex-col items-center justify-center gap-2">
                <AlertCircle className="h-8 w-8 text-slate-350 dark:text-slate-700" />
                <p className="text-xs font-semibold">No materials matched current parameters.</p>
                <p className="text-[10.5px]">Provide first uploads utilizing the left-hand form panel.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredMaterials.map((file) => (
                  <div key={file.id} className="flex items-center p-3.5 border border-slate-200 dark:border-slate-800/80 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/20 transition group">
                    <div className={`p-2.5 rounded-lg mr-3 shrink-0 ${
                      file.type === 'PDF' ? 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400' :
                      file.type === 'PPT' ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400' :
                      file.type === 'Video' ? 'bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400' :
                      'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400'
                    }`}>
                      {file.type === 'PDF' && <FileText className="h-5 w-5" />}
                      {file.type === 'PPT' && <Presentation className="h-5 w-5" />}
                      {file.type === 'Video' && <Video className="h-5 w-5" />}
                      {file.type !== 'PDF' && file.type !== 'PPT' && file.type !== 'Video' && <Upload className="h-5 w-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">{file.title}</p>
                        {file.fallback && (
                          <span className="shrink-0 text-[8px] sm:text-[9px] font-bold bg-slate-100 text-slate-500 dark:bg-slate-950 px-1 py-0.5 rounded leading-none">Local Fallback</span>
                        )}
                      </div>
                      
                      {file.description && (
                        <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-1 italic">
                          {file.description}
                        </p>
                      )}

                      <div className="flex items-center text-[10px] text-slate-500 dark:text-slate-400 mt-1 space-x-2 sm:space-x-3">
                        <span className="font-mono font-bold bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">{file.course}</span>
                        <span>• {file.date}</span>
                        <span>• size: {file.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                      <button 
                        onClick={() => handleDelete(file.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg cursor-pointer"
                        title="Delete material"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
