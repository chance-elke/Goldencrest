export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-navy">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account and site settings</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="font-bold text-navy mb-4">Account</h2>
        <p className="text-sm text-gray-500">
          To manage your admin account (password, email), please use the Supabase dashboard or
          contact your system administrator.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="font-bold text-navy mb-4">Site Configuration</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Site Name</span>
            <span className="font-medium text-navy">Gold Investments Guide</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Public URL</span>
            <span className="font-medium text-navy">{process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Environment</span>
            <span className="font-medium text-navy">{process.env.NODE_ENV}</span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <p className="text-amber-800 text-sm">
          To update environment variables (Supabase keys, site URL), edit the{' '}
          <code className="bg-amber-100 px-1 rounded text-xs">.env.local</code> file and redeploy.
        </p>
      </div>
    </div>
  )
}
