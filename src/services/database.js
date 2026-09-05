// Local database service using localStorage for development
// In production, this would connect to a real backend

const db = {
  // Users storage
  users: JSON.parse(localStorage.getItem('users') || '[]'),

  // Modules storage
  modules: JSON.parse(localStorage.getItem('modules') || '[]'),

  // Activities storage
  activities: JSON.parse(localStorage.getItem('activities') || '[]'),

  // Skills storage
  skills: JSON.parse(localStorage.getItem('skills') || '[]'),

  // Achievements storage
  achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),

  // Save to localStorage
  save() {
    localStorage.setItem('users', JSON.stringify(this.users))
    localStorage.setItem('modules', JSON.stringify(this.modules))
    localStorage.setItem('activities', JSON.stringify(this.activities))
    localStorage.setItem('skills', JSON.stringify(this.skills))
    localStorage.setItem('achievements', JSON.stringify(this.achievements))
  },

  // User methods
  createUser(user) {
    const id = Date.now().toString()
    const newUser = {
      id,
      ...user,
      createdAt: new Date().toISOString(),
      progress: 0,
      modulesCompleted: 0,
      activitiesCompleted: 0,
      skillsCount: 0,
      achievementsCount: 0,
      projectStatus: 'no iniciado',
      graduated: false
    }
    this.users.push(newUser)
    this.save()
    return newUser
  },

  getUserByEmail(email) {
    return this.users.find(u => u.email === email)
  },

  getUserById(id) {
    return this.users.find(u => u.id === id)
  },

  updateUser(id, updates) {
    const user = this.getUserById(id)
    if (user) {
      Object.assign(user, updates)
      this.save()
      return user
    }
    return null
  },

  getAllUsers() {
    return this.users
  },

  // Module methods
  createModule(module) {
    const id = Date.now().toString()
    const newModule = {
      id,
      ...module,
      createdAt: new Date().toISOString(),
      active: true
    }
    this.modules.push(newModule)
    this.save()
    return newModule
  },

  getModulesBySpecialization(specialization) {
    return this.modules.filter(m => m.specialization === specialization && m.active)
  },

  updateModule(id, updates) {
    const module = this.modules.find(m => m.id === id)
    if (module) {
      Object.assign(module, updates)
      this.save()
      return module
    }
    return null
  },

  deleteModule(id) {
    this.modules = this.modules.filter(m => m.id !== id)
    this.save()
  },

  // Activity methods
  createActivity(activity) {
    const id = Date.now().toString()
    const newActivity = {
      id,
      ...activity,
      createdAt: new Date().toISOString(),
      studentProgress: []
    }
    this.activities.push(newActivity)
    this.save()
    return newActivity
  },

  getActivitiesBySpecialization(specialization) {
    return this.activities.filter(a => a.specialization === specialization)
  },

  updateActivity(id, updates) {
    const activity = this.activities.find(a => a.id === id)
    if (activity) {
      Object.assign(activity, updates)
      this.save()
      return activity
    }
    return null
  },

  deleteActivity(id) {
    this.activities = this.activities.filter(a => a.id !== id)
    this.save()
  },

  completeActivity(studentId, activityId) {
    const activity = this.activities.find(a => a.id === activityId)
    if (activity) {
      if (!activity.studentProgress) activity.studentProgress = []
      if (!activity.studentProgress.includes(studentId)) {
        activity.studentProgress.push(studentId)
      }
      this.save()
      return activity
    }
    return null
  },

  // Skill methods
  createSkill(skill) {
    const id = Date.now().toString()
    const newSkill = {
      id,
      ...skill,
      createdAt: new Date().toISOString(),
      studentSkills: []
    }
    this.skills.push(newSkill)
    this.save()
    return newSkill
  },

  updateSkill(id, updates) {
    const skill = this.skills.find(s => s.id === id)
    if (skill) {
      Object.assign(skill, updates)
      this.save()
      return skill
    }
    return null
  },

  deleteSkill(id) {
    this.skills = this.skills.filter(s => s.id !== id)
    this.save()
  },

  assignSkillToStudent(studentId, skillId, percentage) {
    const skill = this.skills.find(s => s.id === skillId)
    if (skill) {
      if (!skill.studentSkills) skill.studentSkills = []
      const existing = skill.studentSkills.find(ss => ss.studentId === studentId)
      if (existing) {
        existing.percentage = percentage
      } else {
        skill.studentSkills.push({ studentId, percentage })
      }
      this.save()
      return skill
    }
    return null
  },

  getStudentSkills(studentId) {
    return this.skills.filter(s => s.studentSkills && s.studentSkills.some(ss => ss.studentId === studentId))
      .map(s => ({
        ...s,
        percentage: s.studentSkills.find(ss => ss.studentId === studentId)?.percentage
      }))
  },

  // Achievement methods
  createAchievement(achievement) {
    const id = Date.now().toString()
    const newAchievement = {
      id,
      ...achievement,
      createdAt: new Date().toISOString(),
      assignedTo: []
    }
    this.achievements.push(newAchievement)
    this.save()
    return newAchievement
  },

  assignAchievementToStudent(studentId, achievementId) {
    const achievement = this.achievements.find(a => a.id === achievementId)
    if (achievement) {
      if (!achievement.assignedTo.includes(studentId)) {
        achievement.assignedTo.push(studentId)
      }
      this.save()
      return achievement
    }
    return null
  },

  getStudentAchievements(studentId) {
    return this.achievements.filter(a => a.assignedTo && a.assignedTo.includes(studentId))
  },

  deleteAchievement(id) {
    this.achievements = this.achievements.filter(a => a.id !== id)
    this.save()
  }
}

export default db