import UploadForm from '@/components/UploadForm';

export default function UploadPage() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Upload Your PDF
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Transform your PDF into an interactive flipbook in seconds. Just upload and share.
        </p>
        <UploadForm />
      </div>
    </div>
  );
} 