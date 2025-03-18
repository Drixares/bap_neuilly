import React, {useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import { RiDownloadLine } from '@remixicon/react';

interface DropzoneExcelProps {
    onFileSelected?: (file: File) => void;
  }

export default function DropzoneExcel({ onFileSelected}: DropzoneExcelProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file && onFileSelected) {
            onFileSelected(file);
        }
    }, [onFileSelected]);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls']
        },
        maxFiles: 1,
        onDrop
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));
    
      return (
        <section className='flex flex-col gap-4'>
          <div {...getRootProps({className: 'dropzone'})} className="flex flex-col gap-4 items-center justify-center mt-8 w-full aspect-square border-2 border-dashed border-white/40 rounded-lg p-4">
            <input {...getInputProps()} />
            <RiDownloadLine className='w-8 mt-4 opacity-40' />
            <p className='opacity-50'>Cliquez ou glissez le fichier ici.</p>
          </div>
          {acceptedFiles.length > 0 && (
                <aside className='mt-2'>
                    <h4 className="text-sm font-medium">Fichier sélectionné:</h4>
                    <ul className="text-xs opacity-70">{files}</ul>
                </aside>
            )
          }
        </section>
    );
}
    
