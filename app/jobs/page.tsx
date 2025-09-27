"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Job {
  id: string
  title: string
  description: string
  source: string
  url?: string
  location?: string
  remote: boolean
  skillsCsv: string
  postedAt: string
}

export default function Jobs() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSource, setFilterSource] = useState("all")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    // Mock job data for now
    const mockJobs: Job[] = [
      {
        id: "1",
        title: "Senior React Developer",
        description: "We're looking for an experienced React developer to join our team. You'll work on cutting-edge web applications and collaborate with a talented team.",
        source: "linkedin",
        url: "https://linkedin.com/jobs/view/123",
        location: "San Francisco, CA",
        remote: true,
        skillsCsv: "React,TypeScript,Node.js,GraphQL",
        postedAt: "2024-01-15T10:00:00Z"
      },
      {
        id: "2",
        title: "Full Stack Developer",
        description: "Join our startup as a full-stack developer. Work with modern technologies and help build the next generation of web applications.",
        source: "twitter",
        url: "https://twitter.com/company/status/123",
        location: "Remote",
        remote: true,
        skillsCsv: "JavaScript,Python,Django,PostgreSQL",
        postedAt: "2024-01-14T15:30:00Z"
      },
      {
        id: "3",
        title: "Frontend Engineer",
        description: "We need a frontend engineer to help us build beautiful user interfaces. Experience with modern frameworks required.",
        source: "web",
        url: "https://company.com/careers",
        location: "New York, NY",
        remote: false,
        skillsCsv: "Vue.js,CSS,HTML,JavaScript",
        postedAt: "2024-01-13T09:15:00Z"
      }
    ]

    setTimeout(() => {
      setJobs(mockJobs)
      setLoading(false)
    }, 1000)
  }, [status, router])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skillsCsv.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSource = filterSource === "all" || job.source === filterSource
    
    return matchesSearch && matchesSource
  })

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Job Opportunities
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/dashboard"
                className="text-blue-600 hover:text-blue-500"
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Jobs
                </label>
                <input
                  type="text"
                  id="search"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by title, description, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Source
                </label>
                <select
                  id="source"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                >
                  <option value="all">All Sources</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter</option>
                  <option value="web">Web</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="text-lg">Loading jobs...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-lg text-gray-500">No jobs found matching your criteria.</div>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            📍 {job.location}
                          </span>
                          <span className="flex items-center">
                            {job.remote ? "🏠 Remote" : "🏢 On-site"}
                          </span>
                          <span className="flex items-center">
                            🔗 {job.source}
                          </span>
                          <span className="flex items-center">
                            📅 {new Date(job.postedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.skillsCsv.split(',').map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        {job.url && (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                          >
                            Apply
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
