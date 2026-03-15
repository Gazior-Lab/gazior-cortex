'use client';

import { useState, useCallback } from 'react';
import type { Source, SourceType } from '../types';

const DEMO_SOURCES: Source[] = [
  {
    id: 'src-1',
    name: 'AI_ML_Fundamentals.pdf',
    type: 'pdf',
    status: 'ready',
    uploadTime: new Date(Date.now() - 1000 * 60 * 10),
    size: '2.4 MB',
    pageCount: 48,
    pages: [],
  },
  {
    id: 'src-2',
    name: 'Neural_Networks_Research.docx',
    type: 'docx',
    status: 'ready',
    uploadTime: new Date(Date.now() - 1000 * 60 * 5),
    size: '1.8 MB',
    pageCount: 32,
    pages: [],
  },
];

interface UseSourcesReturn {
  sources: Source[];
  uploadFiles: (files: FileList) => void;
  removeSource: (id: string) => void;
}

export function useSources(): UseSourcesReturn {
  const [sources, setSources] = useState<Source[]>(DEMO_SOURCES);

  const uploadFiles = useCallback((files: FileList) => {
    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() as SourceType | undefined;
      const newSource: Source = {
        id: `src-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: file.name,
        type: ext ?? 'txt',
        status: 'uploading',
        uploadTime: new Date(),
        size: formatFileSize(file.size),
        pages: [],
      };

      setSources((prev) => [newSource, ...prev]);

      // Simulate upload progress → processing → ready
      setTimeout(() => {
        setSources((prev) =>
          prev.map((s) => (s.id === newSource.id ? { ...s, status: 'processing' } : s))
        );
      }, 800);

      setTimeout(() => {
        setSources((prev) =>
          prev.map((s) => (s.id === newSource.id ? { ...s, status: 'ready' } : s))
        );
      }, 2800);
    });
  }, []);

  const removeSource = useCallback((id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { sources, uploadFiles, removeSource };
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
