import { useState } from 'react';

const techCategories = [
  {
    title: "Languages",
    items: [
      { name: "TypeScript", icon: "fab fa-js-square", color: "text-blue-400" },
      { name: "JavaScript", icon: "fab fa-js", color: "text-yellow-400" },
      { name: "Python", icon: "fab fa-python", color: "text-green-400" },
      { name: "Swift", icon: "fab fa-swift", color: "text-orange-400" },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "React", icon: "fab fa-react", color: "text-cyan-400" },
      { name: "React Native", icon: "fab fa-react", color: "text-blue-300" },
      { name: "Next.js", icon: "fas fa-globe", color: "text-white" },
      { name: "Node.js", icon: "fab fa-node-js", color: "text-green-500" },
    ],
  },
  {
    title: "Cloud & Data",
    items: [
      { name: "PostgreSQL", icon: "fas fa-database", color: "text-blue-500" },
      { name: "AWS", icon: "fab fa-aws", color: "text-orange-400" },
      { name: "Docker", icon: "fab fa-docker", color: "text-blue-400" },
      { name: "Supabase", icon: "fas fa-bolt", color: "text-green-400" },
    ],
  },
];

export function AboutSection() {
  const [showTech, setShowTech] = useState(false);

  return (
    <section id="about" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About JABV Labs</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Based in Reno, Nevada — we build custom mobile apps and websites for businesses nationwide.
            No templates, no shortcuts. Every line of code is written for your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: "fas fa-code",
              title: "Custom Development",
              desc: "Every project is built from scratch. We don't use page builders or cookie-cutter templates.",
            },
            {
              icon: "fas fa-users",
              title: "Client-First Process",
              desc: "Agile sprints with frequent check-ins. You see progress every week, not just at launch.",
            },
            {
              icon: "fas fa-rocket",
              title: "Launch & Beyond",
              desc: "We handle deployment, monitoring, and ongoing maintenance so you can focus on your business.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-neutral-800/60 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-neutral-700/50 text-center"
            >
              <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className={`${item.icon} text-2xl text-red-500`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowTech(!showTech)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-full text-white font-medium transition-all duration-300"
          >
            View Our Tech Stack
            <i className={`fas fa-chevron-down transition-transform duration-300 ${showTech ? 'rotate-180' : ''}`}></i>
          </button>
        </div>

        {showTech && (
          <div className="mt-12 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-8">
              {techCategories.map((cat, catIdx) => (
                <div key={catIdx}>
                  <h4 className="text-lg font-semibold mb-4 text-center text-red-500">
                    {cat.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {cat.items.map((tech, techIdx) => (
                      <div
                        key={techIdx}
                        className="bg-neutral-800/50 p-4 rounded-xl text-center hover:bg-red-600/10 hover:scale-105 transition-all duration-300 border border-neutral-700/50"
                      >
                        <i className={`${tech.icon} text-2xl ${tech.color} mb-2 block`}></i>
                        <p className="text-xs font-medium text-gray-300">{tech.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
