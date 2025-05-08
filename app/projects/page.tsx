"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, FileText, Plus, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { ProjectUploadForm } from "@/components/project-upload-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Project {
  id: string
  title: string
  description: string
  githubUrl: string
  pdfUrl?: string
  codePreview?: string
  technologies: string[]
}

export default function ProjectsPage() {
  const { isAuthorized } = useAuth()
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [codeInput, setCodeInput] = useState("")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  // Sample projects data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "0",
      title: "AGRIFLOW - Smart Agriculture Management System",
      description:
        "Agriflow is an advanced smart agriculture management system that revolutionizes modern farming through the integration of IoT sensors, satellite imagery, machine learning, and big data analytics. The system provides real-time monitoring of soil moisture, nutrient levels, weather patterns, and crop health while enabling automated irrigation control and fertilization scheduling. Developed as part of the Software Engineering and Project Management course (21CSC303J), this project implements AI-powered irrigation scheduling based on real-time weather data, IoT-enabled soil moisture monitoring, and automated water management through a mobile/web interface. The system also generates comprehensive sustainability reports to track water usage and provides crop-specific irrigation recommendations.",
      githubUrl: "https://github.com/RUKMA03/-SEPM-AGRIFLOW-Smart-Irrigation-System",
      codePreview: `// Sample code from the AGRIFLOW Soil Moisture Monitoring Module

class SoilMoistureSensor {
  constructor(id, farmId, location) {
    this.id = id;
    this.farmId = farmId;
    this.location = location;
    this.readings = [];
    this.thresholds = {
      critical: 20,  // Critical low moisture level
      low: 30,       // Low moisture level
      optimal: 60,   // Optimal moisture level
      high: 80       // High moisture level
    };
  }

  // Simulate reading from sensor
  readMoisture() {
    // In a real implementation, this would read from actual hardware
    const reading = {
      value: Math.floor(Math.random() * 100),
      timestamp: new Date(),
      batteryLevel: 85
    };
    
    this.readings.push(reading);
    return reading;
  }

  // Get the latest reading
  getLatestReading() {
    if (this.readings.length === 0) {
      return null;
    }
    return this.readings[this.readings.length - 1];
  }

  // Check if irrigation is needed
  needsIrrigation() {
    const latest = this.getLatestReading();
    if (!latest) return false;
    
    return latest.value < this.thresholds.low;
  }

  // Get moisture status
  getMoistureStatus() {
    const latest = this.getLatestReading();
    if (!latest) return "unknown";
    
    const value = latest.value;
    
    if (value <= this.thresholds.critical) return "critical";
    if (value <= this.thresholds.low) return "low";
    if (value <= this.thresholds.optimal) return "optimal";
    return "high";
  }

  // Get historical data for analytics
  getHistoricalData(days = 7) {
    const now = new Date();
    const cutoff = new Date(now.setDate(now.getDate() - days));
    
    return this.readings.filter(reading => reading.timestamp >= cutoff);
  }
}

// Example usage
const sensor = new SoilMoistureSensor("sensor-001", "farm-123", { lat: 13.0827, lng: 80.2707 });

// Simulate readings over time
for (let i = 0; i < 10; i++) {
  const reading = sensor.readMoisture();
  console.log(\`Moisture reading: \${reading.value}% at \${reading.timestamp}\`);
}

// Check if irrigation is needed
if (sensor.needsIrrigation()) {
  console.log("Irrigation needed! Current status: " + sensor.getMoistureStatus());
} else {
  console.log("No irrigation needed. Current status: " + sensor.getMoistureStatus());
}

// Get historical data for the past week
const weekData = sensor.getHistoricalData(7);
console.log("Weekly readings:", weekData.length);`,
      technologies: ["IoT", "Machine Learning", "JavaScript", "Python", "React"],
    },
    {
      id: "1",
      title: "Air Traffic Control Simulation",
      description:
        "A 'Reinforcement Learning' ML model was used to predict flight paths and prevent collisions. This was done via a demo game and flight speeds could be adjusted to avoid collisions.",
      githubUrl: "https://github.com/RUKMA03/air-traffic-control",
      codePreview: `import numpy as np
import tensorflow as tf
from tensorflow import keras

# Define the Air Traffic Control environment
class ATCEnvironment:
    def __init__(self, num_aircraft=5):
        self.num_aircraft = num_aircraft
        self.reset()
        
    def reset(self):
        # Initialize aircraft positions randomly
        self.positions = np.random.rand(self.num_aircraft, 2) * 100
        # Initialize velocities
        self.velocities = np.random.rand(self.num_aircraft, 2) * 10 - 5
        return self._get_state()
        
    def _get_state(self):
        # Return current state (positions and velocities)
        return np.concatenate([self.positions.flatten(), self.velocities.flatten()])
        
    def step(self, actions):
        # Apply actions (acceleration adjustments)
        self.velocities += actions.reshape(self.num_aircraft, 2)
        # Update positions
        self.positions += self.velocities
        
        # Check for collisions
        collisions = self._check_collisions()
        
        # Calculate reward (negative for collisions, positive for maintaining safe distances)
        reward = -100 * collisions + 1
        
        # Check if episode is done
        done = collisions > 0 or np.any(self.positions < 0) or np.any(self.positions > 100)
        
        return self._get_state(), reward, done
        
    def _check_collisions(self):
        # Count number of collisions (aircraft too close to each other)
        collisions = 0
        for i in range(self.num_aircraft):
            for j in range(i+1, self.num_aircraft):
                dist = np.linalg.norm(self.positions[i] - self.positions[j])
                if dist < 5:  # Minimum safe distance
                    collisions += 1
        return collisions

# Create a simple DQN model
def create_model(state_size, action_size):
    model = keras.Sequential([
        keras.layers.Dense(64, activation='relu', input_shape=(state_size,)),
        keras.layers.Dense(64, activation='relu'),
        keras.layers.Dense(action_size, activation='linear')
    ])
    model.compile(optimizer='adam', loss='mse')
    return model

# Main training loop would go here
# This is a simplified example of the reinforcement learning approach`,
      technologies: ["Python", "Machine Learning", "Reinforcement Learning"],
    },
    {
      id: "2",
      title: "Book Recommendation System",
      description:
        "Developed a Python-based book recommendation system using collaborative filtering techniques. Processed data from platforms like Goodreads to extract user preferences and book features. Implemented machine learning algorithms to create personalized book suggestions.",
      githubUrl: "https://github.com/RUKMA03/book-recommendation",
      codePreview: `import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Load datasets
books_df = pd.read_csv('books.csv')
ratings_df = pd.read_csv('ratings.csv')
users_df = pd.read_csv('users.csv')

# Preprocess data
def preprocess_data():
    # Merge books with ratings
    df = pd.merge(ratings_df, books_df, on='book_id')
    
    # Create user-item matrix
    user_item_matrix = df.pivot_table(index='user_id', columns='book_id', values='rating')
    
    # Fill NaN values with 0
    user_item_matrix = user_item_matrix.fillna(0)
    
    return user_item_matrix, df

# Collaborative filtering - User-based
def user_based_recommendation(user_id, user_item_matrix, n_recommendations=5):
    # Calculate similarity between users
    user_similarity = cosine_similarity(user_item_matrix)
    
    # Convert to DataFrame for easier manipulation
    user_similarity_df = pd.DataFrame(user_similarity, 
                                     index=user_item_matrix.index, 
                                     columns=user_item_matrix.index)
    
    # Get similar users
    similar_users = user_similarity_df[user_id].sort_values(ascending=False)[1:11]
    
    # Get books read by target user
    books_read = user_item_matrix.loc[user_id]
    books_read = books_read[books_read > 0].index.tolist()
    
    # Get recommendations
    recommendations = []
    
    for similar_user, similarity in similar_users.items():
        # Get books rated highly by similar user
        similar_user_ratings = user_item_matrix.loc[similar_user]
        highly_rated = similar_user_ratings[similar_user_ratings > 3].index.tolist()
        
        # Recommend books not read by target user
        for book in highly_rated:
            if book not in books_read and book not in recommendations:
                recommendations.append((book, similarity))
                
    # Sort by similarity and get top n
    recommendations.sort(key=lambda x: x[1], reverse=True)
    top_recommendations = [book for book, _ in recommendations[:n_recommendations]]
    
    return top_recommendations

# Content-based filtering
def content_based_recommendation(book_id, books_df, n_recommendations=5):
    # Create TF-IDF vectorizer
    tfidf = TfidfVectorizer(stop_words='english')
    
    # Combine relevant text features
    books_df['content'] = books_df['title'] + ' ' + books_df['author'] + ' ' + books_df['genre']
    
    # Create TF-IDF matrix
    tfidf_matrix = tfidf.fit_transform(books_df['content'])
    
    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # Get index of the book
    idx = books_df[books_df['book_id'] == book_id].index[0]
    
    # Get similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))
    
    # Sort by similarity
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Get top n similar books (excluding the book itself)
    sim_scores = sim_scores[1:n_recommendations+1]
    
    # Get book indices
    book_indices = [i[0] for i in sim_scores]
    
    # Return recommended books
    return books_df.iloc[book_indices]['book_id'].tolist()

# Hybrid recommendation system
def hybrid_recommendation(user_id, book_id, user_item_matrix, books_df, n_recommendations=5):
    # Get collaborative filtering recommendations
    cf_recommendations = user_based_recommendation(user_id, user_item_matrix, n_recommendations)
    
    # Get content-based recommendations
    cb_recommendations = content_based_recommendation(book_id, books_df, n_recommendations)
    
    # Combine recommendations
    hybrid_recommendations = []
    
    # Add collaborative filtering recommendations with higher weight
    for book in cf_recommendations:
        hybrid_recommendations.append((book, 0.7))
    
    # Add content-based recommendations
    for book in cb_recommendations:
        # Check if book already in recommendations
        existing = [b for b, _ in hybrid_recommendations if b == book]
        
        if existing:
            # Update weight if book already recommended
            idx = hybrid_recommendations.index((book, 0.7))
            hybrid_recommendations[idx] = (book, 0.9)  # Increase weight
        else:
            hybrid_recommendations.append((book, 0.3))
    
    # Sort by weight
    hybrid_recommendations.sort(key=lambda x: x[1], reverse=True)
    
    # Return top n recommendations
    return [book for book, _ in hybrid_recommendations[:n_recommendations]]`,
      technologies: ["Python", "Machine Learning", "Collaborative Filtering", "Data Processing"],
    },
    {
      id: "3",
      title: "Currency Converter in Java",
      description:
        "A Java-based application designed to facilitate real-time currency conversions. It is built using Java Swing for the graphical user interface (GUI) and MySQL (SQLite) for data storage. The application enables users to enter an amount, select source and target currencies, and view the converted amount based on predefined exchange rates.",
      githubUrl: "https://github.com/RUKMA03/currency-converter",
      technologies: ["Java", "Swing", "MySQL", "SQLite"],
    },
  ])

  const handleAddProject = (newProject: Project) => {
    setProjects([...projects, newProject])
    setShowUploadForm(false)
  }

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
    setEditingProject(null)
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const handleAddCodePreview = (id: string) => {
    if (codeInput.trim()) {
      setProjects(
        projects.map((p) => {
          if (p.id === id) {
            return { ...p, codePreview: codeInput }
          }
          return p
        }),
      )
      setCodeInput("")
      setSelectedProjectId(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-portfolio-darkPurple dark:text-portfolio-lightPink">Projects</h1>
        {isAuthorized && (
          <Button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-portfolio-magenta hover:bg-portfolio-darkPurple"
          >
            {showUploadForm ? "Cancel" : "Add New Project"}
          </Button>
        )}
      </div>

      {showUploadForm && isAuthorized && (
        <div className="mb-8">
          <ProjectUploadForm onSubmit={handleAddProject} />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="bg-portfolio-lavender/10">
              <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
                {project.title}
              </CardTitle>
              <CardDescription>{project.technologies.join(" • ")}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 dark:text-gray-300">{project.description}</p>

              <Tabs defaultValue="description" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="description" className="flex-1">
                    Description
                  </TabsTrigger>
                  {project.codePreview && (
                    <TabsTrigger value="code" className="flex-1">
                      Code Preview
                    </TabsTrigger>
                  )}
                  {project.pdfUrl && (
                    <TabsTrigger value="pdf" className="flex-1">
                      PDF Report
                    </TabsTrigger>
                  )}
                </TabsList>
                <TabsContent value="description" className="mt-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    {project.title === "AGRIFLOW - Smart Agriculture Management System"
                      ? "The project was developed using a microservices architecture with a React frontend and Node.js backend. It features a responsive dashboard for farmers to monitor field conditions, set irrigation thresholds, and receive alerts. The system integrates with weather APIs and uses machine learning algorithms to optimize water usage based on crop type, soil conditions, and historical data patterns."
                      : project.description}
                  </p>
                </TabsContent>
                {project.codePreview && (
                  <TabsContent value="code" className="mt-2">
                    <pre className="max-h-60 overflow-auto rounded-md bg-gray-100 p-4 text-sm dark:bg-gray-800">
                      <code>{project.codePreview}</code>
                    </pre>
                  </TabsContent>
                )}
                {project.pdfUrl && (
                  <TabsContent value="pdf" className="mt-2">
                    <div className="flex justify-center">
                      <Button asChild variant="outline">
                        <Link href={project.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 h-4 w-4" />
                          View PDF Report
                        </Link>
                      </Button>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-800">
              <Button asChild variant="outline">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>

              {isAuthorized && (
                <div className="flex space-x-2">
                  {!project.codePreview && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Code Preview</DialogTitle>
                          <DialogDescription>Add code snippet for {project.title}</DialogDescription>
                        </DialogHeader>
                        <Textarea
                          value={codeInput}
                          onChange={(e) => setCodeInput(e.target.value)}
                          placeholder="Paste your code here..."
                          className="min-h-[300px] font-mono"
                        />
                        <Button
                          onClick={() => handleAddCodePreview(project.id)}
                          className="mt-4 bg-portfolio-magenta hover:bg-portfolio-darkPurple"
                        >
                          Save Code
                        </Button>
                      </DialogContent>
                    </Dialog>
                  )}

                  <Button variant="outline" size="icon" onClick={() => setEditingProject(project)}>
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {editingProject && (
        <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <ProjectUploadForm project={editingProject} onSubmit={handleUpdateProject} isEditing={true} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
