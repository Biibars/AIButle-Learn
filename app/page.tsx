"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, BarChart3, Users, Settings, Plus, Clock, Zap, TrendingUp } from "lucide-react"

const progressData = [
  { week: "Пн", completed: 4 },
  { week: "Вт", completed: 3 },
  { week: "Ср", completed: 5 },
  { week: "Чт", completed: 4 },
  { week: "Пт", completed: 6 },
  { week: "Сб", completed: 3 },
  { week: "Вс", completed: 2 },
]

const performanceData = [
  { name: "Математика", value: 85 },
  { name: "Физика", value: 72 },
  { name: "Химия", value: 78 },
  { name: "Биология", value: 88 },
]

const colors = ["#2563EB", "#22D3EE", "#10B981", "#F59E0B"]

export default function Page() {
  const [activeNav, setActiveNav] = useState("dashboard")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <nav className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <h1 className="font-bold text-lg">LearnAI</h1>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2">
          {[
            { id: "dashboard", label: "Главная", icon: BarChart3 },
            { id: "materials", label: "Материалы", icon: BookOpen },
            { id: "progress", label: "Прогресс", icon: TrendingUp },
            { id: "groups", label: "Группы", icon: Users },
            { id: "settings", label: "Настройки", icon: Settings },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeNav === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent/30 rounded-lg p-4 text-sm">
            <p className="font-semibold mb-2">Активность неделя</p>
            <p className="text-xs opacity-80">42 минуты обучения</p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {activeNav === "dashboard" && <DashboardView />}
          {activeNav === "materials" && <MaterialsView />}
          {activeNav === "progress" && <ProgressView />}
          {activeNav === "groups" && <GroupsView />}
          {activeNav === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  )
}

function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Добро пожаловать, Барсбек</h2>
        <p className="text-muted-foreground">Здесь ваш персональный учебный план</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Предметов", value: "6", icon: BookOpen },
          { label: "Заданий выполнено", value: "24", icon: BarChart3 },
          { label: "Текущая серия", value: "12 дн.", icon: Clock },
          { label: "Рейтинг класса", value: "85%", icon: TrendingUp },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Мои предметы</CardTitle>
                  <CardDescription>Активные курсы и темы</CardDescription>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" /> Добавить
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Математика", progress: 75, color: "bg-primary" },
                  { name: "Физика", progress: 60, color: "bg-accent" },
                  { name: "Английский", progress: 85, color: "bg-green-500" },
                ].map((subject, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{subject.name}</span>
                      <span className="text-xs text-muted-foreground">{subject.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${subject.color}`} style={{ width: `${subject.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Расписание</CardTitle>
            <CardDescription>На сегодня</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { time: "09:00", task: "Лекция по математике", duration: "1ч 30м" },
              { time: "11:00", task: "Практика физика", duration: "45м" },
              { time: "15:00", task: "Тест по химии", duration: "1ч" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-2 bg-muted/30 rounded-lg">
                <span className="font-semibold text-primary text-sm w-12">{item.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.task}</p>
                  <p className="text-xs text-muted-foreground">{item.duration}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MaterialsView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Учебные материалы</h2>
        <p className="text-muted-foreground">Сгенерированные конспекты, тесты и схемы</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { type: "Конспект", title: "Основы алгебры", date: "2 дн. назад", icon: "📝" },
          { type: "Тест", title: "Производные", date: "3 дн. назад", icon: "✓", badge: "92%" },
          { type: "Схема", title: "Периодическая таблица", date: "5 дн. назад", icon: "📊" },
          { type: "Шпаргалка", title: "Формулы физики", date: "1 нед. назад", icon: "⭐" },
          { type: "Тест", title: "Грамматика английского", date: "1 нед. назад", icon: "✓", badge: "88%" },
          { type: "Конспект", title: "История Средневековья", date: "2 нед. назад", icon: "📝" },
        ].map((material, i) => (
          <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{material.icon}</span>
                {material.badge && (
                  <span className="bg-green-500/20 text-green-700 text-xs font-bold px-2 py-1 rounded">
                    {material.badge}
                  </span>
                )}
              </div>
              <h3 className="font-semibold mb-1">{material.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{material.type}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{material.date}</span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                  →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ProgressView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Анализ прогресса</h2>
        <p className="text-muted-foreground">Ваша статистика и достижения</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Активность на неделе</CardTitle>
            <CardDescription>Выполненные задания по дням</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="week" stroke="currentColor" opacity={0.5} style={{ fontSize: "12px" }} />
                <YAxis stroke="currentColor" opacity={0.5} style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                />
                <Bar dataKey="completed" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance by Subject */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Успеваемость по предметам</CardTitle>
            <CardDescription>Средний балл</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Достижения</CardTitle>
          <CardDescription>Ваши награды и мотивация</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🔥", title: "Огненная серия", desc: "12 дней подряд" },
              { emoji: "⭐", title: "Отличник", desc: "90%+ на 3 тестах" },
              { emoji: "🚀", title: "Быстрый старт", desc: "30 мин за сессию" },
              { emoji: "🏆", title: "Лидер", desc: "Top 10 в классе" },
            ].map((achievement, i) => (
              <div key={i} className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-4xl mb-2">{achievement.emoji}</div>
                <p className="text-sm font-semibold">{achievement.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GroupsView() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Учебные группы</h2>
          <p className="text-muted-foreground">Совместное обучение с однклассниками</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Создать группу
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "Математика 10А", members: 8, shared: 12, activity: "2 часа назад" },
          { name: "Подготовка к ОГЭ", members: 15, shared: 24, activity: "30 мин назад" },
          { name: "Английский разговорный", members: 6, shared: 8, activity: "1 час назад" },
          { name: "Физика - вариант B", members: 10, shared: 16, activity: "4 часа назад" },
        ].map((group, i) => (
          <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3">{group.name}</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">👥 {group.members} участников</p>
                <p className="text-muted-foreground">📂 {group.shared} файлов</p>
                <p className="text-muted-foreground">🕐 Активность: {group.activity}</p>
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Перейти →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Настройки</h2>
        <p className="text-muted-foreground">Управление профилем и предпочтениями</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Имя</label>
            <input
              type="text"
              defaultValue="Барсбек Турганалиев"
              className="w-full px-3 py-2 border border-border rounded-lg bg-card"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <input
              type="email"
              defaultValue="bars@gmail.com"
              className="w-full px-3 py-2 border border-border rounded-lg bg-card"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Сохранить</Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Уведомления</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Напоминания о заданиях", "Результаты тестов", "Сообщения группы", "Еженедельный отчет"].map((notif, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm">{notif}</span>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
