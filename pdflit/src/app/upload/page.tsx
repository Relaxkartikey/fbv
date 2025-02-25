import UploadForm from '@/components/UploadForm';

export default function UploadPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Upload Your PDF
          </h1>
          <p className="text-gray-600">
            Transform your PDF into an interactive flipbook in seconds.
          </p>
        </div>
        <UploadForm />
      </div>
    </div>
  );
} 