import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DentalHealthCalculator } from '@/components/DentalHealthCalculator';
import { DentalQuest } from '@/components/DentalQuest';
import { DentalTips } from '@/components/DentalTips';
import { Calculator, Map, Lightbulb, Smile, Star, Users, Award } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/40 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
              <Smile className="h-8 w-8" />
              Интерактивный гид по здоровью зубов
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Узнайте больше о здоровье ваших зубов с помощью интерактивных инструментов и получите персональные рекомендации от экспертов
            </p>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="bg-primary/5 border-b border-border/20">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">10,000+ довольных пациентов</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-dental-warning" />
              <span className="text-sm font-medium">15+ лет опыта</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-dental-success" />
              <span className="text-sm font-medium">Современное оборудование</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Тест</span>
              </TabsTrigger>
              <TabsTrigger value="quest" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Квест</span>
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Советы</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="text-center mb-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 mb-3">
                Оценка здоровья зубов
              </Badge>
              <h2 className="text-2xl font-bold mb-2">Проверьте здоровье ваших зубов</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Пройдите быстрый тест из 5 вопросов и получите персональную оценку состояния ваших зубов с рекомендациями
              </p>
            </div>
            <DentalHealthCalculator />
          </TabsContent>

          {/* Quest Tab */}
          <TabsContent value="quest" className="space-y-6">
            <div className="text-center mb-6">
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 mb-3">
                Обучающий квест
              </Badge>
              <h2 className="text-2xl font-bold mb-2">Квест "Здоровая улыбка"</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Пройдите интерактивный квест и узнайте важные факты о правильном уходе за зубами в игровой форме
              </p>
            </div>
            <DentalQuest />
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="text-center mb-6">
              <Badge variant="outline" className="bg-dental-success/10 text-dental-success border-dental-success/30 mb-3">
                Экспертные советы
              </Badge>
              <h2 className="text-2xl font-bold mb-2">Полезные советы от стоматологов</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Изучите проверенные рекомендации по уходу за зубами от профессиональных стоматологов
              </p>
            </div>
            <DentalTips />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border/20 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Готовы к профессиональному уходу?</h3>
            <p className="text-muted-foreground mb-4">
              Запишитесь на бесплатную консультацию и получите персональный план лечения
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md font-medium transition-colors">
                Записаться на прием
              </button>
              <button className="border border-primary text-primary hover:bg-primary/10 px-6 py-2 rounded-md font-medium transition-colors">
                Задать вопрос
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Виджет для интеграции в WordPress Elementor
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
