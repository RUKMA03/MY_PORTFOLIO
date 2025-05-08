export default function SkillsPage() {
  const technicalSkills = [
    "Python",
    "C++",
    "Power BI",
    "Tableau",
    "SQL",
    "NoSQL",
    "Oracle Cloud",
    "MS Office Suite",
    "Git/GitHub",
    "Colab",
    "Understanding Data Flow",
    "ETL Pipeline Transformations",
  ]

  const nonTechnicalSkills = [
    "Public Speaking",
    "Leadership",
    "Teamwork",
    "Analytical and Logical Reasoning",
    "Conflict Resolution",
    "Creative Writing",
    "Dancing",
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-portfolio-darkPurple dark:text-portfolio-lightPink">
        Skills
      </h1>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-portfolio-deepPurple dark:text-portfolio-pink">
          Technical Skills
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technicalSkills.map((skill) => (
            <div key={skill} className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="text-lg font-medium text-portfolio-darkPurple dark:text-portfolio-lightPink">{skill}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold text-portfolio-deepPurple dark:text-portfolio-pink">
          Non-Technical Skills
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nonTechnicalSkills.map((skill) => (
            <div key={skill} className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="text-lg font-medium text-portfolio-darkPurple dark:text-portfolio-lightPink">{skill}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
