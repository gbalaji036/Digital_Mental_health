import type { NavLink, Testimonial, QuizQuestion, Resource, FaqItem, VideoResource, Quote, MindfulExercise, PositiveStory, YogaAsana } from './types';
import { IconHeart, IconCloud, IconLeaf, IconSun, IconMoon, IconStar } from './components/IconComponents';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/', isPrimary: true },
  { name: 'Wellness Test', path: '/quiz', isPrimary: true },
  { name: 'AI Companion', path: '/chatbot', isPrimary: true },
  { name: 'Positivity Wall', path: '/positivity-wall', isPrimary: true },
  { name: 'Wellbeing Hub', path: '/activities', isPrimary: true },
  { name: 'Resources', path: '/resources' },
  { name: 'Learn', path: '/diseases' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "This platform was a guiding light during a tough semester. The AI chatbot provided a safe space to vent, and the resources were incredibly helpful.",
    author: 'Alex Johnson',
    role: 'Computer Science Student',
  },
  {
    quote: "I was hesitant at first, but the anonymity of the wellness test encouraged me to seek help. The results gave me the clarity I needed.",
    author: 'Priya Sharma',
    role: 'Arts & Humanities Student',
  },
  {
    quote: "A truly calming and well-designed space. It feels less like a clinical tool and more like a supportive friend. Highly recommended.",
    author: 'Ben Carter',
    role: 'Graduate Student',
  },
];

export const INITIAL_QUIZ_KEY = 'academicPressure';

export const QUIZ_QUESTIONS: Record<string, QuizQuestion> = {
  academicPressure: {
    question: "First, let's talk about school. How would you rate the academic pressure you're currently experiencing?",
    type: 'radio',
    section: "Your Academic Life",
    options: ["Very Low", "Low", "Manageable", "High", "Very High"],
    next: {
      "Very Low": 'workload',
      "Low": 'workload',
      "Manageable": 'workload',
      "High": 'sourceOfPressure',
      "Very High": 'sourceOfPressure'
    }
  },
  sourceOfPressure: {
    question: "That sounds tough. Where do you feel most of that pressure is coming from?",
    type: 'radio',
    section: "Your Academic Life",
    options: ["Mostly from myself", "From my family", "Comparing myself to peers", "From my professors/program"],
    next: 'workload'
  },
  workload: {
    question: "How manageable do you find your current academic workload?",
    type: 'radio',
    section: "Your Academic Life",
    options: ["Very manageable", "Manageable", "A bit much", "Overwhelming"],
    next: {
      "Very manageable": 'courseSatisfaction',
      "Manageable": 'courseSatisfaction',
      "A bit much": 'copingWithWorkload',
      "Overwhelming": 'copingWithWorkload',
    }
  },
  copingWithWorkload: {
      question: "When it feels like too much, what's your typical response?",
      type: 'radio',
      section: "Your Academic Life",
      options: ["I push through", "I procrastinate", "I ask for help", "I feel paralyzed"],
      next: 'courseSatisfaction'
  },
  courseSatisfaction: {
    question: "And how satisfied are you with your chosen course/major overall?",
    type: 'radio',
    section: "Your Academic Life",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
    next: 'futureAnxiety'
  },
  futureAnxiety: {
    question: "Looking ahead, how much anxiety do you feel about your career prospects after graduation?",
    type: 'radio',
    section: "Your Academic Life",
    options: ["None", "A little", "A moderate amount", "A lot"],
    next: 'relationshipStatus'
  },
  relationshipStatus: {
    question: "Thanks for sharing. Now, thinking about your personal life, what's your current romantic relationship status?",
    type: 'radio',
    section: "Your Social & Personal Life",
    options: ["Single", "Casually dating", "In a committed relationship", "It's complicated"],
    next: {
      'Single': 'satisfactionWithSingleLife',
      'In a committed relationship': 'relationshipHealth',
      "It's complicated": 'relationshipStress',
      'Casually dating': 'relationshipStress'
    }
  },
  satisfactionWithSingleLife: {
    question: "How do you feel about being single right now?",
    type: 'radio',
    section: "Your Social & Personal Life",
    options: ["Empowered and happy", "Content, it's fine", "A bit lonely sometimes", "I really dislike it"],
    next: 'socialSatisfaction'
  },
  relationshipHealth: {
    question: "How would you describe your current relationship?",
    type: 'radio',
    section: "Your Social & Personal Life",
    options: ["Supportive and happy", "Mostly good, some ups and downs", "It's a source of stress", "It's very difficult right now"],
    next: 'socialSatisfaction'
  },
  relationshipStress: {
    question: "How much of your mental energy does dating / your situation take up?",
    type: 'radio',
    section: "Your Social & Personal Life",
    options: ["Not much, it's fun", "A noticeable amount", "A lot, it's draining", "It's constantly on my mind"],
    next: 'socialSatisfaction'
  },
  socialSatisfaction: {
    question: "Outside of romance, how satisfied are you with your social life (friendships, etc.)?",
    type: 'radio',
    section: "Your Social & Personal Life",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
    next: 'supportSystem'
  },
  supportSystem: {
    question: "Do you feel you have a reliable support system (friends, family) you can talk to when things get tough?",
    type: 'radio',
    section: "Your Social & Personal Life",
    options: ["Yes, definitely", "Yes, somewhat", "Not really", "No, I handle things on my own"],
    next: 'sleepQuality'
  },
  sleepQuality: {
    question: "Let's check in on your daily routine. Over the last two weeks, how would you rate your sleep quality?",
    type: 'radio',
    section: "Your Daily Well-being",
    options: ["Very Good", "Good", "Fair", "Poor", "Very Poor"],
    next: 'socialMediaImpact'
  },
  socialMediaImpact: {
    question: "How does using social media typically make you feel about your own life?",
    type: 'radio',
    section: "Your Daily Well-being",
    options: ["Inspired or connected", "No real difference", "Slightly worse / FOMO", "Significantly worse"],
    next: 'doomscrolling'
  },
  doomscrolling: {
      question: "How often do you find yourself endlessly scrolling through negative news or social media feeds?",
      type: 'radio',
      section: "Your Daily Well-being",
      options: ["Rarely, I avoid it", "Sometimes, but I can stop", "Often, it's hard to stop", "It's a daily habit"],
      next: 'financialAnxiety'
  },
  financialAnxiety: {
      question: "How often do you worry about your financial situation (student loans, daily expenses)?",
      type: 'radio',
      section: "Your Daily Well-being",
      options: ["Rarely", "Sometimes", "Often", "Constantly"],
      next: 'burnoutFeeling'
  },
  burnoutFeeling: {
      question: "Over the past month, how often have you felt completely 'burned out' (emotionally, physically, and mentally exhausted)?",
      type: 'radio',
      section: "Your Daily Well-being",
      options: ["Not at all", "A few times", "About once a week", "Multiple times a week", "Nearly every day"],
      next: 'interestLoss'
  },
  interestLoss: {
    question: "Finally, a few specific questions. Over the last two weeks, how often have you been bothered by little interest or pleasure in doing things?",
    type: 'radio',
    section: "How You've Been Feeling",
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    next: 'feelingDown'
  },
  feelingDown: {
    question: "Over the last two weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    type: 'radio',
    section: "How You've Been Feeling",
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    next: 'anxiety'
  },
  anxiety: {
    question: "Over the last two weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    type: 'radio',
    section: "How You've Been Feeling",
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    next: 'worrying'
  },
  worrying: {
    question: "Over the last two weeks, how often have you been bothered by not being able to stop or control worrying?",
    type: 'radio',
    section: "How You've Been Feeling",
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    next: 'panicAttack'
  },
  panicAttack: {
    question: "Have you experienced a sudden period of intense fear or discomfort (a panic attack) in the last month?",
    type: 'radio',
    section: "How You've Been Feeling",
    options: ["Yes", "No"],
    next: 'soughtTreatment'
  },
  soughtTreatment: {
    question: "Have you ever sought professional help for your mental health?",
    type: 'radio',
    section: "How You've Been Feeling",
    options: ["Yes, currently", "Yes, in the past", "I've considered it", "No"],
    next: 'END'
  }
};


export const RESOURCES: Resource[] = [
    { title: 'KIRAN Mental Health Helpline', description: '24/7, free and confidential support provided by the Govt. of India.', link: 'tel:1800-599-0019', type: 'helpline' },
    { title: 'Vandrevala Foundation', description: '24/7, free crisis counseling over the phone.', link: 'tel:9999666555', type: 'helpline' },
    { title: 'iCall (TISS)', description: 'Psychosocial support by the Tata Institute of Social Sciences (Mon-Sat, 10AM-8PM).', link: 'tel:022-25521111', type: 'helpline' },
    { title: 'Mindful Breathing Exercises', description: 'A simple guide to calm your mind and body through breathing.', link: '#/activities/mindfulness/breathing', type: 'guide' },
    { title: 'Understanding Cognitive Behavioral Therapy (CBT)', description: 'Learn about a powerful technique for managing anxiety and depression.', link: '#/diseases', type: 'guide' },
    { title: 'Seeking Professional Help', description: "Learn about the benefits of counseling and how to find a provider that's right for you.", link: '#/diseases', type: 'guide' },
];

export const FAQS: FaqItem[] = [
    {
        question: "Is this service confidential?",
        answer: "Yes, your privacy is our top priority. The Wellness Test is completely anonymous, and your conversations with the AI Companion are private and not shared."
    },
    {
        question: "Is the AI Companion a replacement for a therapist?",
        answer: "No. The AI Companion is a supportive tool designed for emotional support, journaling, and providing resources. It is not a substitute for professional medical advice, diagnosis, or treatment. We strongly encourage you to connect with a qualified counselor for personalized care."
    },
    {
        question: "What happens if I'm in a crisis?",
        answer: "If you are in immediate danger or a crisis, please call 112 or a crisis hotline like the KIRAN Mental Health Helpline at 1800-599-0019. Our platform provides quick access to these numbers on the Resources page and other relevant sections."
    },
    {
        question: "How does the Mental Wellness Test work?",
        answer: "The test is a short, adaptive questionnaire based on clinically validated screening tools. It asks about your feelings and experiences over the past few weeks to provide a general indication of your mental well-being and suggest appropriate next steps."
    }
];

export const VIDEO_RESOURCES: VideoResource[] = [
    {
        title: "I had a black dog, his name was depression",
        description: "A moving illustration by the WHO, based on Matthew Johnstone's book, on what it's like to live with depression.",
        videoId: "XiCrniLQGYc"
    },
    {
        title: "The Power of Vulnerability",
        description: "Brené Brown studies human connection — our ability to empathize, belong, love. In a poignant, funny talk, she shares a deep insight from her research.",
        videoId: "iCvmsMzlF7o"
    },
    {
        title: "How to make stress your friend",
        description: "Psychologist Kelly McGonigal urges us to see stress as a positive, and introduces us to an unsung mechanism for stress reduction: reaching out to others.",
        videoId: "RcGyVTAoXEU"
    },
];

export const INSPIRATIONAL_QUOTES: Quote[] = [
    { quote: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
    { quote: "The best way out is always through.", author: "Robert Frost" },
    { quote: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.", author: "Bhagavad Gita 2.47" },
    { quote: "Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself.", author: "Hermann Hesse" },
    { quote: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh" },
    { quote: "To be happy is a great decision. To be peaceful is a great attainment.", author: "Valmiki, Ramayana" },
];

export const MINDFUL_EXERCISES: MindfulExercise[] = [
    {
        title: "Mindful Eating",
        description: "Take one bite of your food. Chew it slowly, noticing the taste, texture, and smell. Pay full attention to this single bite before taking another. This helps ground you in the present moment."
    },
    {
        title: "Five Senses",
        description: "Pause and notice: 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This is a quick way to anchor yourself to your surroundings."
    },
    {
        title: "Mindful Walking",
        description: "As you walk, pay attention to the sensation of your feet on the ground. Notice the movement of your legs and the feeling of the air on your skin. If your mind wanders, gently bring it back to the sensation of walking."
    },
    {
        title: "Body Scan",
        description: "Close your eyes. Bring your attention to the top of your head and slowly scan down to your toes. Notice any sensations—warmth, coolness, tingling, pressure—without judgment. Simply observe."
    }
];

export const POSITIVE_STORIES: PositiveStory[] = [
    {
        title: "The Ripple of Kindness",
        content: "In a small town, someone paid for the coffee of the person behind them in line. That person, moved by the gesture, helped an elderly neighbor with their groceries. The kindness continued to spread, with each small act inspiring another, reminding everyone of the power of a simple, selfless gesture."
    },
    {
        title: "A Childhood Memory",
        content: "Think back to a favorite childhood memory. What did it feel like? Was it the smell of rain on a hot day, the taste of your favorite meal, or the sound of laughter with a friend? Let that warm feeling fill you for a moment. What made it special?"
    },
    {
        title: "Cultural Celebration",
        content: "Recall a favorite cultural festival or tradition. What are the sights, sounds, and smells you associate with it? Whether it's the lights of Diwali, the colors of Holi, or the warmth of a family gathering, connect with the joy and sense of belonging it brings."
    }
];

export const MOOD_DATA = {
    categories: [
        { name: "Happy", color: "text-primary", bgColor: "bg-primary/10", moods: [{ emoji: "😄", name: "Joyful" }, { emoji: "😊", name: "Content" }, { emoji: "🤩", name: "Excited" }, { emoji: "🥰", name: "Grateful" }, { emoji: "😌", name: "Peaceful" }, { emoji: "😁", name: "Motivated" }] },
        { name: "Calm", color: "text-blue-400", bgColor: "bg-blue-400/10", moods: [{ emoji: "🙂", name: "Calm" }, { emoji: "🤔", name: "Reflective" }, { emoji: "🧘", name: "Mindful" }, { emoji: "😪", name: "Tired" }] },
        { name: "Sad", color: "text-indigo-400", bgColor: "bg-indigo-400/10", moods: [{ emoji: "😔", name: "Sad" }, { emoji: "😞", name: "Disappointed" }, { emoji: "😢", name: "Hurt" }, { emoji: "😩", name: "Lonely" }] },
        { name: "Anxious", color: "text-accent", bgColor: "bg-accent/10", moods: [{ emoji: "😟", name: "Worried" }, { emoji: "😬", name: "Anxious" }, { emoji: "😫", name: "Stressed" }, { emoji: "🤯", name: "Overwhelmed" }] },
        { name: "Angry", color: "text-red-500", bgColor: "bg-red-500/10", moods: [{ emoji: "😠", name: "Angry" }, { emoji: "😤", name: "Frustrated" }, { emoji: "😒", name: "Irritated" }, { emoji: "😑", name: "Annoyed" }] },
    ],
    tags: ["Academic", "Social", "Family", "Work", "Health", "Sleep", "Relationship", "Future", "Personal Growth", "Other"]
};


export const JOURNAL_PROMPTS = {
    "Happy": [
        "What’s one thing that brought you joy today, and how did it feel in your body?",
        "Describe a recent accomplishment you're proud of, big or small.",
        "Write about someone who makes you feel grateful. What do you appreciate most about them?",
        "What are you most looking forward to right now?"
    ],
    "Calm": [
        "Describe the environment around you right now using all five senses.",
        "What does 'peace' feel like to you? Where do you find it?",
        "Write about a simple pleasure you enjoyed recently.",
        "If you could rest without any obligations, what would that look like?"
    ],
    "Sad": [
        "It's okay to feel this way. What is this sadness trying to tell you?",
        "Write a compassionate letter to yourself, acknowledging your pain.",
        "What is one small thing you could do to be kind to yourself right now?",
        "Describe a happy memory in detail."
    ],
    "Anxious": [
        "What are the worries on your mind? Write them down to get them out of your head.",
        "What is within your control right now, and what is outside of it?",
        "Describe what feeling 'safe' and 'grounded' would be like for you.",
        "If you could give your anxiety a shape and color, what would it be?"
    ],
    "Angry": [
        "What is fueling this anger? Write it out without judgment.",
        "What boundary might have been crossed?",
        "What would a constructive expression of this feeling look like?",
        "Beneath the anger, is there another feeling, like hurt or fear?"
    ],
    "General": [
        "What is something that made you smile today, no matter how small?",
        "Describe a challenge you've recently overcome. What did you learn from it?",
        "If you could give your past self some advice, what would it be?",
        "What is one thing you are looking forward to this week?",
        "Describe a place where you feel completely at peace.",
        "What is a skill you'd love to learn and why?",
        "Write about a time you felt proud of yourself.",
        "What's a simple pleasure that you often take for granted?",
        "If you had an extra hour in your day, how would you spend it?",
        "What is one positive thing you can do for yourself today?",
        "List three things you like about yourself."
    ]
};

export const MEMORY_CARDS_DATA = [
    { type: 'sun', Icon: IconSun }, { type: 'moon', Icon: IconMoon }, { type: 'heart', Icon: IconHeart },
    { type: 'star', Icon: IconStar }, { type: 'cloud', Icon: IconCloud }, { type: 'leaf', Icon: IconLeaf },
];

export const YOGA_ASANAS: YogaAsana[] = [
  {
    id: 'sukhasana',
    name: "Easy Pose",
    sanskritName: "Sukhasana",
    benefits: "The foundational pose for meditation and emotional stability. It strengthens the back and improves hip flexibility while calming the brain.",
    steps: [
      "Sit on your mat with legs extended.",
      "Cross your shins, widen your knees, and slip each foot beneath the opposite knee.",
      "Keep your pelvis in a neutral position and stack your shoulders over your hips.",
      "Rest your hands on your knees with palms up for receptivity or down for grounding.",
      "Stay for 5-10 minutes with focused breathing."
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    focus: "Inner Calm, Spinal Alignment, Hips",
    didYouKnow: "In Sanskrit, 'Sukha' means joy, happiness, or ease. This pose is designed to cultivate those qualities internally.",
    physiologicalEffect: "Reduces sympathetic nervous system activity, lowering heart rate and promoting mental clarity.",
    cautions: "Avoid if you have recent or chronic knee or hip injuries."
  },
  {
    id: 'balasana',
    name: "Child's Pose",
    sanskritName: "Balasana",
    benefits: "A restorative posture that provides a deep sense of safety. It releases tension in the back, shoulders, and chest while quieting the internal 'noise'.",
    steps: [
      "Kneel on the floor with your big toes touching and sit on your heels.",
      "Separate your knees about as wide as your hips.",
      "As you exhale, lay your torso down between your thighs.",
      "Rest your forehead on the mat and stretch your arms forward or alongside your body.",
      "Stay in the pose for 1 to 3 minutes, breathing into your back body."
    ],
    image: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?q=80&w=1200&auto=format&fit=crop",
    focus: "Back Decompression, Rest, Stress Release",
    didYouKnow: "This pose mimics the fetal position, which is cross-culturally recognized as the ultimate posture of comfort and protection.",
    physiologicalEffect: "Triggers the parasympathetic response, slowing down the breath and reducing blood cortisol levels.",
    cautions: "Avoid if you have knee injuries or high blood pressure without support."
  },
  {
    id: 'viparita',
    name: "Legs-Up-The-Wall",
    sanskritName: "Viparita Karani",
    benefits: "Excellent for anxiety and insomnia. It facilitates venous drainage and increases circulation to the upper body, relieving heavy or tired legs.",
    steps: [
      "Place your mat perpendicular to a wall.",
      "Sit sideways with your hip against the wall, then swing your legs up as you lower your back.",
      "Rest your arms out to the sides with palms up.",
      "Close your eyes and breathe naturally, allowing gravity to ground your femur bones into the sockets.",
      "Stay for 5 to 15 minutes."
    ],
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1200&auto=format&fit=crop",
    focus: "Circulation, Adrenal Recovery, Lymphatic Flow",
    didYouKnow: "Ancient yogic texts refer to this as a 'rejuvenation' pose that can restore youthfulness by reversing gravity's effect on the body.",
    physiologicalEffect: "Increases blood flow to the brain and heart while giving the heart a rest from pumping against gravity.",
    cautions: "Avoid during menstruation or if you have glaucoma or serious neck injuries."
  },
  {
    id: 'marjaryasana',
    name: "Cat-Cow Flow",
    sanskritName: "Marjaryasana-Bitilasana",
    benefits: "Synchronizes breath with movement to develop focus and spinal mobility. It releases tension in the neck and lower back.",
    steps: [
      "Start on hands and knees (tabletop position).",
      "Inhale, drop your belly, and look up toward the ceiling (Cow).",
      "Exhale, round your spine, and tuck your chin to your chest (Cat).",
      "Move slowly and fluidly with each breath cycle for 10-15 repetitions."
    ],
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1200&auto=format&fit=crop",
    focus: "Spine Flexibility, Breath Connection, Core",
    didYouKnow: "This sequence is one of the most effective ways to 'wake up' the spine and central nervous system in the morning.",
    physiologicalEffect: "Massages the internal organs and helps regulate the flow of spinal fluid.",
    cautions: "If you have a neck injury, keep the head in line with the torso."
  },
  {
    id: 'uttanasana',
    name: "Forward Fold",
    sanskritName: "Uttanasana",
    benefits: "A powerful pose for quieting an overactive mind. It stretches the hamstrings and helps relieve headaches and fatigue.",
    steps: [
      "Stand with feet hip-width apart.",
      "Exhale and fold forward from the hip joints, not the waist.",
      "Let your head hang heavy and hold your opposite elbows.",
      "If your hamstrings are tight, keep a slight bend in your knees.",
      "Breathe deeply into the back of your legs and stay for 1 minute."
    ],
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?q=80&w=1200&auto=format&fit=crop",
    focus: "Mental Quiet, Hamstrings, Brain Circulation",
    didYouKnow: "Forward folds are biologically 'introspective' postures that naturally turn our attention inward and away from external stressors.",
    physiologicalEffect: "Inverting the torso lowers the heart rate and brings freshly oxygenated blood to the brain.",
    cautions: "Avoid if you have back injuries; bend knees deeply if needed."
  },
  {
    id: 'vrikshasana',
    name: "Tree Pose",
    sanskritName: "Vrikshasana",
    benefits: "Improves balance and focus by requiring total concentration. It strengthens the ankles and calves while opening the hips.",
    steps: [
      "Stand tall and shift your weight to your left leg.",
      "Place the sole of your right foot on your inner left calf or thigh (avoid the knee).",
      "Bring your hands to prayer position at your heart.",
      "Fix your gaze on one unmoving point in front of you.",
      "Hold for 30-60 seconds, then switch sides."
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    focus: "Balance, Concentration, Grounding",
    didYouKnow: "Tree pose is unique because it requires both rootedness in the standing foot and lightness in the upper body.",
    physiologicalEffect: "Engages the cerebellum to improve neuromuscular coordination and mental stability.",
    cautions: "Avoid if you have low blood pressure or lightheadedness."
  },
  {
    id: 'bhujangasana',
    name: "Cobra Pose",
    sanskritName: "Bhujangasana",
    benefits: "A classic heart-opener that combats the 'hunching' posture of stress. It boosts energy and relieves mild depression.",
    steps: [
      "Lie face down on the floor with hands under your shoulders.",
      "Inhale and slowly lift your chest by straightening your arms.",
      "Keep your shoulders down and away from your ears.",
      "Engage your core to protect your lower back.",
      "Hold for 15-30 seconds, then slowly release."
    ],
    image: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?q=80&w=1200&auto=format&fit=crop",
    focus: "Chest Opening, Spine Strength, Confidence",
    didYouKnow: "Opening the chest area is scientifically linked to improved breathing patterns and a reduction in feelings of anxiety.",
    physiologicalEffect: "Stimulates the adrenal glands and increases lung capacity by expanding the rib cage.",
    cautions: "Avoid if you have back injuries, carpal tunnel syndrome, or pregnancy."
  }
];