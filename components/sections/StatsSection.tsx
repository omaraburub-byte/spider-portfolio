import { Trophy, Target, Award, Star, Code, Users } from 'lucide-react'

const stats = [
  { icon: Trophy, value: 'Top 15', label: 'IEEE Researcher', color: 'text-yellow-500' },
  { icon: Target, value: 'Rank 691', label: 'Global CTF', color: 'text-green-500' },
  { icon: Award, value: '1st Place', label: 'SEC4 Winner', color: 'text-spider-red' },
  { icon: Code, value: '20+', label: 'Projects', color: 'text-spider-blue' },
  { icon: Users, value: '3 Teams', label: 'Led', color: 'text-spider-neon' },
  { icon: Star, value: '89.2%', label: 'GPA', color: 'text-purple-500' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="font-barrio text-5xl text-center mb-12 text-white">
          SPIDER ACHIEVEMENTS
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-spider-gray border border-gray-800 rounded-xl p-6 text-center hover:border-spider-red transition-all duration-300 group hover:scale-105"
            >
              <div className={`inline-block p-3 rounded-full bg-black mb-4 ${stat.color} group-hover:bg-opacity-20`}>
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-bold mb-2 text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}