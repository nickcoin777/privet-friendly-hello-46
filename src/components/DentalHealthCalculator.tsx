import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Heart, Calendar } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 'brushing',
    question: 'Как часто вы чистите зубы?',
    options: [
      { value: 'twice', label: 'Два раза в день', score: 10 },
      { value: 'once', label: 'Один раз в день', score: 5 },
      { value: 'sometimes', label: 'Нерегулярно', score: 2 },
      { value: 'rarely', label: 'Редко', score: 0 }
    ]
  },
  {
    id: 'flossing',
    question: 'Используете ли вы зубную нить?',
    options: [
      { value: 'daily', label: 'Ежедневно', score: 10 },
      { value: 'weekly', label: 'Несколько раз в неделю', score: 7 },
      { value: 'monthly', label: 'Иногда', score: 3 },
      { value: 'never', label: 'Никогда', score: 0 }
    ]
  },
  {
    id: 'dentist',
    question: 'Когда вы последний раз посещали стоматолога?',
    options: [
      { value: 'recent', label: 'Менее 6 месяцев назад', score: 10 },
      { value: 'year', label: 'В течение года', score: 7 },
      { value: 'years', label: '1-2 года назад', score: 3 },
      { value: 'long', label: 'Более 2 лет назад', score: 0 }
    ]
  },
  {
    id: 'symptoms',
    question: 'Есть ли у вас зубная боль или дискомфорт?',
    options: [
      { value: 'none', label: 'Нет симптомов', score: 10 },
      { value: 'mild', label: 'Легкий дискомфорт', score: 6 },
      { value: 'occasional', label: 'Периодическая боль', score: 3 },
      { value: 'severe', label: 'Сильная боль', score: 0 }
    ]
  },
  {
    id: 'diet',
    question: 'Как часто вы употребляете сладкие напитки и еду?',
    options: [
      { value: 'rarely', label: 'Редко', score: 10 },
      { value: 'weekly', label: 'Несколько раз в неделю', score: 6 },
      { value: 'daily', label: 'Ежедневно', score: 3 },
      { value: 'multiple', label: 'Несколько раз в день', score: 0 }
    ]
  }
];

export const DentalHealthCalculator = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(opt => opt.value === answerValue);
      if (option) totalScore += option.score;
    });
    setScore(totalScore);
    setShowResult(true);
  };

  const getHealthLevel = (score: number) => {
    if (score >= 40) return { level: 'Отличное', color: 'dental-success', icon: Shield };
    if (score >= 30) return { level: 'Хорошее', color: 'dental-primary', icon: Heart };
    if (score >= 20) return { level: 'Удовлетворительное', color: 'dental-warning', icon: AlertTriangle };
    return { level: 'Требует внимания', color: 'dental-danger', icon: AlertTriangle };
  };

  const getRecommendations = (score: number) => {
    if (score >= 40) {
      return [
        'Продолжайте отличную гигиену полости рта!',
        'Регулярно посещайте стоматолога для профилактики',
        'Поделитесь своим опытом с друзьями'
      ];
    }
    if (score >= 30) {
      return [
        'Улучшите регулярность чистки зубов',
        'Добавьте использование зубной нити',
        'Запишитесь на профилактический осмотр'
      ];
    }
    if (score >= 20) {
      return [
        'Обязательно посетите стоматолога в ближайшее время',
        'Пересмотрите диету - ограничьте сладкое',
        'Начните использовать зубную нить ежедневно'
      ];
    }
    return [
      'Срочно обратитесь к стоматологу!',
      'Начните ежедневную гигиену полости рта',
      'Исключите сладкие напитки из рациона'
    ];
  };

  const resetCalculator = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScore(null);
    setShowResult(false);
  };

  if (showResult && score !== null) {
    const healthData = getHealthLevel(score);
    const recommendations = getRecommendations(score);
    const Icon = healthData.icon;

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Icon className={`h-16 w-16 text-${healthData.color}`} />
          </div>
          <CardTitle className="text-2xl">Результат оценки</CardTitle>
          <CardDescription>
            Ваш результат: {score} из 50 баллов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge 
              variant="outline" 
              className={`text-lg px-4 py-2 bg-${healthData.color}/10 text-${healthData.color} border-${healthData.color}`}
            >
              {healthData.level} здоровье зубов
            </Badge>
          </div>
          
          <Progress value={(score / 50) * 100} className="h-3" />
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Рекомендации для вас:
            </h3>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg">
            <p className="text-sm text-center">
              <strong>Хотите профессиональную консультацию?</strong><br />
              Запишитесь на бесплатную консультацию к нашим специалистам
            </p>
            <Button className="w-full mt-3" size="lg">
              Записаться на консультацию
            </Button>
          </div>

          <Button variant="outline" onClick={resetCalculator} className="w-full">
            Пройти тест заново
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Оценка здоровья ваших зубов
        </CardTitle>
        <CardDescription>
          Вопрос {currentQuestion + 1} из {questions.length}
        </CardDescription>
        <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">
            {questions[currentQuestion].question}
          </h3>
          <RadioGroup 
            onValueChange={handleAnswer}
            value={answers[questions[currentQuestion].id] || ''}
          >
            {questions[currentQuestion].options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <Button 
          onClick={nextQuestion}
          disabled={!answers[questions[currentQuestion].id]}
          className="w-full"
          size="lg"
        >
          {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Получить результат'}
        </Button>
      </CardContent>
    </Card>
  );
};