import React, { useState } from 'react';
import { QUIZ_QUESTIONS, INITIAL_QUIZ_KEY } from '../constants';
import type { UserInputs, QuizQuestion } from '../types';
import WellnessPlanDisplay from '../components/WellnessPlanDisplay';
import BackgroundVideo from '../components/BackgroundVideo';

const initialAnswers: UserInputs = {
    courseSatisfaction: '', academicPressure: '', workload: '', peerComparison: '', impostorSyndrome: '', futureAnxiety: '',
    relationshipStatus: '', socialSatisfaction: '', loneliness: '', supportSystem: '', familyPressure: '',
    sleepQuality: '', stressManagement: '', energyLevels: '', interestLoss: '', feelingDown: '', anxiety: '', worrying: '',
    panicAttack: '', soughtTreatment: '', socialMediaImpact: '', doomscrolling: '', financialAnxiety: '', burnoutFeeling: ''
};

const QuizPage: React.FC = () => {
    const [currentQuestionKey, setCurrentQuestionKey] = useState<string>(INITIAL_QUIZ_KEY);
    const [history, setHistory] = useState<string[]>([]);
    const [answers, setAnswers] = useState<UserInputs>(initialAnswers);
    const [showResults, setShowResults] = useState(false);
    const [prediction, setPrediction] = useState('');

    const handleInputChange = (key: keyof UserInputs, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const predictMentalHealthRisk = (submittedAnswers: UserInputs): string => {
        let score = 0;
        const ans = submittedAnswers;
        const get = (key: keyof UserInputs) => ans[key] || '';
        const symptomWeights = { 'Not at all': 0, 'Several days': 1, 'More than half the days': 2, 'Nearly every day': 3 };
        score += symptomWeights[get('interestLoss') as keyof typeof symptomWeights] * 2;
        score += symptomWeights[get('feelingDown') as keyof typeof symptomWeights] * 2;
        score += symptomWeights[get('anxiety') as keyof typeof symptomWeights] * 1.5;
        score += symptomWeights[get('worrying') as keyof typeof symptomWeights] * 1.5;
        if (get('panicAttack') === 'Yes') score += 4;
        const burnoutWeights = { "Not at all": 0, "A few times": 1, "About once a week": 2, "Multiple times a week": 3, "Nearly every day": 4 };
        score += burnoutWeights[get('burnoutFeeling') as keyof typeof burnoutWeights];
        if (get('futureAnxiety') === 'A lot') score += 3;
        if (get('energyLevels') === 'Very low/Exhausted') score += 2;
        if (get('academicPressure') === 'Very High') score += 2;
        if (get('workload') === 'Overwhelming') score += 2;
        if (get('socialSatisfaction') === 'Very Dissatisfied') score += 2;
        if (get('supportSystem').includes('No')) score += 3;
        if (score >= 28) return 'High Risk';
        if (score >= 15) return 'Moderate Risk';
        return 'Low Risk';
    };
    
    const handleNext = () => {
        const currentQuestion = QUIZ_QUESTIONS[currentQuestionKey];
        const currentAnswer = answers[currentQuestionKey as keyof UserInputs];
        let nextQuestionKey: string;
        if (typeof currentQuestion.next === 'string') {
            nextQuestionKey = currentQuestion.next;
        } else if(currentAnswer) {
            nextQuestionKey = currentQuestion.next[currentAnswer];
        } else {
            return;
        }
        setHistory([...history, currentQuestionKey]);
        if (nextQuestionKey === 'END') {
            const result = predictMentalHealthRisk(answers);
            setPrediction(result);
            setShowResults(true);
        } else {
            setCurrentQuestionKey(nextQuestionKey);
        }
    };
    
    const handleBack = () => {
        const newHistory = [...history];
        const lastQuestionKey = newHistory.pop();
        if (lastQuestionKey) {
            setHistory(newHistory);
            setCurrentQuestionKey(lastQuestionKey);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionKey(INITIAL_QUIZ_KEY);
        setHistory([]);
        setAnswers(initialAnswers);
        setShowResults(false);
        setPrediction('');
    };

    const renderQuiz = () => {
        const question: QuizQuestion = QUIZ_QUESTIONS[currentQuestionKey];
        const questionKey = currentQuestionKey as keyof UserInputs;
        const isNextDisabled = !answers[questionKey];
        const answeredCount = history.length + 1;
        return (
            <div className="w-full max-w-2xl mx-auto">
                <div className="mb-4 text-center"><p className="text-primary font-semibold">{question.section}</p></div>
                <div className="mb-8">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-light-text/70">Progress</span>
                        <span className="text-sm font-medium text-light-text/70">Question {answeredCount}</span>
                    </div>
                    <div className="w-full bg-light-neutral rounded-full h-2.5">
                       <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(answeredCount * 5, 100)}%` }}></div>
                    </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-light-text min-h-[6rem] flex items-center justify-center">{question.question}</h2>
                <div className="min-h-[10rem]">
                    <div className="flex flex-col items-center space-y-3">
                        {question.options?.map(option => (
                            <button key={option} onClick={() => handleInputChange(questionKey, option)} className={`w-full max-w-xs p-3 rounded-lg text-lg transition-colors duration-300 ${answers[questionKey] === option ? 'bg-primary text-dark-bg ring-2 ring-primary-light' : 'bg-dark-bg text-light-text hover:bg-light-neutral'}`}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-12">
                    <button onClick={handleBack} disabled={history.length === 0} className="text-light-text/70 hover:text-light-text disabled:opacity-50 disabled:cursor-not-allowed">Back</button>
                    <button onClick={handleNext} disabled={isNextDisabled} className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-3 px-8 rounded-lg disabled:bg-light-neutral disabled:cursor-not-allowed">
                         {QUIZ_QUESTIONS[currentQuestionKey].next === 'END' ? 'See Results' : 'Next'}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="relative">
            <BackgroundVideo src="https://videos.pexels.com/video-files/7176026/7176026-uhd_2160_1440_25fps.mp4" />
            <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
                <div className="bg-dark-neutral/90 backdrop-blur-md p-8 md:p-12 rounded-xl border border-light-neutral/50">
                    {!showResults ? renderQuiz() : <div className="text-center"><h2 className="text-3xl font-bold mb-4">Results Ready</h2><WellnessPlanDisplay riskLevel={prediction} answers={answers} /><button onClick={resetQuiz} className="mt-8 text-primary underline">Restart Quiz</button></div>}
                </div>
            </div>
        </div>
    );
};

export default QuizPage;