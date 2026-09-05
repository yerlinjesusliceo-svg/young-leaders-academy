export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password && password.length >= 6
}

export const validateAge = (age) => {
  const ageNum = parseInt(age)
  return ageNum >= 13 && ageNum <= 100
}

export const specializations = [
  { id: 'creativity', name: '🎨 Creatividad & Diseño' },
  { id: 'leadership', name: '🎤 Liderazgo & Oratoria' },
  { id: 'diplomacy', name: '🌎 Diplomacia & MUN' },
  { id: 'innovation', name: '💡 Innovación & Emprendimiento' },
  { id: 'technology', name: '💻 Tecnología' }
]

export const getSpecializationName = (id) => {
  const spec = specializations.find(s => s.id === id)
  return spec ? spec.name : id
}