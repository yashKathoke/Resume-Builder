import type React from "react"
import type { ResumeData } from "./ResumeForm"
import './App.css'

interface ResumeTemplateProps {
  data: ResumeData
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  const hasContent = (section: any) =>
    Array.isArray(section)
      ? section.some((item: any) => Object.values(item).some((val) => typeof val === "string" && val.trim()))
      : Object.values(section).some((val) => typeof val === "string" && val.trim())

  // Function to capitalize month abbreviations in duration strings
  const capitalizeDuration = (duration: string) => {
    if (!duration) return duration

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    let formattedDuration = duration

    months.forEach(month => {
      const regex = new RegExp(month, 'gi')
      formattedDuration = formattedDuration.replace(regex, month.charAt(0).toUpperCase() + month.slice(1))
    })

    return formattedDuration
  }

  // Function to capitalize the first letter of each word in a location string
  const capitalizeLocation = (location: string) => {
    if (!location) return location
    return location
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  return (
    <div className="max-w-[850px] mx-auto p-8 bg-white text-gray-800 font-serif">
      <header className="mb-4">
        <h1 className="text-xl font-bold text-center">{data.name}</h1>
        <p className="text-center text-xs mt-1">
          {[data.phone, data.email, data.linkedin].filter(Boolean).join(" | ")}
        </p>
      </header>

      {data.summary.trim() && (
        <section className="mb-4">
          <h2 className="text-base uppercase mb-1">Summary</h2>
          <div className="border-t-2 border-gray-800 mb-2"></div>
          <p className="text-xs">{data.summary}</p>
        </section>
      )}

      {hasContent(data.education) && (
        <section className="mb-4">
          <h2 className="text-base uppercase mb-1">Education</h2>
          <div className="border-t-2 border-gray-800 mb-2"></div>
          {data.education.map((edu, idx) =>
            edu.institution.trim() || edu.details.trim() || edu.location.trim() ? (
              <div key={idx} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-bold">{edu.institution}</p>
                  <p className="text-xs">{capitalizeLocation(edu.location)}</p>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-xs italic">{edu.details}</p>
                  <p className="text-xs">{capitalizeDuration(edu.duration)}</p>
                </div>
              </div>
            ) : null,
          )}
        </section>
      )}

      {hasContent(data.experience) && (
        <section className="mb-4">
          <h2 className="text-base uppercase mb-1">Experience</h2>
          <div className="border-t-2 border-gray-800 mb-2"></div>
          {data.experience.map((exp, idx) =>
            exp.title.trim() || exp.company.trim() ? (
              <div key={idx} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-bold">{exp.title}</p>
                  <p className="text-xs">{capitalizeDuration(exp.duration)}</p>
                </div>
                <p className="text-xs mb-1">
                  {[exp.company, capitalizeLocation(exp.location)].filter(Boolean).join(" | ")}
                </p>
                {exp.responsibilities.trim() && (
                  <ul className="list-disc pl-5 text-xs">
                    {exp.responsibilities
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                )}
              </div>
            ) : null,
          )}
        </section>
      )}

      {hasContent(data.projects) && (
        <section className="mb-4">
          <h2 className="text-base uppercase mb-1">Projects</h2>
          <div className="border-t-2 border-gray-800 mb-2"></div>
          {data.projects.map((proj, idx) =>
            proj.title.trim() || proj.description.trim() ? (
              <div key={idx} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-bold">{proj.title}</p>
                  {proj.duration && <p className="text-xs">{capitalizeDuration(proj.duration)}</p>}
                </div>
                <p className="text-xs">{proj.description}</p>
              </div>
            ) : null,
          )}
        </section>
      )}

      {hasContent(data.technicalSkills) && (
        <section className="mb-4">
          <h2 className="text-base uppercase mb-1">Technical Skills</h2>
          <div className="border-t-2 border-gray-800 mb-2"></div>
          {data.technicalSkills.languages.trim() && (
            <p className="text-xs">
              <span className="font-bold">Languages:</span> {data.technicalSkills.languages}
            </p>
          )}
          {data.technicalSkills.frameworks.trim() && (
            <p className="text-xs">
              <span className="font-bold">FrameWorks/Platforms/Tools:</span> {data.technicalSkills.frameworks}
            </p>
          )}
        </section>
      )}

      {hasContent(data.domains) && (
        <section className="mb-4">
          <h2 className="text-base uppercase mb-1">Domains</h2>
          <div className="border-t-2 border-gray-800 mb-2"></div>
          {data.domains.technical.trim() && (
            <p className="text-xs">
              <span className="font-bold">Technical:</span> {data.domains.technical}
            </p>
          )}
          {data.domains.knowledge.trim() && (
            <p className="text-xs">
              <span className="font-bold">Knowledge:</span> {data.domains.knowledge}
            </p>
          )}
          {data.domains.nonTechnical.trim() && (
            <p className="text-xs">
              <span className="font-bold">Non-Technical:</span> {data.domains.nonTechnical}
            </p>
          )}
        </section>
      )}

      {hasContent(data.volunteering) && (
        <section className="mb-4">
          <h2 className="text-base uppercase mb-1">Volunteering</h2>
          <div className="border-t-2 border-gray-800 mb-2"></div>
          {data.volunteering.map((vol, idx) =>
            vol.role.trim() || vol.organization.trim() || vol.location.trim() ? (
              <p key={idx} className="text-xs mb-1">
                {[vol.role, vol.organization, capitalizeLocation(vol.location)].filter(Boolean).join(" | ")}
              </p>
            ) : null,
          )}
        </section>
      )}

      <div className="print:hidden mt-6 text-center">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Print Resume
        </button>
        <p className="text-xs mt-2 text-gray-600">
          Note: While printing, select the "Save as PDF" option in the destination field to save your resume as a PDF.
        </p>
      </div>
    </div>
  )
}

export default ResumeTemplate