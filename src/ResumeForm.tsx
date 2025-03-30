"use client"

import type React from "react"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

// TypeScript interfaces (unchanged from original)
export interface Education {
  institution: string
  details: string
  location: string
  duration: string
}
export interface Experience {
  title: string
  company: string
  location: string
  duration: string
  responsibilities: string
}
export interface Project {
  title: string
  description: string
  duration: string
}
export interface TechnicalSkills {
  languages: string
  frameworks: string
}
export interface Domains {
  technical: string
  knowledge: string
  nonTechnical: string
}
export interface Volunteering {
  role: string
  organization: string
  location: string
}
export interface ResumeData {
  name: string
  phone: string
  email: string
  linkedin: string
  summary: string
  education: Education[]
  experience: Experience[]
  projects: Project[]
  technicalSkills: TechnicalSkills
  domains: Domains
  volunteering: Volunteering[]
}

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate()
  const [data, setData] = useState<ResumeData>({
    name: "",
    phone: "",
    email: "",
    linkedin: "",
    summary: "",
    education: [{ institution: "", details: "", location: "", duration: "" }],
    experience: [{ title: "", company: "", location: "", duration: "", responsibilities: "" }],
    projects: [{ title: "", description: "", duration: "" }],
    technicalSkills: { languages: "", frameworks: "" },
    domains: { technical: "", knowledge: "", nonTechnical: "" },
    volunteering: [{ role: "", organization: "", location: "" }],
  })

  // Handle simple field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // Handle nested array changes
  const handleNestedChange = (
    section: "education" | "experience" | "projects" | "volunteering",
    index: number,
    field: string,
    value: string,
  ) => {
    const updated = [...data[section]]
    updated[index] = { ...updated[index], [field]: value }
    setData({ ...data, [section]: updated })
  }

  // Handle nested object changes
  const handleNestedObjChange = (section: "technicalSkills" | "domains", field: string, value: string) => {
    setData({ ...data, [section]: { ...data[section], [field]: value } })
  }

  // Add new entry to a section
  const addEntry = (section: "education" | "experience" | "projects" | "volunteering") => {
    const newEntry =
      section === "education"
        ? { institution: "", details: "", location: "" }
        : section === "experience"
          ? { title: "", company: "", location: "", duration: "", responsibilities: "" }
          : section === "projects"
            ? { title: "", description: "", duration: "" }
            : { role: "", organization: "", location: "" }
    setData({ ...data, [section]: [...data[section], newEntry] })
  }

  // Remove entry from a section
  const removeEntry = (section: "education" | "experience" | "projects" | "volunteering", index: number) => {
    if (data[section].length > 1) {
      setData({ ...data, [section]: data[section].filter((_, i) => i !== index) })
    }
  }

  // Form submission with enhanced validation
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!data.name || !data.phone || !data.email) {
      alert("Please fill in your name, phone, and email.")
      return
    }
    if (!data.education.some((e) => e.institution) && !data.experience.some((e) => e.title)) {
      alert("Please add at least one education or experience entry.")
      return
    }
    onSubmit(data)
    navigate("/resume-print")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Yash Bhai Ka Resume Builder</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-medium px-2 text-gray-700">Personal Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700">Name (required):</span>
              <input
                name="name"
                placeholder="Yash Kathoke"
                value={data.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Phone (required):</span>
              <input
                name="phone"
                placeholder="+91 0000000000"
                value={data.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email (required):</span>
              <input
                name="email"
                type="email"
                placeholder="Yash.kathoke@example.com"
                value={data.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">LinkedIn:</span>
              <input
                name="linkedin"
                placeholder="linkedin.com/in/yash"
                value={data.linkedin}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-medium px-2 text-gray-700">Summary</legend>
          <label className="block">
            <span className="text-gray-700">Professional Summary:</span>
            <textarea
              name="summary"
              placeholder="Brief summary of your skills and experience"
              value={data.summary}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </label>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-medium px-2 text-gray-700">Education</legend>
          {data.education.map((edu, idx) => (
            <div key={idx} className="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700">Institution:</span>
                  <input
                    placeholder="University Name"
                    value={edu.institution}
                    onChange={(e) => handleNestedChange("education", idx, "institution", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Location:</span>
                  <input
                    placeholder="City, State"
                    value={edu.location}
                    onChange={(e) => handleNestedChange("education", idx, "location", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-gray-700">Degree & Details:</span>
                  <input
                    placeholder="Bachlor's of engineering in Computer Science"
                    value={edu.details}
                    onChange={(e) => handleNestedChange("education", idx, "details", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Duration:</span>
                  <input
                    placeholder="Jan 2020 - Jun 2022"
                    value={edu.duration}
                    onChange={(e) => handleNestedChange("education", idx, "duration", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
              </div>

              {data.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry("education", idx)}
                  className="mt-3 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry("education")}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            Add Education
          </button>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-medium px-2 text-gray-700">Experience</legend>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700">Job Title:</span>
                  <input
                    placeholder="Software Engineer"
                    value={exp.title}
                    onChange={(e) => handleNestedChange("experience", idx, "title", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Duration:</span>
                  <input
                    placeholder="Jan 2020 - Jun 2022"
                    value={exp.duration}
                    onChange={(e) => handleNestedChange("experience", idx, "duration", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Company:</span>
                  <input
                    placeholder="Tech Corp"
                    value={exp.company}
                    onChange={(e) => handleNestedChange("experience", idx, "company", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Location:</span>
                  <input
                    placeholder="City, State"
                    value={exp.location}
                    onChange={(e) => handleNestedChange("experience", idx, "location", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-gray-700">Responsibilities (one per line for bullets):</span>
                  <textarea
                    placeholder="Developed features&#10;Led team projects"
                    value={exp.responsibilities}
                    onChange={(e) => handleNestedChange("experience", idx, "responsibilities", e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
              </div>
              {data.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry("experience", idx)}
                  className="mt-3 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry("experience")}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            Add Experience
          </button>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-medium px-2 text-gray-700">Projects</legend>
          {data.projects.map((proj, idx) => (
            <div key={idx} className="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700">Project Title:</span>
                  <input
                    placeholder="Portfolio Website"
                    value={proj.title}
                    onChange={(e) => handleNestedChange("projects", idx, "title", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Duration:</span>
                  <input
                    placeholder="Jan 2022 - Mar 2022"
                    value={proj.duration || ""}
                    onChange={(e) => handleNestedChange("projects", idx, "duration", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-gray-700">Description:</span>
                  <textarea
                    placeholder="Built with React and CSS"
                    value={proj.description}
                    onChange={(e) => handleNestedChange("projects", idx, "description", e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
              </div>
              {data.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry("projects", idx)}
                  className="mt-3 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry("projects")}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            Add Project
          </button>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-medium px-2 text-gray-700">Technical Skills</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700">Languages:</span>
              <input
                placeholder="JavaScript, Python"
                value={data.technicalSkills.languages}
                onChange={(e) => handleNestedObjChange("technicalSkills", "languages", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Frameworks / Libraries:</span>
              <input
                placeholder="React, Node.js"
                value={data.technicalSkills.frameworks}
                onChange={(e) => handleNestedObjChange("technicalSkills", "frameworks", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-medium px-2 text-gray-700">Domains</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-gray-700">Technical:</span>
              <input
                placeholder="Web Development"
                value={data.domains.technical}
                onChange={(e) => handleNestedObjChange("domains", "technical", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Knowledge:</span>
              <input
                placeholder="Data Structures"
                value={data.domains.knowledge}
                onChange={(e) => handleNestedObjChange("domains", "knowledge", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Non-Technical:</span>
              <input
                placeholder="Team Leadership"
                value={data.domains.nonTechnical}
                onChange={(e) => handleNestedObjChange("domains", "nonTechnical", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-lg font-medium px-2 text-gray-700">Volunteering</legend>
          {data.volunteering.map((vol, idx) => (
            <div key={idx} className="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-gray-700">Role:</span>
                  <input
                    placeholder="Event Coordinator"
                    value={vol.role}
                    onChange={(e) => handleNestedChange("volunteering", idx, "role", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Organization:</span>
                  <input
                    placeholder="Community Group"
                    value={vol.organization}
                    onChange={(e) => handleNestedChange("volunteering", idx, "organization", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Location:</span>
                  <input
                    placeholder="City, State"
                    value={vol.location}
                    onChange={(e) => handleNestedChange("volunteering", idx, "location", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
              </div>
              {data.volunteering.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry("volunteering", idx)}
                  className="mt-3 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry("volunteering")}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            Add Volunteering
          </button>
        </fieldset>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            Generate Resume
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResumeForm

