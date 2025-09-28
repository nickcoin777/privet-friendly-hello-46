import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Smile, Frown, Meh, Trophy, Star, ArrowRight } from 'lucide-react';

interface QuestStage {
  id: string;
  title: string;
  description: string;
  question: string;
  options: { id: string; text: string; correct: boolean; explanation: string }[];
  tip: string;
}

const questStages: QuestStage[] = [
  {
    id: 'brushing-time',
    title: 'Время чистки зубов',
    description: 'Узнайте правильное время для чистки зубов',
    question: 'Сколько времени должна длиться чистка зубов?',
    options: [
      { id: '30sec', text: '30 секунд', correct: false, explanation: 'Слишком мало! За 30 секунд невозможно качественно очистить все зубы.' },
      { id: '1min', text: '1 минута', correct: false, explanation: 'Недостаточно времени для тщательной очистки всех поверхностей зубов.' },
      { id: '2min', text: '2 минуты', correct: true, explanation: 'Правильно! 2 минуты - оптимальное время для качественной чистки зубов.' },
      { id: '5min', text: '5 минут', correct: false, explanation: 'Слишком долго! Избыточная чистка может повредить эмаль.' }
    ],
    tip: 'Используйте таймер на телефоне или электрическую зубную щетку с встроенным таймером!'
  },
  {
    id: 'flossing-frequency',
    title: 'Зубная нить',
    description: 'Важность использования зубной нити',
    question: 'Как часто следует использовать зубную нить?',
    options: [
      { id: 'weekly', text: 'Раз в неделю', correct: false, explanation: 'Недостаточно! Налет между зубами образуется ежедневно.' },
      { id: 'daily', text: 'Каждый день', correct: true, explanation: 'Отлично! Ежедневное использование зубной нити предотвращает кариес между зубами.' },
      { id: 'after-meals', text: 'После каждого приема пищи', correct: false, explanation: 'Слишком часто! Достаточно одного раза в день.' },
      { id: 'never', text: 'Не обязательно', correct: false, explanation: 'Неправильно! Зубная щетка не может очистить межзубные промежутки.' }
    ],
    tip: 'Лучше всего использовать зубную нить перед сном, чтобы удалить весь накопившийся налет.'
  },
  {
    id: 'sugar-impact',
    title: 'Сахар и зубы',
    description: 'Влияние сахара на здоровье зубов',
    question: 'Что происходит с зубами при частом употреблении сладкого?',
    options: [
      { id: 'nothing', text: 'Ничего особенного', correct: false, explanation: 'Неверно! Сахар серьезно влияет на здоровье зубов.' },
      { id: 'acid-attack', text: 'Бактерии вырабатывают кислоту, разрушающую эмаль', correct: true, explanation: 'Правильно! Бактерии питаются сахаром и выделяют кислоту, которая разрушает зубную эмаль.' },
      { id: 'stronger', text: 'Зубы становятся крепче', correct: false, explanation: 'Наоборот! Сахар ослабляет зубы.' },
      { id: 'whiter', text: 'Зубы становятся белее', correct: false, explanation: 'Неправильно! Сахар способствует образованию налета и потемнению зубов.' }
    ],
    tip: 'Если едите сладкое, прополощите рот водой и почистите зубы через 30-60 минут.'
  },
  {
    id: 'dentist-visits',
    title: 'Визиты к стоматологу',
    description: 'Регулярность профилактических осмотров',
    question: 'Как часто здоровому человеку нужно посещать стоматолога?',
    options: [
      { id: 'yearly', text: 'Раз в год', correct: false, explanation: 'Слишком редко! За год могут развиться серьезные проблемы.' },
      { id: 'twice-yearly', text: 'Два раза в год', correct: true, explanation: 'Правильно! Профилактические осмотры каждые 6 месяцев помогают предотвратить проблемы.' },
      { id: 'monthly', text: 'Каждый месяц', correct: false, explanation: 'Слишком часто для здорового человека!' },
      { id: 'when-hurts', text: 'Только когда болит', correct: false, explanation: 'Неправильно! Профилактика лучше лечения.' }
    ],
    tip: 'Регулярные осмотры позволяют выявить проблемы на ранней стадии, когда лечение проще и дешевле.'
  }
];

export const DentalQuest = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean[]>([]);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questStages[currentStage];
    const selectedOption = currentQuestion.options.find(opt => opt.id === selectedAnswer);
    const isCorrect = selectedOption?.correct || false;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnsweredCorrectly(prev => [...prev, isCorrect]);
    setShowResult(true);
  };

  const nextStage = () => {
    if (currentStage < questStages.length - 1) {
      setCurrentStage(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quest completed
      setCurrentStage(-1);
    }
  };

  const resetQuest = () => {
    setCurrentStage(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredCorrectly([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questStages.length) * 100;
    if (percentage === 100) return { message: 'Превосходно! Вы эксперт по здоровью зубов!', icon: Trophy, color: 'dental-success' };
    if (percentage >= 75) return { message: 'Отлично! У вас хорошие знания о здоровье зубов!', icon: Smile, color: 'dental-primary' };
    if (percentage >= 50) return { message: 'Хорошо! Есть что изучить дополнительно.', icon: Meh, color: 'dental-warning' };
    return { message: 'Стоит больше узнать о здоровье зубов!', icon: Frown, color: 'dental-danger' };
  };

  // Quest completed screen
  if (currentStage === -1) {
    const scoreData = getScoreMessage();
    const Icon = scoreData.icon;

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Icon className={`h-16 w-16 text-${scoreData.color}`} />
          </div>
          <CardTitle className="text-2xl">Квест завершен!</CardTitle>
          <CardDescription>
            Ваш результат: {score} из {questStages.length} правильных ответов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge 
              variant="outline" 
              className={`text-lg px-4 py-2 bg-${scoreData.color}/10 text-${scoreData.color} border-${scoreData.color}`}
            >
              {scoreData.message}
            </Badge>
          </div>
          
          <Progress value={(score / questStages.length) * 100} className="h-3" />
          
          <div className="bg-secondary/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Заработанные знания:
            </h3>
            <ul className="text-sm space-y-1">
              <li>• Правильное время чистки зубов</li>
              <li>• Важность зубной нити</li>
              <li>• Влияние сахара на зубы</li>
              <li>• Регулярность визитов к стоматологу</li>
            </ul>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <p className="text-center font-medium">
              Готовы применить знания на практике?
            </p>
            <Button className="w-full mt-3" size="lg">
              Записаться на консультацию
            </Button>
          </div>

          <Button variant="outline" onClick={resetQuest} className="w-full">
            Пройти квест заново
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questStages[currentStage];
  const selectedOption = selectedAnswer ? currentQuestion.options.find(opt => opt.id === selectedAnswer) : null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Этап {currentStage + 1} из {questStages.length}
          </Badge>
          <div className="flex items-center gap-1">
            {Array.from({ length: questStages.length }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < currentStage ? 'bg-dental-success' :
                  i === currentStage ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
        <CardDescription>{currentQuestion.description}</CardDescription>
        <Progress value={((currentStage + 1) / questStages.length) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.id}
                variant={selectedAnswer === option.id ? "default" : "outline"}
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => handleAnswerSelect(option.id)}
                disabled={showResult}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>

        {showResult && selectedOption && (
          <div className={`p-4 rounded-lg border-2 ${
            selectedOption.correct 
              ? 'bg-dental-success/10 border-dental-success/30' 
              : 'bg-dental-danger/10 border-dental-danger/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {selectedOption.correct ? (
                <Smile className="h-5 w-5 text-dental-success" />
              ) : (
                <Frown className="h-5 w-5 text-dental-danger" />
              )}
              <span className="font-medium">
                {selectedOption.correct ? 'Правильно!' : 'Неправильно!'}
              </span>
            </div>
            <p className="text-sm mb-3">{selectedOption.explanation}</p>
            <div className="bg-primary/10 p-3 rounded border border-primary/20">
              <p className="text-sm">
                <strong>Совет:</strong> {currentQuestion.tip}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {!showResult ? (
            <Button 
              onClick={submitAnswer}
              disabled={!selectedAnswer}
              className="flex-1"
              size="lg"
            >
              Ответить
            </Button>
          ) : (
            <Button 
              onClick={nextStage}
              className="flex-1"
              size="lg"
            >
              {currentStage < questStages.length - 1 ? (
                <>
                  Следующий этап
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Завершить квест'
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};