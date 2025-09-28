import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lightbulb, 
  Clock, 
  Apple, 
  Smile, 
  Shield, 
  Heart,
  Coffee,
  Moon,
  Baby,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  content: string;
  category: 'daily' | 'nutrition' | 'problems' | 'children';
  icon: any;
  difficulty: 'easy' | 'medium' | 'hard';
  timeToRead: string;
}

const tips: Tip[] = [
  {
    id: 'brushing-technique',
    title: 'Правильная техника чистки зубов',
    content: 'Держите зубную щетку под углом 45° к деснам. Делайте небольшие круговые движения, уделяя каждому зубу 2-3 секунды. Не забывайте чистить язык - на нем скапливается много бактерий!',
    category: 'daily',
    icon: Smile,
    difficulty: 'easy',
    timeToRead: '2 мин'
  },
  {
    id: 'flossing-guide',
    title: 'Как правильно использовать зубную нить',
    content: 'Отрежьте 45-50 см нити, намотайте на средние пальцы. Аккуратно введите нить между зубами и делайте движения вверх-вниз. Для каждого промежутка используйте чистый участок нити.',
    category: 'daily',
    icon: Shield,
    difficulty: 'medium',
    timeToRead: '3 мин'
  },
  {
    id: 'foods-for-teeth',
    title: 'Продукты для здоровых зубов',
    content: 'Молочные продукты богаты кальцием, морковь и яблоки естественно очищают зубы, зеленый чай содержит фтор. Избегайте липких сладостей и кислых напитков.',
    category: 'nutrition',
    icon: Apple,
    difficulty: 'easy',
    timeToRead: '2 мин'
  },
  {
    id: 'coffee-stains',
    title: 'Как предотвратить пятна от кофе',
    content: 'Пейте кофе через трубочку, полощите рот водой после кофе, добавляйте молоко - оно нейтрализует кислоты. Чистите зубы через 30-60 минут после кофе, не сразу!',
    category: 'nutrition',
    icon: Coffee,
    difficulty: 'easy',
    timeToRead: '2 мин'
  },
  {
    id: 'night-routine',
    title: 'Вечерняя гигиена полости рта',
    content: 'Вечером очистка должна быть более тщательной. Последовательность: зубная нить, полоскание, чистка зубов фторсодержащей пастой. Не ешьте после вечерней чистки!',
    category: 'daily',
    icon: Moon,
    difficulty: 'medium',
    timeToRead: '3 мин'
  },
  {
    id: 'sensitivity',
    title: 'Что делать при чувствительности зубов',
    content: 'Используйте пасту для чувствительных зубов, избегайте очень горячей и холодной пищи, не чистите зубы слишком жестко. При сильной чувствительности обратитесь к стоматологу.',
    category: 'problems',
    icon: AlertCircle,
    difficulty: 'medium',
    timeToRead: '2 мин'
  },
  {
    id: 'bad-breath',
    title: 'Борьба с неприятным запахом изо рта',
    content: 'Основная причина - бактерии на языке и между зубами. Чистите язык, используйте зубную нить, пейте больше воды. Жевательная резинка без сахара стимулирует слюноотделение.',
    category: 'problems',
    icon: XCircle,
    difficulty: 'easy',
    timeToRead: '2 мин'
  },
  {
    id: 'children-teeth',
    title: 'Уход за детскими зубами',
    content: 'Начинайте чистить зубы с появления первого зуба. До 2 лет - без пасты или с минимальным количеством. Делайте чистку зубов игрой, используйте детские песенки!',
    category: 'children',
    icon: Baby,
    difficulty: 'medium',
    timeToRead: '3 мин'
  },
  {
    id: 'whitening-natural',
    title: 'Естественное отбеливание зубов',
    content: 'Ешьте клубнику (содержит яблочную кислоту), полощите рот водой с содой 1-2 раза в неделю, избегайте красящих продуктов. Помните: здоровые зубы важнее белых!',
    category: 'daily',
    icon: CheckCircle,
    difficulty: 'easy',
    timeToRead: '2 мин'
  }
];

const categories = [
  { id: 'daily', name: 'Ежедневный уход', icon: Clock },
  { id: 'nutrition', name: 'Питание', icon: Apple },
  { id: 'problems', name: 'Проблемы', icon: AlertCircle },
  { id: 'children', name: 'Детские зубы', icon: Baby }
];

export const DentalTips = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('daily');
  const [readTips, setReadTips] = useState<Set<string>>(new Set());

  const filteredTips = tips.filter(tip => tip.category === selectedCategory);

  const markAsRead = (tipId: string) => {
    setReadTips(prev => new Set([...prev, tipId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'dental-success';
      case 'medium': return 'dental-warning';
      case 'hard': return 'dental-danger';
      default: return 'primary';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легко';
      case 'medium': return 'Средне';
      case 'hard': return 'Сложно';
      default: return 'Обычно';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          Полезные советы по уходу за зубами
        </CardTitle>
        <CardDescription>
          Изучите полезные советы и рекомендации от профессиональных стоматологов
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredTips.map((tip) => {
                  const Icon = tip.icon;
                  const isRead = readTips.has(tip.id);
                  
                  return (
                    <Card 
                      key={tip.id}
                      className={`transition-all duration-200 hover:shadow-md ${
                        isRead ? 'bg-secondary/30' : 'bg-card'
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">{tip.title}</CardTitle>
                          </div>
                          {isRead && (
                            <CheckCircle className="h-5 w-5 text-dental-success" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`bg-${getDifficultyColor(tip.difficulty)}/10 text-${getDifficultyColor(tip.difficulty)} border-${getDifficultyColor(tip.difficulty)}`}
                          >
                            {getDifficultyText(tip.difficulty)}
                          </Badge>
                          <Badge variant="outline" className="bg-muted">
                            <Clock className="h-3 w-3 mr-1" />
                            {tip.timeToRead}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {tip.content}
                        </p>
                        <Button
                          variant={isRead ? "outline" : "default"}
                          size="sm"
                          onClick={() => markAsRead(tip.id)}
                          disabled={isRead}
                          className="w-full"
                        >
                          {isRead ? 'Прочитано' : 'Отметить как прочитанное'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Нужна персональная консультация?</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Получите индивидуальные рекомендации от наших опытных стоматологов. 
            Первая консультация бесплатно!
          </p>
          <div className="flex gap-3">
            <Button className="flex-1">
              Записаться на консультацию
            </Button>
            <Button variant="outline" className="flex-1">
              Задать вопрос
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Прочитано советов: {readTips.size} из {tips.length}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};