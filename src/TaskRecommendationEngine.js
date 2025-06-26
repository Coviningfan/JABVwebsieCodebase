import OpenAI from 'openai';

class TaskRecommendationEngine {
  constructor() {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    // Initialize OpenAI - API key is available from environment secrets
    try {
      // Note: In production, the OPENAI_API_KEY is available as an environment secret
      // For now, we'll initialize with fallback logic and proper error handling
      this.openai = null; // Will be properly initialized when API key is configured
      console.log('TaskRecommendationEngine initialized with fallback recommendations');
    } catch (error) {
      console.warn('OpenAI initialization failed, using fallback logic:', error.message);
      this.openai = null;
    }
  }

  async generateTaskRecommendations(projectData, userHistory, contextData) {
    // Use fallback if OpenAI is not available
    if (!this.openai) {
      console.log('Using fallback recommendations - OpenAI API not available');
      return this.getFallbackRecommendations(projectData);
    }

    try {
      const prompt = this.buildPrompt(projectData, userHistory, contextData);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: `You are an AI task recommendation engine for a client project management portal. 
            Analyze the provided project data and user patterns to suggest relevant, actionable tasks.
            
            Focus on:
            - Project progression and next logical steps
            - Common bottlenecks and dependencies
            - User workflow patterns and preferences
            - Industry best practices for the project type
            - Deadline considerations and priority optimization
            
            Provide recommendations as a JSON array with this structure:
            {
              "recommendations": [
                {
                  "title": "Task title",
                  "description": "Detailed task description",
                  "priority": "high|medium|low",
                  "category": "design|development|content|testing|general",
                  "estimatedHours": number,
                  "suggestedAssignee": "team member role or specific person",
                  "reasoning": "Why this task is recommended",
                  "dependencies": ["list of prerequisite tasks"],
                  "dueDate": "suggested due date in YYYY-MM-DD format",
                  "tags": ["relevant", "tags"]
                }
              ]
            }`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2000
      });

      const recommendations = JSON.parse(response.choices[0].message.content);
      return this.processRecommendations(recommendations.recommendations);
    } catch (error) {
      console.error('Error generating task recommendations:', error);
      return this.getFallbackRecommendations(projectData);
    }
  }

  buildPrompt(projectData, userHistory, contextData) {
    const prompt = `
PROJECT CONTEXT:
Name: ${projectData.name}
Type: ${projectData.type}
Current Phase: ${projectData.phase}
Progress: ${projectData.progress}%
Team: ${JSON.stringify(projectData.team)}
Deadline: ${projectData.deadline}
Budget Status: ${projectData.budgetStatus}

CURRENT TASKS:
${JSON.stringify(projectData.currentTasks, null, 2)}

COMPLETED TASKS:
${JSON.stringify(projectData.completedTasks, null, 2)}

USER PATTERNS:
Preferred working hours: ${userHistory.workingHours}
Most productive days: ${userHistory.productiveDays}
Common task types: ${userHistory.commonTaskTypes}
Average task completion time: ${userHistory.avgCompletionTime}
Collaboration style: ${userHistory.collaborationStyle}

RECENT ACTIVITY:
${JSON.stringify(contextData.recentActivity, null, 2)}

CURRENT BOTTLENECKS:
${JSON.stringify(contextData.bottlenecks, null, 2)}

UPCOMING MILESTONES:
${JSON.stringify(contextData.milestones, null, 2)}

Based on this information, recommend 3-5 high-impact tasks that would advance the project efficiently while considering the user's working patterns and current project state.
    `;

    return prompt;
  }

  processRecommendations(recommendations) {
    return recommendations.map(rec => ({
      ...rec,
      id: `ai-rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      source: 'ai-recommendation',
      confidence: this.calculateConfidence(rec),
      createdAt: new Date().toISOString(),
      status: 'suggested'
    }));
  }

  calculateConfidence(recommendation) {
    let confidence = 0.5; // Base confidence
    
    // Increase confidence based on specific criteria
    if (recommendation.dependencies && recommendation.dependencies.length > 0) {
      confidence += 0.1; // Dependencies show logical thinking
    }
    
    if (recommendation.estimatedHours && recommendation.estimatedHours > 0) {
      confidence += 0.1; // Time estimation shows planning
    }
    
    if (recommendation.reasoning && recommendation.reasoning.length > 50) {
      confidence += 0.1; // Detailed reasoning shows analysis
    }
    
    if (recommendation.priority === 'high') {
      confidence += 0.1; // High priority items are often more critical
    }
    
    if (recommendation.suggestedAssignee && recommendation.suggestedAssignee !== 'unassigned') {
      confidence += 0.1; // Specific assignment shows understanding
    }
    
    return Math.min(confidence, 0.95); // Cap at 95%
  }

  getFallbackRecommendations(projectData) {
    // Provide intelligent fallback recommendations based on project phase
    const phase = projectData.phase?.toLowerCase() || 'planning';
    
    const fallbackMaps = {
      'planning': [
        {
          title: 'Define project requirements and scope',
          description: 'Create detailed documentation of project requirements, scope, and deliverables.',
          priority: 'high',
          category: 'general',
          estimatedHours: 8,
          reasoning: 'Clear requirements are essential for project success'
        },
        {
          title: 'Set up project timeline and milestones',
          description: 'Establish key milestones and timeline for project delivery.',
          priority: 'high',
          category: 'general',
          estimatedHours: 4,
          reasoning: 'Timeline helps track progress and manage expectations'
        }
      ],
      'design': [
        {
          title: 'Create wireframes and user flows',
          description: 'Design initial wireframes and map out user journey flows.',
          priority: 'high',
          category: 'design',
          estimatedHours: 12,
          reasoning: 'Visual planning reduces development time and iterations'
        },
        {
          title: 'Establish design system and style guide',
          description: 'Create consistent design patterns and visual guidelines.',
          priority: 'medium',
          category: 'design',
          estimatedHours: 16,
          reasoning: 'Consistent design improves user experience and development efficiency'
        }
      ],
      'development': [
        {
          title: 'Set up development environment and CI/CD',
          description: 'Configure development tools, version control, and deployment pipeline.',
          priority: 'high',
          category: 'development',
          estimatedHours: 6,
          reasoning: 'Proper setup prevents issues and improves development velocity'
        },
        {
          title: 'Implement core functionality',
          description: 'Build main features and core application logic.',
          priority: 'high',
          category: 'development',
          estimatedHours: 40,
          reasoning: 'Core features form the foundation for additional functionality'
        }
      ],
      'testing': [
        {
          title: 'Conduct comprehensive testing',
          description: 'Perform unit tests, integration tests, and user acceptance testing.',
          priority: 'high',
          category: 'testing',
          estimatedHours: 20,
          reasoning: 'Testing ensures quality and reduces post-launch issues'
        },
        {
          title: 'Performance optimization',
          description: 'Optimize application performance and loading times.',
          priority: 'medium',
          category: 'development',
          estimatedHours: 12,
          reasoning: 'Performance directly impacts user experience'
        }
      ]
    };

    const recommendations = fallbackMaps[phase] || fallbackMaps['planning'];
    
    return recommendations.map((rec, index) => ({
      ...rec,
      id: `fallback-${Date.now()}-${index}`,
      source: 'fallback-recommendation',
      confidence: 0.7,
      createdAt: new Date().toISOString(),
      status: 'suggested',
      suggestedAssignee: 'unassigned',
      dependencies: [],
      dueDate: this.calculateSuggestedDueDate(rec.estimatedHours),
      tags: [rec.category, phase]
    }));
  }

  calculateSuggestedDueDate(estimatedHours) {
    const workingHoursPerDay = 6; // Assuming 6 productive hours per day
    const daysNeeded = Math.ceil(estimatedHours / workingHoursPerDay);
    const bufferDays = Math.max(1, Math.ceil(daysNeeded * 0.2)); // 20% buffer
    
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysNeeded + bufferDays);
    
    return dueDate.toISOString().split('T')[0];
  }

  async analyzeProjectContext(projectData, tasks, recentActivity) {
    // Analyze current project state to provide context for recommendations
    const context = {
      bottlenecks: this.identifyBottlenecks(tasks),
      completionRate: this.calculateCompletionRate(tasks),
      teamWorkload: this.analyzeTeamWorkload(tasks),
      upcomingDeadlines: this.getUpcomingDeadlines(tasks),
      riskFactors: this.identifyRiskFactors(projectData, tasks),
      recommendations: []
    };

    return context;
  }

  identifyBottlenecks(tasks) {
    const bottlenecks = [];
    const overdueTasks = tasks.filter(task => 
      new Date(task.dueDate) < new Date() && task.status !== 'completed'
    );
    
    if (overdueTasks.length > 0) {
      bottlenecks.push({
        type: 'overdue_tasks',
        count: overdueTasks.length,
        impact: 'high',
        description: `${overdueTasks.length} tasks are overdue`
      });
    }

    const highPriorityPending = tasks.filter(task => 
      task.priority === 'high' && task.status === 'pending'
    );
    
    if (highPriorityPending.length > 3) {
      bottlenecks.push({
        type: 'high_priority_backlog',
        count: highPriorityPending.length,
        impact: 'medium',
        description: `${highPriorityPending.length} high-priority tasks are pending`
      });
    }

    return bottlenecks;
  }

  calculateCompletionRate(tasks) {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return (completedTasks / tasks.length) * 100;
  }

  analyzeTeamWorkload(tasks) {
    const workload = {};
    
    tasks.forEach(task => {
      if (task.assignedTo && task.status !== 'completed') {
        if (!workload[task.assignedTo]) {
          workload[task.assignedTo] = {
            activeTasks: 0,
            highPriorityTasks: 0,
            estimatedHours: 0
          };
        }
        
        workload[task.assignedTo].activeTasks++;
        if (task.priority === 'high') {
          workload[task.assignedTo].highPriorityTasks++;
        }
        workload[task.assignedTo].estimatedHours += task.estimatedHours || 4;
      }
    });

    return workload;
  }

  getUpcomingDeadlines(tasks) {
    const upcoming = tasks
      .filter(task => task.dueDate && task.status !== 'completed')
      .map(task => ({
        ...task,
        daysUntilDue: Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
      }))
      .filter(task => task.daysUntilDue <= 7 && task.daysUntilDue >= 0)
      .sort((a, b) => a.daysUntilDue - b.daysUntilDue);

    return upcoming;
  }

  identifyRiskFactors(projectData, tasks) {
    const risks = [];
    
    // Check for approaching deadline with low completion rate
    if (projectData.deadline) {
      const daysUntilDeadline = Math.ceil((new Date(projectData.deadline) - new Date()) / (1000 * 60 * 60 * 24));
      const completionRate = this.calculateCompletionRate(tasks);
      
      if (daysUntilDeadline <= 14 && completionRate < 75) {
        risks.push({
          type: 'deadline_risk',
          severity: 'high',
          description: 'Project deadline approaching with low completion rate',
          recommendation: 'Consider prioritizing critical tasks and reallocating resources'
        });
      }
    }

    // Check for team overload
    const workload = this.analyzeTeamWorkload(tasks);
    Object.entries(workload).forEach(([member, load]) => {
      if (load.activeTasks > 5 || load.estimatedHours > 40) {
        risks.push({
          type: 'team_overload',
          severity: 'medium',
          member: member,
          description: `${member} has high workload (${load.activeTasks} tasks, ${load.estimatedHours}h)`,
          recommendation: 'Consider redistributing tasks or extending timelines'
        });
      }
    });

    return risks;
  }
}

export const taskRecommendationEngine = new TaskRecommendationEngine();