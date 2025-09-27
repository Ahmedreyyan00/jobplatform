import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="text-blue-600">JobConnect</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">
            Your AI-powered job search platform that connects you with opportunities 
            from LinkedIn, Twitter, and the web. Find the perfect job match for your skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">
                AI-powered job matching based on your skills and preferences
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="text-lg font-semibold mb-2">Network Integration</h3>
              <p className="text-gray-600">
                Connect LinkedIn and Twitter to find opportunities in your network
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="text-lg font-semibold mb-2">Hire & Get Hired</h3>
              <p className="text-gray-600">
                Post jobs or find freelance opportunities
              </p>
            </div>
          </div>

          <div className="space-x-4">
            <Link
              href="/auth/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium inline-block"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium inline-block border border-blue-600"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}